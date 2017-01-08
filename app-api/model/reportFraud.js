/**
 * Created by bahramhajian on 2016-08-25.
 */
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('ReportFraud', new Schema({
  userId: mongoose.Schema.Types.ObjectId,
  messageId: mongoose.Schema.Types.ObjectId,
  reportedBy: mongoose.Schema.Types.ObjectId,
  fraudType: String,
  reportedOn: Date
}));
