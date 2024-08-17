const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

// Create handlerFactory function

// Create One
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

// Get One
exports.getOne = (Model, idField, popOptions) =>
  catchAsync(async (req, res, next) => {
    let options = {
      where: { [idField]: req.params.id }, // Use the dynamic ID field
    };

    if (popOptions) {
      options.include = popOptions;
    }

    const doc = await Model.findOne(options);

    if (!doc) {
      return next(new AppError(`No document found with that ${idField}`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

// Get All Need to fix more flexible
exports.getAll = (Model, additionalFilter = {}) =>
  catchAsync(async (req, res, next) => {
    let filter = { ...additionalFilter };

    // If there's a specific parameter for filtering (e.g., based on ID)
    if (req.params.id) filter = { ...filter, id: req.params.id };

    const features = new APIFeatures(Model, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.exec();

    if (!doc || doc.length === 0) {
      return next(new AppError('No documents found', 404));
    }

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc,
    });
  });

exports.updateOne = (Model, idField) =>
  catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const updates = req.body;

    // Find and update the record
    const affectedRows = await Model.update(updates, {
      where: { [idField]: id },
    });

    if (affectedRows[0] === 0) {
      return next(new AppError(`No document found with that ${idField}`, 404));
    }

    // Fetch the updated document
    const updatedDoc = await Model.findOne({ where: { [idField]: id } });

    res.status(200).json({
      status: 'success',
      data: updatedDoc,
    });
  });

exports.deleteOne = (Model, idField) =>
  catchAsync(async (req, res, next) => {
    console.log(
      `Attempting to delete record with ${idField}: ${req.params.id}`
    ); // Log the correct ID field
    const doc = await Model.destroy({
      where: { [idField]: req.params.id },
    });

    if (!doc) {
      console.error(`No document found with ${idField}: ${req.params.id}`); // Log if no record is found
      return next(new AppError(`No document found with that ${idField}`, 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
