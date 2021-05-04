const router = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')


router.get('/reset'), async (request, response) => {
  response.send('<h1>here</h1>')
  response.status(200).end()
}

router.post('/reset', async (request, response) => {
  await Note.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

module.exports = router
