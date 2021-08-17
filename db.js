const Sequelize = require('sequelize')

module.exports = new Sequelize("newsdb", "root", "15112008", {
  dialect: "mysql"
})