const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo bien connecté");
        
    } catch (error){
        console.log(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;