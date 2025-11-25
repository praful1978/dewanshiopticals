import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
let cachedClient = null;

async function connectToDatabase() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export default async function handler(req, res) {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "https://www.dewanshiopticals.shop");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "POST") {
    try {
      const client = await connectToDatabase();
      const db = client.db("billdb");
      const result = await db.collection("bills").insertOne(req.body);
      console.log("Saved:", req.body);
      res.status(200).json({ success: true, data: result });
    } catch (err) {
      console.error("Error saving bill:", err.message);
      res.status(500).json({ error: "Error saving bill", details: err.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
