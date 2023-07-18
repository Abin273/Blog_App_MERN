import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//USER AUTH
export const userAuth = async (req,res,next)=>{
    let token =  req.cookies.jwt;

    if(token){
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findOne(decoded.userId).select('-password') ; 
            next();
        } catch (error) {
            res.status(401).json({error:"not autherized,invalid token"})
        }

    }else{
        res.status(401).json({error:"not autherized,no token"});
    }
}

//ADMIN AUTH