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

exports.news = async (req, res) => {

  const news = await Article.findAll({ raw: true })
  res.json({
    status: 'ok',
    data: news
  })
}