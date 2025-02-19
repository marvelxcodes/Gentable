import path from 'path';
import cors from 'cors';
import express from 'express';

import { ai } from './routes/ai';
import { editor } from './routes/editor';

const app = express();
app.use(cors());
app.use(express.json());

// API Endpoints
app.use("/api/editor", editor);
app.use("/api/ai", ai);

// Serve static files (HTML, CSS, JS)
const BASE_PATH = path.join(__dirname, './public');
app.use(express.static(BASE_PATH));

app.get('/', (req, res) => {
  res.sendFile(path.join(BASE_PATH, 'index.html'));
});

// Handle 404
app.get('*', (req, res) => {
  res.sendFile(path.join(BASE_PATH, '404.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
