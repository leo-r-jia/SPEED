import { connectToDatabase } from '../../config/db';
import { ArticleModel } from '../../src/articles/article.model';

export default async (req, res) => {
    console.log("Function invoked!");
    if (req.method === 'GET') {
      const db = await connectToDatabase();
      const articles = await ArticleModel.find();
      res.json(articles);
    } else {
      res.status(405).send('Method Not Allowed');
    }
  };