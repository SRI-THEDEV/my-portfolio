import mongoose from 'mongoose';

const toolkitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  shortLabel: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'tools', 'database', 'design'],
    default: 'frontend'
  },
  iconKey: {
    type: String,
    required: true
  },
  level: {
    type: String,
    default: 'Advanced'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Toolkit = mongoose.model('Toolkit', toolkitSchema);
export default Toolkit;
