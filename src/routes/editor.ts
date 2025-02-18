import { Router } from "express";

export const editor = Router();

editor.post("/share", (req, res) => {
  const { schema } = req.body;

  
  res.json();
});

editor.get("/", (req, res) => {
  res.json();
});