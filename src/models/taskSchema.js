const mongoose = require('mongoose')

const TaskSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    text: String,
    completed: Boolean,
  },
  { versionKey: false }
)

const Tasks = mongoose.model('Tasks', TaskSchema)
module.exports = Tasks
