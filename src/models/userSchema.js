const mongoose = require('mongoose')

const UsersSchema = mongoose.Schema(
  {
    username: String,
    pass: String,
    userCode: Number,
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tasks',
      },
    ],
  },
  { versionKey: false }
)
const Users = mongoose.model('Users', UsersSchema)
module.exports = Users
