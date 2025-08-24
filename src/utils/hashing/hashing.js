import bcrypt from "bcrypt"
export const hashing= ({plaintext , saltOrRounds = 9})=>{
    return bcrypt.hashSync(plaintext, saltOrRounds)
}

export const compareHash= ({plaintext , compareHashedText})=>{
    return bcrypt.compareSync(plaintext, compareHashedText)
}