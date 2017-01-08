
var connection = require('./mysql-connection');

// Create new comment in your database and return its id
exports.create = function(object, cb) {
  cb('12345')
};

// Get a particular comment
exports.findById = function(id, cb) {
  cb(null, {id:id, });
};

exports.exist = function(criteria, cb) {
  cb(null, false);
};

exports.count = function(criteria, cb) {
  cb(null, false);
};

// Get all comments
exports.getAll = function(page, rowPerPage, cb) {
  cb(null, []);
};

exports.getAllByCriteria = function(page, rowPerPage, criteria, cb) {
  cb(null, []);
};

// Get all comments by a particular user
exports.deleteById = function(id, cb) {
  cb(null, []);
};

exports.update = function(object, cb) {
  cb(null, []);
};

exports.patch = function(object, cb) {
  cb(null, []);
};
