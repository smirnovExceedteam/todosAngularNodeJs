const Users = require('../models/userSchema')
const Tasks = require('../models/taskSchema')
const jwt = require('jsonwebtoken')

const TOKEN_SECRET =
  '924ce4af5efec064e4ddb904ee4d71f0b20adf735e5d71f86289bfd3d7cc8dcaadeaee6ab1cfde9e1fa1b35957f74c4c796fefb31ef279c4dc474966f052d185'
const REF_TOKEN_SECRET =
  '39632ab0a2112e9dbf6b4bbd9455197e9048ea0f3c15b0bbeed2e2967863fffb4062e8d21aa1303355ed5f969d4eadd41255616de078c235ec3c10f3ac7dfbe4'

function getTokens(user) {
  if (!user) return undefined
  const data = {
    username: user.username,
    _id: user._id,
  }
  const token = jwt.sign(data, TOKEN_SECRET, { expiresIn: '10s' })
  const refToken = jwt.sign(data, REF_TOKEN_SECRET, { expiresIn: '3000s' })
  return { token, refToken }
}

module.exports.login = async (req, res) => {
  try {
    const result = await Users.findOne({
      username: req.body.username,
      pass: req.body.password,
    })
    if (!result) {
      res.status(404).send('username or password invalid')
      return
    }
    const { token, refToken } = getTokens(result)
    const tokenData = {
      token: token,
      refToken: refToken,
      userId: result._id,
    }
    res.send(JSON.stringify(tokenData))
  } catch (e) {
    res.status(401).send(e)
  }
}

module.exports.refreshTokens = async (req, res) => {
  try {
    const oldToken = req.body.refToken
    const decoded = jwt.verify(oldToken, REF_TOKEN_SECRET)
    const id = decoded._id
    const user = await Users.findOne({ _id: id })
    if (!user) {
      res.status(403).send()
      return
    }
    const { token, refToken } = getTokens(user)
    res.send({ token, refToken })
  } catch (err) {
    res.status(403).send()
  }
}

module.exports.register = async (req, res) => {
  try {
    const result = await Users.create({
      username: req.body.username,
      pass: req.body.password,
    })
    const { token, refToken } = getTokens(result)
    const tokenData = {
      token: token,
      refToken: refToken,
      userId: result._id,
    }
    res.send(JSON.stringify(tokenData))
  } catch (e) {
    res.status(401).send(e)
  }
}
