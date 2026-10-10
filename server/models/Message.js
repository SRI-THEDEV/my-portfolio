import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide your email address'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address'
    ]
  },
  subject: {
    type: String,
    default: 'General Inquiry',
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Please provide a message'],
    trim: true
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Message = mongoose.model('Message', messageSchema);
export default Message;
