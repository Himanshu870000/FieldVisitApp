const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  visitDate: {
    type: Date,
    required: true,
  },

  visitorName: {
    type: String,
    required: true,
  },

  street: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  state: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  checkIn: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },


  checkOut: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
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

visitSchema.index({ checkIn: '2dsphere', checkOut: '2dsphere', geoLocation: '2dsphere' });

const Visit = mongoose.model('Visit', visitSchema);

module.exports = Visit;
