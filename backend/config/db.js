import mongoose from "mongoose";

const connectDb =()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("database connected successfully......");
    })
    .catch((error)=>{
        console.log(error);
    })
} 

export default connectDb;