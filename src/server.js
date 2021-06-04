const { inject, errorHandler } = require('express-custom-error')
inject()

const mongoose = require('mongoose')

mongoose
  .connect('mongodb://localhost:27017/todosDb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('db connected')
  })
  .catch((err) => {
    console.log('error', err)
  })

const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')
const logger = require('./util/logger')

const PORT = 3000
const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(logger.dev, logger.combined)

app.use(errorHandler())
app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:4200' }))
app.use(helmet())

app.use('/', require('./routes/tasksRouter.js'))
app.use('/', require('./routes/userRouter'))

app.use('*', (req, res) => {
  res.status(404).json({ status: false, message: 'Endpoint Not Found' })
})

app.listen(PORT, () => console.info('Server listening on port ', PORT))
