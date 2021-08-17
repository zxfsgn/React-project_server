const express = require('express')
const authController = require('../controllers/authController')
const authRouter = express.Router()
const { check } = require('express-validator')
const authMiddleware = require('../middleware/authMiddleware')

authRouter.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля - 6 символов')
      .isLength({ min: 6 })
  ],
  authController.register
)

authRouter.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  authController.login
)

authRouter.get('/', authMiddleware, authController.check)

module.exports = authRouter