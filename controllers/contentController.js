const { Article } = require("../models/Article")

exports.profile = async (req, res) => {
  const id = req.user.id
  res.json({
    status: 'ok',
    data: {
      city: "London",
      languages: ["English"]
    }
  })
}

exports.addArticle = async (req, res) => {
  const { title, text } = req.body
  const article = await Article.create({ title, text })
  res.json({ id: article.id })
}

exports.editArticle = async (req, res) => {
  try {
    const { id, title, text } = req.body
    await Article.update({ title, text }, { where: { id } })
    const news = await Article.findAll({ raw: true })
    res.json(news)
  } catch (e) {
    res.status(500).json({ massage: 'Что-то пошло не так' })
  }
}

exports.deleteArticle = async (req, res) => {
  const id = req.body.id
  await Article.destroy({ where: { id } })
  const news = await Article.findAll({ raw: true })
  res.json(news)
}

exports.news = async (req, res) => {

  const news = await Article.findAll({ raw: true })
  res.json({
    status: 'ok',
    data: news
  })
}