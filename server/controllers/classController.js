const { Class } = require('../models');
const factory = require('./handlerFactory');

// Get all classes
exports.getClasses = factory.getAll(Class);

// Add a new class
exports.addClass = factory.createOne(Class);

// Update class
exports.updateClass = factory.updateOne(Class);

// Delete class
exports.deleteClass = factory.deleteOne(Class);
