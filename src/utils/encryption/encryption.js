import CryptoJS from "crypto-js";

export const encrypt =({plainText ,secreteKey })=>{
    return CryptoJS.AES.encrypt(plainText ,secreteKey).toString()
}
export const dcrypt =({encryptedText ,secreteKey })=>{
    return CryptoJS.AES.encrypt(encryptedText ,secreteKey).toString(CryptoJS.enc.Utf8)
}