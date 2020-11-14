const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { User } = require('../../models/user.js');

router.put('/', auth, async (req, res) => {
  let user = await User.findById(req.user._id);
  if (!user) return res.status(404).send('The user with the given ID was not found.');

  user.tasks.push(req.body.description);
  await user.save();

  res.status(200).json(user.tasks[user.tasks.length - 1]);
});

module.exports = router;