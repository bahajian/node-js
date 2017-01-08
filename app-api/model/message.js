/**
 * Created by bahramhajian on 2016-08-25.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var config = require('../config/config');

var connection = mongoose.createConnection(config.database);
autoIncrement.initialize(connection);


var messageSchema = new Schema({
  sourceUserId: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  destinationId: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  timestamp: Date,
  deleted: Boolean,
  read: Boolean,
  attachment: String,
  toGroup: Boolean,
});

messageSchema.plugin(autoIncrement.plugin, {model: 'Message', field: 'seqId'});
module.exports = mongoose.model('Message', messageSchema);
