require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI_BLOGS = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI_BLOGS
    : process.env.MONGODB_URI_BLOGS

module.exports = {
  MONGODB_URI_BLOGS,
  PORT
}
