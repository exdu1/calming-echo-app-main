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

dotenv.config();                                                // load environment variables from .env file

// Create the express app
const app = express();                                          // create instance of express app
app.use(cors());                                                // enable cross-origin requests 
app.use(express.json());                                        // setup automatic json parsing from request bodies


// Start express server to listen on port 3001
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));