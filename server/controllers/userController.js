const { User } = require('../models');
const factory = require('./handlerFactory');

// Get one User
exports.getUser = factory.getOne(User);

// Get all Users
exports.getAllUsers = factory.getAll(User);

// Add a new User
exports.addUser = factory.createOne(User);

// Update User
exports.updateUser = factory.updateOne(User);

// Delete User
exports.deleteUser = factory.deleteOne(User);
