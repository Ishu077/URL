import axiosInstance from "../utils/axiosInstance"

export const createShortUrl = async (url,slug) =>{
    const {data} = await axiosInstance.post("/api/create",{url,slug})
    return data.shortUrl
}
//this axioinstance is used to centralise the code
//o/w we have to write axios.post() again and again!
// like this-->
// const {data} = await axios.post("http://localhost:3000/api/create",{url,slug})
//     return data.shortUrl