import mongoose from "mongoose"

export const connectDB = async()=>{
    await mongoose.connect(process.env.MONGOOSE_URI).then(()=>console.log("connected to the database")).catch((err)=>console.log(err + "couldn't connect to database"))
}