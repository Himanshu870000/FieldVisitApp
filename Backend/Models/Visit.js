const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  visitDate: {
    type: Date,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  dayVisitPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DayVisitPlan',
    required: true,
  },
});

const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;
