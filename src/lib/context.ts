import { Pinecone } from "@pinecone-database/pinecone";
import { convertToAscii } from "./utils";
import { getEmbeddings } from "./embeddings";

export async function getMatchesFromEmbeddings(
  embeddings: number[],
  fileKey: string
) {
  try {
    const client = new Pinecone({
    //   environment: process.env.PINECONE_ENVIRONMENT!,
      apiKey: process.env.PINECONE_API_KEY!,
    });
    const pineconeIndex = await client.index("coral-ai");
    const namespace = pineconeIndex.namespace(convertToAscii(fileKey));
    const queryResult = await namespace.query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
    });
    return queryResult.matches || [];
  } catch (error) {
    console.log("error querying embeddings", error);
    throw error;
  }
}

export async function getContext(query: string, fileKey: string) {
  console.log("getContext called with:", { query, fileKey });
  const queryEmbeddings = await getEmbeddings(query);
  console.log("Query embeddings length:", queryEmbeddings.length);
  
  const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey);
  console.log("Found matches:", matches.length);
  
  if (matches.length > 0) {
    console.log("First match score:", matches[0].score);
    console.log("Sample matches:", matches.map(m => ({ score: m.score, hasMetadata: !!m.metadata })));
  }

  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.3
  );
  
  console.log("Qualifying docs after filtering:", qualifyingDocs.length);

  type Metadata = {
    text: string;
    pageNumber: number;
  };

  let docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);
  const result = docs.join("\n").substring(0, 3000);
  console.log("Final context length:", result.length);
  
  return result;
}