import mongoose, { model, Schema } from "mongoose";

//schema
const applicationsSchema = new Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    resume: String,
    coverLetter: String,
    appliedAt: Date,
    statusOfTheApplicant :{type:String, default:"pending" ,Enum:["pending" , "interviewing" , "rejected" , "hired"] }
  }, {timestamps:true})



//model

const Applications = model("Applications" , applicationsSchema)
export default Applications