import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({

  full_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
    required: true,
    unique: true,
    index: true,    //see why index is used here! helps in searching or finding this shorturl
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
  user:{  //its a better stratergy to store user id in the short url schema rather than in user schema stroing every url storage with the user
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

const shortUrl = mongoose.model("shortUrl", shortUrlSchema);

export default shortUrl;
