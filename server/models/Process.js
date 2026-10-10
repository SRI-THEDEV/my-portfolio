import mongoose from 'mongoose';

const processSchema = new mongoose.Schema({
  step: {
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
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Process = mongoose.model('Process', processSchema);
export default Process;
