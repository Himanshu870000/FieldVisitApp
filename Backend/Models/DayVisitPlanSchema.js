const mongoose = require('mongoose');

const dayVisitPlanSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  });
  
  const DayVisitPlan = mongoose.model('DayVisitPlan', dayVisitPlanSchema);

module.exports = DayVisitPlan;
