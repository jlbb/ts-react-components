const mongoose = require('mongoose');

const connectDB = async () => {
    const dbConnection = process.env.MONGO_DB_URI;

    try {
        await mongoose.connect(dbConnection, {
            dbName: 'test',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB is Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
