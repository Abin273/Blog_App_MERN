import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Admin from "../models/adminModel.js";

//USER AUTH
export const userAuth = async (req,res,next)=>{
    let token =  req.cookies.jwt;

    if(token){
        try {
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            // console.log("decoded",decoded,"//////////",decoded.userId);
            req.user = await User.findOne({_id:decoded.id}).select('-password') ; 
            next();
        } catch (error) {
            res.status(401).json({error:"not autherized,invalid token"})
        }

    }else{
        res.status(401).json({error:"not autherized,no token"});
    }
}

//ADMIN AUTH
export const adminAuth = async (req,res,next)=>{
    let token =  req.cookies.jwtAdmin;

    if(token){
        try {
            const decoded = jwt.verify(token,process.env.JWT_ADMINSECRET);
            req.admin = await Admin.findOne({_id:decoded.id}).select('-password') ; 
            next();
        } catch (error) {
            res.status(401).json({error:"not autherized,invalid token"})
        }

    }else{
        res.status(401).json({error:"not autherized,no token"});
    }
}