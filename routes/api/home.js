const express = require('express');
const router = express.Router();
const _ = require('lodash');
const auth = require('../../middleware/auth');
const validate = require('../../middleware/validate.js');
const { User } = require('../../models/user.js');
const { Task, validateTask } = require('../../models/task.js');

router.post('/', auth, async (req, res) => {
  let user = await User.findById(req.user._id);
  if (!user) return res.status(404).send('The user with the given ID was not found.');

  let task = new Task(_.pick(req.body, 'description'));
  task = await task.save();

  user.tasks.unshift(task._id);
  await user.save();

  res.status(200).json(task);
});

router.put('/:id', auth, async (req, res) => {
  let task = await Task.findById(req.params.id);
  if (!task) return res.status(404).send('The task with the given ID was not found.');

  task.description = req.body.description;
  await task.save();

  res.status(200).json(task);
});

router.delete('/:id', auth, async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).send('The task with the given ID was not found.');

  let user = await User.findById(req.user._id);
  
  for (let i = 0; i < user.tasks.length; i++) {
    if (user.tasks[i] == req.params.id) {
      user.tasks.splice(i, 1);
    }
  }

  await user.save();

  res.status(200).json(req.params.id);
});

module.exports = router;