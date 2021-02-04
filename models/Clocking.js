const mongoose = require('mongoose')

const ClockingSchema = new mongoose.Schema({
  clockIn: {
    type: Date,
    default: Date.now,
  },
  clockOut: {
    type: Date,
    default: Date.now,
  },
  employee:{
    type:Number,
    ref: 'Employee'
  }
})

module.exports = mongoose.model('Clocking', ClockingSchema)