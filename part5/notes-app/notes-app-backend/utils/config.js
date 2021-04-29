require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI_NOTES = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI_NOTES
    : process.env.MONGODB_URI_NOTES

module.exports = {
    MONGODB_URI_NOTES,
    PORT
}
