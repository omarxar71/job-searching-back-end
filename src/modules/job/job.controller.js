import Router from "express"
import * as jobService from "./job.service.js"
import { asyncHandler } from "../../utils/globalErrorHandling/globalErrorHandling.js"
import { isAuthorized } from '../../midlleware/authorization.js';
import { roles } from "../../DB/user/user.model.js";
import { isAuthenticated } from '../../midlleware/authentication.midleware.js';
import { fileValidation, upload } from "../../utils/multerUpload/multer.uplaod.js";
const router = Router()

router.post("/create",isAuthenticated ,isAuthorized(roles.employer), asyncHandler(jobService.postJob))
router.delete("/delete/:jobId" , isAuthenticated , isAuthorized(roles.employer) , asyncHandler(jobService.DeleteJob))
router.post("/:jobId/apply" , isAuthenticated,upload(fileValidation.files,"uploads/resumes").single("resume"), asyncHandler(jobService.applyForJob))
router.get("/all-jobs" ,asyncHandler(jobService.allJobs))
router.get("/one-job/:id" , asyncHandler(jobService.findOneJob))
export default router