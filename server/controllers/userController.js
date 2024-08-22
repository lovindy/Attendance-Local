const { User, Admin, Teacher, Student } = require('../models');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

// Add a new User with role-specific logic
exports.addUser = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  try {
    // Start a transaction to ensure both User and related role record are created together
    const result = await User.sequelize.transaction(async (t) => {
      // Create the user
      const newUser = await User.create(
        { name, email, password, role },
        { transaction: t }
      );

      // Based on the role, create the corresponding record
      if (role === 'teacher') {
        await Teacher.create(
          { user_id: newUser.user_id, subject: req.body.subject },
          { transaction: t }
        );
      } else if (role === 'student') {
        await Student.create(
          { user_id: newUser.user_id, class_id: req.body.class_id },
          { transaction: t }
        );
      } else if (role === 'admin') {
        await Admin.create({ user_id: newUser.user_id }, { transaction: t });
      }

      return newUser;
    });

    res.status(201).json({
      status: 'success',
      data: {
        user: result,
      },
    });
  } catch (err) {
    console.error('Error creating user:', err.message);
    console.error('Stack trace:', err.stack);
    return next(new AppError(`Failed to create user: ${err.message}`, 500));
  }
});

// Update User
exports.updateUser = factory.updateOne(User, 'user_id');

// Delete User
exports.deleteUser = factory.deleteOne(User, 'user_id');

// Get one User
exports.getUser = factory.getOne(User, 'user_id', [
  { model: Admin, as: 'AdminProfile' },
  { model: Teacher, as: 'TeacherProfile' },
  { model: Student, as: 'StudentProfile' },
]);

// Get all Users
exports.getAllUsers = factory.getAll(User, {}, [
  { model: Admin, as: 'AdminProfile' },
  { model: Teacher, as: 'TeacherProfile' },
  { model: Student, as: 'StudentProfile' },
]);
