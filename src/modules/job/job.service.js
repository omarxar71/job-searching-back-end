import Applications from "../../DB/application/applications.model.js"
import Job from "../../DB/Job/job.model.js"
export const allJobs = async (req ,res , next)=>{
    //still will do the pagination
    const jobs = await Job.find()
    return res.status(200).json({message : "found all jobs" ,data: jobs})
}
export const postJob = async (req ,res , next)=>{
    const {title ,description,requirements,salary,jobType} = req.body
    const createJob = await Job.create({title ,description,requirements,salary,jobType,employer:req.user.id})
    if(!createJob){

        return res.status(400).json({message: "couldn't crate the job"})
    }
    return res.status(200).json({message : "job posted successfully"})

}
export const DeleteJob = async(req , res , next)=>{
    const {jobId} =req.params
    const findJob = await Job.findOne({_id:jobId})
    if(!findJob){
        return res.status(404).json({message : "job not found"})
    }
    if(findJob.employer.toString()!==req.user.id){
        return res.status(400).json({message : "you cant Delete this job"})
    }
    await findJob.deleteOne()
    
    return res.status(200).json({message : "job deleted successfully"})
}
export const updateJob = async(req, res , next)=>{
    const {jobId} =req.params
    const {title ,description,requirements,salary,jobType} = req.body
    const findJob = await Job.findOne({_id:jobId})
    if(!findJob){
        return res.status(404).json({message : "job not found"})
    }
    if(findJob.employer.toString()!==req.user.id){
        return res.status(400).json({message : "you cant Delete this job"})
    }
    await Job.updateOne({title ,description,requirements,salary,jobType})
    return res.status(200).json({message  : "job updated successfully"})
}
export const activateAndDeactivateJob = async(req ,res , next)=>{
    const {jobId} =req.params
    const findJob = await Job.findOne({_id : jobId})
    if(!findJob)
        return res.status(400).json({message : "not Found Job"})
    if(findJob.isActive == true){
        findJob.isActive = false
    }else if(findJob.isActive == false){
        findJob.isActive = true
    }
    await findJob.save()
    return res.status(200).json({message : "job status changed"})
}
export const jobPostedByEmployer = async (req ,res , next)=>{
    const findJobs = await Job.find({employer : req.user.id})
    if(findJobs.length == 0){
        return res.status(404).json({message : "you didn't post any jobs yet"})
    }
    return res.status(200).json({message: "found Jobs" , foundJobs :findJobs})
}  

export const applyForJob = async(req , res , next)=>{
    const {resume , coverLetter}= req.body
    const {jobId}= req.params
    const findJob = await Job.findOne({_id : jobId})
    if(!findJob)
        return res.status(400).json({message : "job not found"})
    if(findJob.applicants.some((a)=>a.jobSeeker == req.user.id))
        return res.status(400).json({message : "you already applied for this job"})
    findJob.applicants.push({jobSeeker : req.user.id})
    await findJob.save()
    const application = await Applications.create( {resume:req.file.path , coverLetter , job:jobId , applicant:req.user.id})
    if(!application)
        return res.status(400).json({message : "could not apply"})
    return res.status(200).json({message : "applied to the job"})
}
export const findOneJob = async (req, res , next )=>{
    const {id}= req.params
    const job = await Job.findById( id)
    if(!job)
        return res.status(404).json({message : "not found job"})
    return res.status(200).json({message :"found job" ,job: job})
}

// user preview his applications 
export const userApplications = async (req ,res , next)=>{
    const userApplications = await Applications.find({applicant:req.user.id})
    return res.status(200).json({message : "all user applications" , userApplications})
    
}

// the employer wants to see the all the applicants for a specific job
export const applicantsForSpecificJob = async(req , res, next)=>{
    const {jobId}= req.params
    const job = await Job.findById(jobId)
    if(!job){
        return res.status(400).json({message : "cant find job"})
    }
    
    if(job.employer !== req.user.id){
        return res.status(400).json({message : "you cant see the applicants for this job"})
    }
    return res.status(200).json({message : "all applicants" ,applicants: job.applicants})
}

//change the status of the applicants