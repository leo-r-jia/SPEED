const mongoose = require('mongoose');
const config = require('config');
//const db = config.get('mongoURI');
const db = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('MongoDB is Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

let dbInstance = null;
async function connectToDatabase() {
    if(dbInstance) {
        return dbInstance;
    }

    mongoose.set('strictQuery', true);
    const connection = await mongoose.connect(db, {
        useNewUrlParser: true,
    });
    dbInstance = connection;
    return dbInstance;
}

module.exports = {
    connectDB,
    connectToDatabase
};



