export default async (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if(req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    const { approved, role } = req.body;
    const _id = req.query._id;

    if(!approved || typeof approved !== 'boolean') {
        return res.status(400).send('Invalid input. True or false');
    }

    if(!role || (role !== 'moderator' && role !== 'analyst')) {
        return res.status(400).send('Invalid role provided.');
    }

    await connectToDatabase();

    const article = await ArticleModel.findById(_id);
    if(!article) {
        return res.status(404).send('Article not found.');
    }

    if (role === 'moderator') {
        article.moderatorApproved = approved;
    } else if (role === 'analyst') {
        article.analystApproved = approved;
    }

    article.rejected = false;


    await article.save();

    res.json({
        success: true,
        approvalStatus: role === 'moderator' ? article.moderatorApproved : article.analystApproved
    });
};
