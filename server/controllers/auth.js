const { User, Admin, Teacher, Student } = require('./../models'); // Importing associated models
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const jwt = require('jsonwebtoken');

// Function to sign JWT tokens
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Function to create and send token response
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.user_id);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: {
        id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    },
  });
};

// Signup controller
exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password, passwordConfirm, role } = req.body;

  // Validate password confirmation
  if (password !== passwordConfirm) {
    return next(new AppError('Passwords do not match', 400));
  }

  // Create new user with hashed password
  const user = await User.create({
    name,
    email,
    password, // Sequelize hook will handle hashing
    role,
  });

  // Check the role and create corresponding profile
  if (role === 'admin') {
    await Admin.create({ user_id: user.user_id });
  } else if (role === 'teacher') {
    await Teacher.create({ user_id: user.user_id });
  } else if (role === 'student') {
    await Student.create({ user_id: user.user_id });
  }

  // Send token to client
  createSendToken(user, 201, res);
});

// Login controller
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password are provided
  if (!email || !password) {
    return next(new AppError('Please pro˝vide email and password!', 400));
  }

  // 2) Find the user with the provided email and include the password
  const user = await User.scope('withPassword').findOne({ where: { email } });

  // 3) Check if user exists and if the provided password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 4) If everything is correct, send the token to the client
  createSendToken(user, 200, res);
});
