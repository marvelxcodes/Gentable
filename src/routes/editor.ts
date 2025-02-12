import { Router } from "express";

export const editor = Router();

editor.get("/", (req, res) => {
  const { id } = req.query;
  res.sendFile("/src/routes/test.json");
});