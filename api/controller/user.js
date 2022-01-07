const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const User = require("../models/user");
const { statusCodes, Messages } = require("../constant/index");

exports.postUser = async (req, res, next) => {
  try {
    const data = await User.find({ email: req.body.email });

    if (data.length >= 1) {
      return res.status(statusCodes.BAD_REQUEST).json({
        message: Messages.EMAIL_EXS,
      });
    }

    const hashPass = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      _id: mongoose.Types.ObjectId(),
      fName: req.body.fName,
      lName: req.body.lName,
      role: req.body.role,
      phone: req.body.phone,
      email: req.body.email,
      password: hashPass,
    });

    await User.create(user);
    res.status(statusCodes.OK).json({
      message: Messages.SUCC_SIGN_UP,
    });
  } catch (error) {
    next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    
    const user = await User.find({ email: req.body.email });

    if (user.length === 0) {
      return res.status(statusCodes.BAD_REQUEST).json({
        message: Messages.USER_IN_VAL,
      });
    }

    const check = await bcrypt.compare(req.body.password, user[0].password);

    if (!check) {
      return res.status(statusCodes.BAD_REQUEST).json({
        message: Messages.USER_IN_VAL,
      });
    }

    const token = jwt.sign(
      {
        email: user[0].email,
        userId: user[0]._id,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    res.status(statusCodes.OK).json({
      message: Messages.LOGIN_SUCC,
      token: token,
    });
  } catch (error) {
    next(error);
  }
};
exports.deleteUser = async (req, res, next) => {
  await User.remove({ _id: req.params.id });
  res.status(statusCodes.OK).json({
    message: Messages.ACCOUNT_DEL,
  });
};
