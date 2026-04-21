import dotenv from "dotenv";
import { OpenAI } from "openai";
import Groq from "groq-sdk";
import express from "express";
import cors from "cors";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROK_API_KEY });

// ✅ Use Grok (xAI) endpoint

app.post("/chat", async (req, res) => {
  const message = req.body.message || req.body;
  try {
    const response = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b", // or grok-1 / grok-beta depending on access
      messages: [
        {
          role: "user",
          content:
            typeof message === "string" ? message : JSON.stringify(message),
        },
      ],
    });
    console.log(response.choices[0]?.message?.content, "res=====>>");
    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error fetching response from Groq" });
  }
});

app.get("/", async (req, res) => {
  return res.send({ json: "Backend is running" });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
