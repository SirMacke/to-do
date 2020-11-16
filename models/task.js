const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  }
});


const Task = mongoose.model('Task', taskSchema);

function validateTask(task) {
  const schema = Joi.object({
    description: Joi.string().required()
  });

  return schema.validate(task);
}

exports.taskSchema = taskSchema;
exports.Task = Task;
exports.validateTask = validateTask;