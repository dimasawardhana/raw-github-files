import express, { Request, Response } from "express";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Simple GET endpoint
app.get("/api/picture/:filename/:ext", async (req: Request, res: Response) => {
  const filename = req.params["filename"];
  const ext = req.params["ext"];
  const url = `https://raw.githubusercontent.com/dimasawardhana/picture-cloud/refs/heads/main/${filename}.${ext}`;
  try {
    const response = await fetch(url);
    const data = await response.blob();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch GitHub data" });
  }
});

app.get(
  "/api/markdown/:filename/:lang",
  async (req: Request, res: Response) => {
    const filename = req.params["filename"];
    const lang = req.params["lang"];
    const url = `https://raw.githubusercontent.com/dimasawardhana/picture-cloud/refs/heads/main/markdown/${lang}/${filename}.md`;
    try {
      const response = await fetch(url);
      const data = await response.text();

      res.setHeader("Access-Control-Allow-Origin", "*");
      res.send(data);
    } catch (err) {
      console.log(err);
      res.status(500).send("Failed to fetch GitHub data");
    }
  }
);

// const port = 3000;

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

export default app;
