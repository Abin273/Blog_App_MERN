import multer from "multer";

const storage = multer.diskStorage({
    destination: (req,res,cb)=>{
        cb(null,'public/profileImages');
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.filename)
    }
})

const upload = multer({
    storage: storage
})

export default upload;