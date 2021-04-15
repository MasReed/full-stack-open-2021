require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI_BLOGS = process.env.MONGODB_URI_BLOGS

module.exports = {
  MONGODB_URI_BLOGS,
  PORT
}
