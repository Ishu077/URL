import express from "express";  //we can also use require!
import {nanoid} from "nanoid"   
import dotenv from "dotenv"
import connectDB from "./src/config/monogo.config.js"
import short_url from "./src/routes/short_url.route.js"
import user_routes from "./src/routes/user.routes.js"
import auth_routes from "./src/routes/auth.routes.js"
import { redirectFromShortUrl } from "./src/controller/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors"
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser"
//if you are using import instead of require ,in the package.json edit the  type:module!!
dotenv.config("./.env")

const app = express();


app.use(cors({
    origin: 'http://localhost:5173', // your React app
    credentials: true // 👈 this allows cookies to be sent
}));
//use of cors:
// enables Cross-Origin Resource Sharing (CORS) for your backend API.

// origin: 'http://localhost:5173' allows only requests from your React frontend (running on port 5173)
// to access your backend.

// credentials: true allows cookies, authorization headers, or TLS client certificates to be sent
// and received between frontend and backend.

// In summary:
// This setup lets your React app (on port 5173) make authenticated requests (with cookies or tokens) to your Express backend (on port 3000), 
// which is necessary for login, signup, and other protected routes.

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use(attachUser)

app.use("/api/user",user_routes)
app.use("/api/auth",auth_routes)
app.use("/api/create",short_url)

app.get("/:id",redirectFromShortUrl) //here id is nanoid !used to shorter the url!
// This route handles the redirection from the short URL to the original URL.
// this redirectt function is present in the controller of the short_url.route.js file but
//but we didint use it in the routes file of short_url.route.js file
// instead we are useing it here directly in the app.js file
// this is because we want to handle the redirection from the short URL to the original URL
// thus its api endpoint is created here separately!!



app.use(errorHandler)

app.listen(3000,()=>{
    connectDB()
    console.log("Server is running on http://localhost:3000");
})

// GET - Redirection 
