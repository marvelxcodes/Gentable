import { Router } from "express";

export const editor = Router();

editor.get("/", (req, res) => {
  res.json({
    message: "Hello from the editor route!",
  });
});