import { getShortUrl } from "../dao/short_url.js"
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/short_url.service.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

export const createShortUrl = wrapAsync(async (req,res)=>{
    const data = req.body
    let shortUrl;
    //this req.user is saved in the request context by the auth middleware
    if(req.user){  //if user is logged in, we will create a short url with user id
        shortUrl = await createShortUrlWithUser(data.url,req.user._id,data.slug)
    }else{    //else create a short url without user id
        shortUrl = await createShortUrlWithoutUser(data.url)
    }
    res.status(200).json({shortUrl : process.env.APP_URL+"/"+ shortUrl})
})

// from the routes file of short_url.route.js file only create ShortUrl is exported
//and the redirect function is used directly in the app.js file as the api endpoint
//but what about the custom short url?  have to see where it is being used.... (at 5:00 I think from frontend)
export const redirectFromShortUrl = wrapAsync(async (req,res)=>{
    const {id} = req.params
    const url = await getShortUrl(id)  //in the url model both short and long url are saved!!
    if(!url) throw new Error("Short URL not found")
    res.redirect(url.full_url)  //this is how short url is working!! and opening the longurl!!!
})

export const createCustomShortUrl = wrapAsync(async (req,res)=>{
    const {url,slug} = req.body   //slug is the custom url that user wants to create
    const shortUrl = await createShortUrlWithoutUser(url,customUrl)
    res.status(200).json({shortUrl : process.env.APP_URL+"/" + shortUrl})
})