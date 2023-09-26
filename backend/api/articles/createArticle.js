import { connectToDatabase } from '../../config/db';
import { ArticleModel } from '../../src/articles/article.model';

export default async (req, res) => {

  res.setHeader('Access-Control-Allow-Origin', '*');  // adjust '*' as needed for security
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'POST') {
    try {
      const db = await connectToDatabase();
      const article = new ArticleModel(req.body);
      const savedArticle = await article.save();
      res.status(201).json(savedArticle);
    } catch (error) {
      res.status(500).send(error.message || 'Internal Server Error');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
