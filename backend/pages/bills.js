import Cors from 'cors';
import initMiddleware from '../../lib/init-middleware';

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    origin: 'https://www.dewanshiopticals.shop',
    methods: ['GET', 'POST', 'OPTIONS'],
  })
);

export default async function handler(req, res) {
  await cors(req, res); // Run CORS middleware

  // Your actual API logic
  try {
    // Replace this with real MongoDB save logic
    const bill = req.body; 
    res.status(200).json({ success: true, bill });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error saving bill' });
  }
}
