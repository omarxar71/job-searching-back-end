import { model, Schema, Types } from "mongoose";
export const roles ={
    superAdmin:"superAdmin",
    admin:"admin",
    employer:"employer",
    jobSeeker : "jobSeeker" , 


}
//schema 
const userSchema = new Schema({
    userName : {type:String , required : true},
    password : {type:String , required : true},
    role : {type:String,Enum :["jobSeeker" ,"admin","employer"]},
    profilePicture : {type:String},
    email :{type :String , required:true},
    // Job Seeker fields

  skills: [String],
  experience: [
    {
      jobTitle: String,
      company: String,
      startDate: Date,
      endDate: Date,
      description: String
    }
  ],
  education: [
    {
      school: String,
      degree: String,
      fieldOfStudy: String,
      startDate: Date,
      endDate: Date
    }
  ],
    // Employer fields
  companyName: String,
  companyWebsite: String,
  companyDescription: String,
  postedJobs: [{ type: Types.ObjectId, ref: "Job" }]
} , {timestamps:true})





//model
const User = model("User" , userSchema)
export default User