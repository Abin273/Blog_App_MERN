import mongoose from "mongoose";

const connectDb =()=>{
    mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
        console.log("database connected successfully......");
    })
    .catch((error)=>{
        console.error(`Error: ${error.message}`);
        throw error
    })
} 

export default connectDb;