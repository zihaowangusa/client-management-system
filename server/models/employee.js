'use strict';

const mongoose = require('mongoose'), Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name:  String,
  avatar: String,
  title: String,
  sex: String,
  start_date: Date,
  office_phone: String,
  cell_phone: String,
  sms:  String,
  email: String,
  manager:{type:Schema.Types.ObjectId,ref:'Employee'},
  dr: {type:[String],ref:'Employee'}
});


// Compile model from schema

module.exports = mongoose.model('Employee', EmployeeSchema,'employee');