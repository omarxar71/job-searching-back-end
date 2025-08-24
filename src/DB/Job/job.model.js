import mongoose, { model } from "mongoose"

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  requirements: [String], // Skills or qualifications
  salary: {type:String} , 
postedAt: { type: Date, default: Date.now },
deadline: Date,
isActive: { type: Boolean, default: true },

jobType: { // Full-time, part-time, remote
  type: String,
  enum: ["full-time", "part-time", "contract", "internship", "remote"],
  required: true
},
employer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
applicants: [
  {
    jobSeeker: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    appliedAt: { type: Date, default: Date.now },
   
  } , 
 
],
} , {timestamps:true})


const Job = model("Job" , jobSchema)
export default Job