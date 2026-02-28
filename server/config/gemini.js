// Create and export the Gemini client as per github.com/googleapis/js-genai/blob/main/codegen_instructions.md

import { GoogleGenAI } from "@google/genai";
import config from './index.js';

const ai = new GoogleGenAI({ apiKey: config.geminiApiKey });

export default ai;