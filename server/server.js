// Import packages
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs, { appendFile } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Check for .env file and create it if it doesn't exist
const envPath = join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  fs.writeFileSync(
    envPath,
    'GEMINI_API_KEY=your_gemini_api_key_here\nPORT=3001\n'
  );
  console.log('.env file created. Please add your Gemini API key.');
}

dotenv.config();                                                // load environment variables from .env file

// Create the express app
const app = express();                                          // create instance of express app
app.use(cors());                                                // enable cross-origin requests 
app.use(express.json());                                        // setup automatic json parsing from request bodies


// Start express server to listen on port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));