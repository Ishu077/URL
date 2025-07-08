import { nanoid } from "nanoid";
import { cookieOptions } from "../config/config.js";
import jsonwebtoken from "jsonwebtoken"

export const generateNanoId = (length) =>{
    return nanoid(length);
}

export const signToken = (payload) =>{ // here the payload is the user id which we are sending to the client
    return jsonwebtoken.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"})
}

export const verifyToken = (token) =>{

    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    console.log(decoded.id)
    return decoded.id
}