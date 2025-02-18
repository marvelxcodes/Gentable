import { Router } from 'express';
import JSONBin from '../services/jsonbin';

export const editor = Router();

editor.post('/share', async (req, res) => {
  const { schema } = req.body;
  
  try {
    const { metadata } = await JSONBin.createBin(JSON.parse(schema));

    res.json(metadata.id);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a link' });
  }
});

editor.get('/share/:binId', async (req, res) => {
  const { binId } = req.params;
  console.log(binId);
  try {
    const schema = await JSONBin.getBin(binId);
    res.json(schema.record);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve bin' });
  }
});
