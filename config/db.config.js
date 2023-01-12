require('dotenv').config();

const mongoose = require('mongoose');

const connectMongoSever = async() => {
    const db_name = process.env.DB_NAME;
    const db_host = process.env.DB_HOST;
    const db_port = process.env.DB_PORT;
    const db_url_string = `mongodb://${db_host}:${db_port}/${db_name}`;
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(db_url_string);
        console.log('Database connected!');
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = connectMongoSever;