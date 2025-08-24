export const validation =(schemas)=>{
    return (req, res , next)=>{
        const data = {...req.body , ...req.params , ...req.query}
        const results = schemas.validate(data  , {abortEarly : false})
        if(results.error){
           const messageContainer = results.error.details.map((error)=> error.message)
            return res.status(400).json({message: messageContainer})
        }
        return next()
    }
}