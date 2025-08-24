
import User from "../../DB/user/user.model.js"
import { compareHash, hashing } from "../../utils/hashing/hashing.js"
import { generateToken } from "../../utils/token/token.js"

export const register = async(req ,res , next)=>{
    const {userName , email , password} =req.body
    const checkUser = await User.findOne({email})
    if(checkUser)
        return res.status(400).json({message : "user Already registered please login"})
    const hashedPassword = hashing({plaintext:password  ,saltOrRounds:9})
    const createUser =await User.create({userName , email , password : hashedPassword , role :"user"})
    if(!createUser)
        return res.status(400).json({message : "couldn't create the user"})
   
        
    return res.status(200).json({message : "success"})
}

export const login = async(req ,res , next)=>{
    const {email , password} = req.body
    const user = await User.findOne({email})
    const safeUser = {
        id: user._id,
        name: user.userName,
        email: user.email,
      };
  
    if(!user | !compareHash({plaintext:password ,compareHashedText: user.password}))
        return res.status(300).json({message : "password or email is wrong"})
    const giveToken = generateToken({plainText :{email :user.email}})
    return res.status(200).json({message:"user logged in" , user:safeUser , giveToken})
}