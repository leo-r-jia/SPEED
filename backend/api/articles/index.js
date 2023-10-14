import { connectToDatabase } from '../../config/db';
import { ArticleModel } from '../../src/articles/article.model';

export default async (req, res) => {
    console.log("Function invoked!");

    try {
        // Add this to handle the CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*'); // This allows any origin to access the API
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Specify the allowed methods
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        // Handle OPTIONS request (usually a preflight)
        if (req.method === 'OPTIONS') {
            return res.status(200).end();
        }

        if (req.method === 'GET') {
            const db = await connectToDatabase();
            const articles = await ArticleModel.find();
            res.json(articles);
        } else {
            res.status(405).send('Method Not Allowed');
        }
    } catch (error) {
        console.error("Error during function execution:", error);
        res.status(500).send('Internal Server Error');
    }
};
