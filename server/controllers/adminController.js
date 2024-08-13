const { Admin } = require("../models");
const factory = require("./handlerFactory");

// Get one admin
exports.getAdmin = factory.getOne(Admin);

// Get all admins
exports.getAdmins = factory.getAll(Admin);

// Add a new admin
exports.addAdmin = factory.createOne(Admin);

// Update admin
exports.updateAdmin = factory.updateOne(Admin);

// Delete admin
exports.deleteAdmin = factory.deleteOne(Admin);
