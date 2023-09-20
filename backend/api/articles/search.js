import { connectToDatabase } from '../../config/db';
import { ArticleModel } from '../../src/articles/article.model';

export default async (req, res) => {
    console.log("Function invoked!");
  if (req.method === 'GET') {
    const { title } = req.query;
    try {
      const db = await connectToDatabase();
      const articles = await ArticleModel.find({ title: new RegExp(title, 'i') });
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).send(error.message || 'Internal Server Error');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
