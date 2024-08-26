const { User } = require('./../models');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError'); // Custom error handling class
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, role } = req.body;

  // Validate password confirmation
  if (password !== passwordConfirm) {
    return next(new AppError('Passwords do not match', 400));
  }

  // Hash the password before saving it to the database
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    passwordConfirm: hashedPassword, // Store hashed password for confirmation
    role,
  });

  const token = signToken(user.user_id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2) Check if user exists && password is correct
  const user = await User.scope('withPassword').findOne({ where: { email } });

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  const token = signToken(user.user_id);

  res.status(200).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
});
