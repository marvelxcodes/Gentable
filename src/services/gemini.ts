import { GoogleGenerativeAI } from '@google/generative-ai';
import { config } from 'dotenv';
config();

const GOOGLE_GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;

if (!GOOGLE_GEMINI_API_KEY) {
  throw new Error('GOOGLE_GEMINI_API_KEY env is not defined');
}

export const gemini = new GoogleGenerativeAI(GOOGLE_GEMINI_API_KEY);
