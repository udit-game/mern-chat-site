const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// dotenv.config();

const connectDB = async () => {
    try {
       const conn= await mongoose.connect("mongodb+srv://SocialMedia:mayank15@cluster1.hfswjhy.mongodb.net/mernChatDB?retryWrites=true&w=majority",{ useNewUrlParser: true ,useUnifiedTopology:true ,});
        console.log("database successfully connected");
    } catch (e) {
        console.log(e)
        process.exit(1);
        }
    };

module.exports = connectDB;
