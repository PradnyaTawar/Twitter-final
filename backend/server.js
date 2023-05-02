const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require('dotenv')
dotenv.config();
const mongoose = require("mongoose");
const userRoute = require("./routes/user_route");
const tweetRoute = require("./routes/tweet_route");
const fileRoute = require("./routes/file_route");
const path = require('path')
const OtherUserProfileRoute = require("./routes/otheruserprofile_route");

const { MONGODB_URL } = require("./config");

const PORT = 4000;
app.use(express.static(path.join(__dirname, 'frontend', 'build')))
global.__basedir = __dirname;

mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URI)


let db = mongoose.connection;
db.on("connected", () => {
    console.log(`Database connection Successful`)
})


db.on("error", () => {
    console.log('Database Connection Failed')
})

app.use(cors());
app.use(express.json());

//usage of routes
app.use("/", userRoute);
app.use("/", tweetRoute);
app.use("/", fileRoute);
app.use("/", OtherUserProfileRoute);
app.get('*',async(req,res)=>{
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'))
})
console.log(process.env.MONGO_URI)
app.listen(PORT, () => {
  console.log(`Server connection established on port:  ${PORT}`);
});

