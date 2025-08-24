import multer, { diskStorage } from "multer"
import { nanoid } from "nanoid"
import fs from "fs"
import path from "path"
export const fileValidation ={
    images :["images/png" ,"images/jpeg"],
    files : ["application/msword" , "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
}
export const upload = (mimetype,folder)=>{
    const storage = diskStorage({
        destination:(req , file , cb)=>{
            const folderPath = path.resolve("." , `${folder}/${req.user._id}`)
            fs.mkdirSync(folderPath , {recursive: true})
            const folderName = `${folder}/${req.user._id}`
            cb(null, folderName)
        },
        filename:(req , file , cb)=>{
            cb(null ,nanoid()+"__"+ file.originalname)
        }
    })
    const fileFilter = function (req , file ,cb){
        if(!mimetype.includes(file.mimetype))
            return cb(new Error("invalid format", false))
        return cb(null , true)
    }
    const multerUpload = multer({storage ,fileFilter})
    return multerUpload
}