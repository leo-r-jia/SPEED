import { connectToDatabase } from '../../config/db';
import { ArticleModel } from '../../src/articles/article.model';

export default async (req, res) => {
    if (req.method !== 'POST') {
      return res.status(405).send('Method Not Allowed');
    }
  
    const { rating } = req.body;  
    const _id = req.query._id; 
  
    // Input validation
    if (!rating || typeof rating !== 'number' || rating < 1 || rating > 5) {
      return res.status(400).send('Invalid rating. Rating should be a number between 1 and 5.');
    }
  
    await connectToDatabase();
  
    const article = await ArticleModel.findById(_id);
    if (!article) {
      return res.status(404).send('Article not found.');
    }
  
    if (!article.ratings) {
      article.ratings = [];
    }
    
    article.ratings.push(rating);
  
    const sumOfRatings = article.ratings.reduce((acc, val) => acc + val, 0);
    article.averageRating = article.ratings.length > 0 ? sumOfRatings / article.ratings.length : 0;
    article.totalRatings = article.ratings.length;
  
    await article.save();
  
    res.json({
      success: true,
      averageRating: article.averageRating,
      totalRatings: article.totalRatings
    });
  };