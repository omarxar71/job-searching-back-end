import User from "../../DB/user/user.model.js"

export const isEmployer = async (req ,res , next)=>{
    const {companyName , companyWebsite , companyDescription}=req.body
    const user = await User.findOneAndUpdate({_id :req.user._id} , {companyName , companyWebsite , companyDescription})
    if(!user) 
        return res.status(400).json({message : "could not add the user"})
    return res.status(200).json({message : "success"})
}
export const isJobSeeker = async (req ,res , next)=>{
    const {education ,experience ,skills} = req.body
    const user = await User.findOneAndUpdate({_id : req.user._id} ,{education ,experience ,skills})
    if(!user)
        return res.status(400).json({message : "user not found"})
    return res.status(200).json({message : "jobSeeker Logged in "})
}