import joi from "joi";

export const register = joi.object({
    email:joi.string().email().required(),
    password:joi.string().required(),
    userName :joi.string().required(),
})
export const login = joi.object({
    email:joi.string().email().required(),
    password:joi.string().required(),
   
})