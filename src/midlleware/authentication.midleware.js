import User from "../DB/user/user.model.js"
import { verifyToken } from "../utils/token/token.js"

export const isAuthenticated =async(req , res , next)=>{
    const {auth} = req.headers
    const payload = verifyToken({token:auth})
    const user = await User.findOne({id : payload.id})
    if(!user)
        return res.status(404).json({message : "you are not registered yet , Please sing up"})
    req.user = user
    return next()
}