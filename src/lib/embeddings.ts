// import { OpenAIApi, Configuration } from "openai-edge";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY!
)

// const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string) {
  try {
    // Get the generative model
    const embeddingModel = genAI.getGenerativeModel({ 
      model: "text-embedding-004" // Gemini's embedding model
    });
    
    // Generate embeddings
    const result = await embeddingModel.embedContent(
    text.replace(/\n/g, " ")
    );
    
    // Extract the embedding values
    const embedding = result.embedding.values;
    
    return embedding as number[];
  } catch (error) {
    console.log("error calling Gemini embeddings API", error);
    throw error;
  }
}