const Sequelize = require('sequelize')

module.exports = new Sequelize('heroku_946f575f2d1ee0e', 'b3b19bec5042bc', '12ddc7c5', {
  dialect: "mysql",
  host: "us-cdbr-east-04.cleardb.com"
})

