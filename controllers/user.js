const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      password: hash,
      email: req.body.email,
      phone: req.body.phone,
    });
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  const user = await User.find({ email: req.body.email });
  if (!user) {
    res.send("User not exist");
  }
  ispassword = await bcrypt.compare(req.body.password, user[0].password);
  if (!ispassword) {
    res.send("Password mismatch");
  }
  const token = jwt.sign(
    { id: user[0]._id, isAdmin: user[0].isAdmin },
    process.env.JWT_TOKEN
  );
  res.cookie("access_token", token).send("Successfully Loged");
};

module.exports = { register, login };
