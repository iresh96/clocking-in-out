const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
  _id:{
    type:Number,
    required:true
  },
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model('Employee', EmployeeSchema)