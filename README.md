# Coral AI 🐠 - Chat with any PDF

Coral AI is a full-stack AI-powered web application that allows you to have interactive conversations with your PDF documents. Simply upload a PDF and start asking questions to get summaries, find information, and understand the content faster.

## About The Project

This project transforms the way we interact with PDF documents. Instead of manually sifting through pages of text, Coral AI allows you to "chat" with your documents. It leverages a powerful Retrieval-Augmented Generation (RAG) pipeline to provide accurate and context-aware answers.

The application is built with a modern tech stack, featuring a Next.js frontend and a robust backend that handles file processing, AI-powered analysis, and user management. When a user uploads a PDF, the document is securely stored on AWS S3, its content is processed and converted into vector embeddings using Google's Generative AI, and then stored in a Pinecone vector database for efficient searching.

### Features

-   **Interactive PDF Chat**: Ask questions and get answers directly from your PDF documents.
-   **Secure File Uploads**: Upload your PDF files, which are securely stored on AWS S3.
-   **User Authentication**: Secure user authentication and management with Clerk.
-   **Subscription Management**: Pro features and subscription management handled by Stripe.
-   **Chat History**: All your conversations are saved, allowing you to pick up where you left off.
-   **PDF Viewer**: View your PDF document alongside the chat interface for easy reference.

## Tech Stack

| Category          | Technology/Service    | Description                                                                    |
| :---------------- | :-------------------- | :----------------------------------------------------------------------------- |
| **Frontend** | Next.js & React       | A React framework for building a modern, server-rendered user interface.       |
|                   | TypeScript            | Provides static typing for robust and maintainable code.                       |
|                   | Tailwind CSS          | A utility-first CSS framework for rapid and custom UI development.             |
|                   | TanStack Query        | Manages server state, including data fetching, caching, and updates.           |
| **Backend** | Next.js API Routes    | Powers the server-side logic for handling requests like chat creation and messaging. |
| **Database** | Drizzle ORM           | A TypeScript ORM for building type-safe SQL queries.                           |
|                   | Neon                  | A serverless Postgres database that scales efficiently.                        |
| **AI/ML** | Google Generative AI  | Used to generate vector embeddings from the text content of PDFs.              |
|                   | Pinecone              | A vector database used for efficient similarity searches on the generated embeddings. |
| **Infrastructure**| AWS S3                | Provides secure and scalable cloud storage for uploaded PDF files.             |
|                   | Clerk                 | Handles user authentication, session management, and user profiles.            |
|                   | Vercel                | The platform for deploying and hosting the Next.js application.                |
| **Payments** | Stripe                | Manages subscription billing and payments for pro features.                    |

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js and npm (or yarn/pnpm/bun)
-   An AWS account and S3 bucket
-   A Pinecone account and API key
-   A Google Generative AI API key
-   A Clerk account for authentication
-   A Neon account for the database
-   A Stripe account and API keys

### Installation

1.  **Clone the repository**:
    ```sh
    git clone [https://github.com/dinasquare/coral-ai.git](https://github.com/dinasquare/coral-ai.git)
    cd coral-ai
    ```

2.  **Install dependencies**:
    ```sh
    npm install
    ```

3.  **Set up environment variables**:
    Create a `.env` file in the root of the project and add the necessary API keys and credentials for all the services listed in the prerequisites.

4.  **Run the development server**:
    ```sh
    npm run dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdinasquare%2FCoral-AI)

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

Distributed under the MIT License. See `LICENSE` for more information.
