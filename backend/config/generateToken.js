import jwt from 'jsonwebtoken';

export const generateToken = (res,userId)=>{
    const token = jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:'30d'});
    res.cookie('jwt',token,{
        httpOnly:true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite:'strict',
        maxAge: 30*24*60*60*1000
    })
}

export const generateAdminToken = (res,adminId)=>{
    const token = jwt.sign({id:adminId},process.env.JWT_ADMINSECRET,{expiresIn:'30d'});
    res.cookie('jwtAdmin',token,{
        httpOnly:true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite:'strict',
        maxAge: 30*24*60*60*1000
    })
}