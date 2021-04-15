require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI_NOTES = process.env.MONGODB_URI_NOTES

module.exports = {
  MONGODB_URI_NOTES,
  PORT
}
