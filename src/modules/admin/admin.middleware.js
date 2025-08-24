import User, { roles } from "../../DB/user/user.model.js"

export const canChangeRole =async (req , res, next) => {
    const allRoles = Object.values(roles)
    const reqUser = req.user
    const targetUser = await User.findById(req.body.userId)
    const reqUserRole = reqUser.role 
    const targetUserRole = targetUser.role
    const reqUserIndex = reqUserRole.indexof(allRoles)
    const targetUserIndex= targetUserRole.indexof(allRoles)
    const canModify = reqUserIndex < targetUserIndex // if true means the user can change the role
    if(!canModify)
        return res.status(400).json({message : "you can not change the role"})
    next ()


}