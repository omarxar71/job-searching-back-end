import Router from "express"
import { isAuthenticated } from "../../midlleware/authentication.midleware.js"
import * as userServices from "./user.service.js"
import { asyncHandler } from '../../utils/globalErrorHandling/globalErrorHandling.js';
const router = Router()
router.post("/employer", isAuthenticated ,asyncHandler(userServices.isEmployer) )
router.post("/job-seeker" , isAuthenticated ,asyncHandler(userServices.isJobSeeker))


export default router