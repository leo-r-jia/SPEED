import { connectToDatabase } from '../../config/db';
import { ArticleModel } from '../../src/articles/article.model';
import { ArticleSchema } from '../../src/articles/article.model';

// export default async (req, res) => {
//    console.log("Function invoked!");
//   if (req.method === 'GET') {
//     const { title } = req.query;
//     try {
//       const db = await connectToDatabase();
//       const articles = await ArticleModel.find({ title: new RegExp(title, 'i') });
//       res.status(200).json(articles);
//     } catch (error) {
//       res.status(500).send(error.message || 'Internal Server Error');
//     }
//   } else {
//     res.status(405).send('Method Not Allowed');
//   }
// };
export default async (req, res) => {
  console.log("Function invoked!");
  if (req.method === 'GET') {
    const searchCriteria = {};


    const stringFields = Object.keys(ArticleSchema.paths).filter(
      key => ArticleSchema.paths[key].instance === 'String'
    );

    // Iterate over each query parameter and add it to the search criteria.
    for (const [key, value] of Object.entries(req.query)) {
      // Ensure the search key exists in the schema to prevent arbitrary searches.
      if (ArticleSchema.path(key)) {
        // For string fields, we'll use a regex for case-insensitive search.
        if (stringFields.includes(key)) {
          searchCriteria[key] = new RegExp(value, 'i');
        } else {
          searchCriteria[key] = value;
        }
      }
    }

    try {
      const db = await connectToDatabase();
      const articles = await ArticleModel.find(searchCriteria);
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).send(error.message || 'Internal Server Error');
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};

