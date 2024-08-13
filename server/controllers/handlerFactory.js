const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

// Create handlerFactory function

// Delete One
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.destroy({
      where: { id: req.params.id },
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

// Update One
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.update(req.body, {
      where: { id: req.params.id },
      returning: true, // returns the updated object(s) in an array
      plain: true, // makes sure that only the object itself is returned
    });

    if (!doc[1]) {
      // doc[1] contains the updated object, if any
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc[1], // return the updated document
      },
    });
  });

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
exports.getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    let options = {
      where: { id: req.params.id },
    };

    if (popOptions) {
      options.include = popOptions;
    }

    const doc = await Model.findOne(options);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

// Get All
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    if (req.params.tourId) filter = { tourId: req.params.tourId };

    const features = new APIFeatures(Model, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.exec();

    if (!doc) {
      return next(new AppError('No documents found', 404));
    }

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
