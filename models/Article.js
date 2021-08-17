const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Article = sequelize.define("article", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = { Article }