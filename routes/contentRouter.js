const express = require('express')
const contentController = require('../controllers/contentController')
const contentRouter = express.Router()
const authMiddleware = require('../middleware/authMiddleware')

contentRouter.get(
  '/profile',
  contentController.profile
)

contentRouter.post(
  '/news',
  contentController.addArticle
)

contentRouter.get(
  '/news',
  contentController.news
)


module.exports = contentRouter