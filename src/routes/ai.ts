import { Router } from "express";

export const ai = Router();

ai.get("/", (req, res) => {
  res.json({
    message: "Hello from the ai route!",
  });
});