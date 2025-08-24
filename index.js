import express from "express"
import { bootstrap } from "./src/app.controller.js"
import dotenv from "dotenv"
const app = express()
dotenv.config()
bootstrap(app , express)
const port = 3000
app.listen(port, () => {
    console.log("app listening in port" + port)
})