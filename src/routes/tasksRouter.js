const tasksRouter = require('express').Router()
const taskController = require('../controllers/taskController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')

tasksRouter.get('/tasks', jwtMiddleware.jwtValidate, taskController.getTasks)
tasksRouter.put('/tasks', jwtMiddleware.jwtValidate, taskController.addTask)
tasksRouter.delete(
  '/tasks/:id',
  jwtMiddleware.jwtValidate,
  taskController.deleteTask
)
tasksRouter.post('/tasks/:id', jwtMiddleware.jwtValidate, taskController.update)
tasksRouter.patch(
  '/tasks/:id',
  jwtMiddleware.jwtValidate,
  taskController.clearSelected
)
tasksRouter.post(
  '/tasks/:id/toggle',
  jwtMiddleware.jwtValidate,
  taskController.toggleSelected
)

module.exports = tasksRouter
