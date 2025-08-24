import Router from "express"
import * as authService from "./auth.service.js"
import { validation } from '../../midlleware/validation.midlleware.js';
import * as authValidationSchemas from "./auth.validation.js"
import { asyncHandler } from '../../utils/globalErrorHandling/globalErrorHandling.js';
const router = Router()
router.post ("/register" ,validation(authValidationSchemas.register) , asyncHandler(authService.register))
router.post ("/login" ,validation(authValidationSchemas.login) , asyncHandler(authService.login))




export default router   