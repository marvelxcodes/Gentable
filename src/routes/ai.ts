import { gemini } from '../services/gemini';
import { Request, Response, Router } from 'express';
import { tablesResponseSchema } from '../config/schema';

export const ai = Router();

ai.get('/', async (req: Request, res: Response) => {
  const schema = req.query.schema as string;

  const model = gemini.getGenerativeModel({
    model: 'gemini-1.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: tablesResponseSchema,
    },
  });

  const prompt = `Generate a prisma schema for a database with tables and fields using the following JSON: ${JSON.stringify(schema)}`;

  const result = await model.generateContent(prompt);

  try {
    const tables = JSON.parse(result.response.text());

    res.json(tables);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'Internal Server Error',
    });
  }
});

ai.post('prisma', async (req: Request, res: Response) => {
  const schema = req.body.schema as string;

  const model = gemini.getGenerativeModel({
    model: 'gemini-1.5-flash',
  });

  const prompt = ` Generate a prisma schema for a database with tables and fields using the following JSON schema: ${JSON.stringify(schema)}`;
  const response = await model.generateContent(prompt);

  res.json(response.response.text());
});

ai.post('sql', async (req: Request, res: Response) => {
  const schema = req.body.schema as string;

  const model = gemini.getGenerativeModel({
    model: 'gemini-1.5-flash',
  });

  const prompt = `Generate a SQL Query to create database with tables and fields using the following JSON schema: ${JSON.stringify(schema)}`;
  const response = await model.generateContent(prompt);

  res.json(response.response.text());
});