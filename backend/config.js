const dotenv = require('dotenv')
dotenv.config();
module.exports = {
  MONGODB_URL : process.env.MONGO_URI,
  JWT_SECRET : process.env.JWT_SECRET
  
}

