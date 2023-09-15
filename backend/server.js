const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { OpenAI } = require("langchain/llms/openai");
const studentToken = '1016~Gkgpf5ZYLq6OW13oDzRVkazWyVCnnzGRDwCWw9ykPYMqkQe0RqkaqWOnzKv4HWCb';
const llm = new OpenAI({
  openAIApiKey: "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",
});
const { CheerioWebBaseLoader } = require("langchain/document_loaders/web/cheerio");
const { RecursiveCharacterTextSplitter } = require("langchain/text_splitter");
const { OpenAIEmbeddings } = require("langchain/embeddings/openai");
const { MemoryVectorStore } = require("langchain/vectorstores/memory");



// Initialize Express App
const app = express();

// Middleware for handling CORS issues
app.use(cors());

app.get('/langBoi', async (req, res) => {
  //const studentToken = req.query.studentToken; // Fetching the student token from query parameters
 
  const loader = new CheerioWebBaseLoader(
    "https://lilianweng.github.io/posts/2023-06-23-agent/"
  );
  const data = await loader.load();
  
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 0,
  });
  
  const splitDocs = await textSplitter.splitDocuments(data);

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: "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",
    verbose: true // Optional, set to true if you want verbose logging
  });

  const vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);

  const relevantDocs = await vectorStore.similaritySearch("What is task decomposition?");

  console.log(relevantDocs.length);
  res.send(relevantDocs)

});

// API endpoint to fetch courses from Canvas
app.get('/courses', async (req, res) => {
  //const studentToken = req.query.studentToken; // Fetching the student token from query parameters
 
  //res.send("hello")
  
  try {
    const response = await axios.get('https://canvas.instructure.com/api/v1/courses?include[]=syllabus_body', {
      headers: {
        Authorization: `Bearer ${studentToken}`, // Using the student token to authenticate API request
      },
    });
    return res.json(response.data); // Return fetched courses data
  } catch (error) {
    console.error('Error fetching courses:', error); // Log any errors
    return res.status(500).json({ error: 'An error occurred while fetching courses' }); // Return error message
  }
  
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000'); // Console log to indicate server is running
});
