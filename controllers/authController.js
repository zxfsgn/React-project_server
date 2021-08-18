const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { User } = require('../models/User')

const generateJwt = (id) => {
  return jwt.sign(
    { id },
    config.get('jwtSecret'),
    { expiresIn: '1h' }
  )
}

exports.register = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        massage: 'Некорректные данные при регистрации'
      })
    }

    const { email, password } = req.body

    const candidate = await User.findOne({ where: { email } })

    if (candidate) {
      return res.status(400).json({ massage: 'Такой пользователь уже существует' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    await User.create({ email, password: hashedPassword })

    res.status(201).json({ massage: 'Пользователь создан' })



  } catch (e) {
    res.status(500).json({ massage: 'Что-то пошло не так' })
  }
}


exports.login = async (req, res) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        massage: 'Некорректные данные при входе'
      })
    }

    const { email, password } = req.body

    let user = await User.findOne({ where: { email } })

    if (!user) {
      //return res.status(400).json({ massage: 'Пользователь не найден' })
      return res.json({
        status: 'err',
        message: 'wrong_email_or_password'
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      //return res.status(400).json({ massage: 'Неверный пароль, попробуйте снова' })
      return res.json({
        status: 'err',
        message: 'wrong_email_or_password'
      })
    }

    const token = generateJwt(user.id)

    res.json({
      token,
      status: 'ok',
      data: {
        id: user.id,
        email: user.email,
      }
    })

  } catch (e) {
    res.status(500).json({ massage: 'Что-то пошло не так' })
  }
}

exports.check = async (req, res) => {
  const token = generateJwt(req.user.id)
  return res.json({ token })
}