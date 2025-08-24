import jwt from "jsonwebtoken"
export const generateToken =({plainText , secreteKey =process.env.TOKEN_SECRETE_KEY})=>{
    return jwt.sign(plainText , secreteKey)
}

export const verifyToken =({token , secreteKey=process.env.TOKEN_SECRETE_KEY})=>{
    return jwt.verify(token , secreteKey)
}