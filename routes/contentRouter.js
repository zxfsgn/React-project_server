const express = require('express')
const contentController = require('../controllers/contentController')
const contentRouter = express.Router()
const authMiddleware = require('../middleware/authMiddleware')

contentRouter.get(
  '/profile',
  authMiddleware,
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

contentRouter.put(
  '/news',
  contentController.editArticle
)

contentRouter.delete(
  '/news',
  contentController.deleteArticle
)


module.exports = contentRouter