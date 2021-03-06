const express = require('express')
const config = require('config')
const sequelize = require('./db')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT || config.get('port')
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/authRouter'))
app.use('/api/content', require('./routes/contentRouter'))

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()