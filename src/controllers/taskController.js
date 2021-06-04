const Tasks = require('../models/taskSchema')
const TOKEN_SECRET =
  '924ce4af5efec064e4ddb904ee4d71f0b20adf735e5d71f86289bfd3d7cc8dcaadeaee6ab1cfde9e1fa1b35957f74c4c796fefb31ef279c4dc474966f052d185'

module.exports.getTasks = async (req, res) => {
  try {
    const id = req.user._id
    const tasks = await Tasks.find({ userId: id })
    res.send(tasks)
  } catch (err) {
    res.status(401).send(err)
  }
}

module.exports.addTask = async (req, res) => {
  try {
    const { completed, text } = req.body
    const userId = req.user._id
    const tasks = await Tasks.create({ completed, text, userId: userId })
    res.send(tasks)
  } catch (err) {
    res.status(401).send(err)
  }
}

module.exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id
    const userId = req.user._id
    const tasks = await Tasks.findOneAndDelete({ _id: id, userId: userId })
    res.send(tasks)
  } catch (e) {
    res.status(401).send(e)
  }
}

module.exports.update = async (req, res) => {
  try {
    const task = req.body
    const userId = req.user._id
    const id = req.params.id
    const result = await Tasks.findByIdAndUpdate(
      { _id: id, userId: userId },
      task
    )
    res.send(result)
  } catch (e) {
    res.status(401).send(e)
  }
}

module.exports.toggleSelected = async (req, res) => {
  try {
    const allSelected = req.query.allSelected

    const id = req.user._id
    const result = await Tasks.updateMany(
      { userId: id },
      { completed: allSelected }
    )
    res.send(result)
  } catch (e) {
    res.status(401).send(e)
  }
}

module.exports.clearSelected = async (req, res) => {
  try {
    const id = req.user._id
    const result = await Tasks.deleteMany({ userId: id, completed: true })
    res.send(result)
  } catch (e) {
    res.status(401).send(e)
  }
}
