import { connectDB } from "./DB/connection.js"
import authRouter from "./modules/auth/auth.controller.js"
import jobRouter from "./modules/job/job.controller.js"
import userRouter from "./modules/user/user.controller.js"
import cors from 'cors';

export const bootstrap =async (app , express)=>{

    app.use(cors());
    app.use(express.json())
    app.use("/resumes" , express.static("resumes"))
    await connectDB()
    app.use("/auth" , authRouter)
    app.use("/user" , userRouter)
    app.use("/job" , jobRouter)
    app.all('/{*any}', (req, res, next) => {})

}