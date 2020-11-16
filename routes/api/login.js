const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const _ = require('lodash');
const validate = require('../../middleware/validate.js');
const { User, validateUser } = require('../../models/user.js');
const { Task } = require('../../models/task.js');

router.post('/', async(req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ username: req.body.usernameOrEmail });
  if (!user) user = await User.findOne({ email: req.body.usernameOrEmail });
  if (!user) return res.status(400).send('Invalid username, email or password.');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid username, email or password.');

  const token = user.generateAuthToken();

  let tasks = [];

  for (let i = 0; i < user.tasks.length; i++) {
    console.log(user.tasks[i])
    tasks.push(await Task.findById(user.tasks[i]));
  }

  let response = {
    username: user.username,
    email: user.email,
    auth: token,
    tasks: tasks
  }

  res.status(200).json(response);
});

module.exports = router;