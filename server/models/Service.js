import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'Code'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Service = mongoose.model('Service', serviceSchema);
export default Service;
