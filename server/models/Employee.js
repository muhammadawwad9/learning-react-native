const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  picture: { type: String },
  salary: { type: String },
  position: { type: String },
});

module.exports = mongoose.model("employee", EmployeeSchema);
