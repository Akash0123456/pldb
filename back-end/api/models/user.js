const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { 
      type: String, 
      required: true, 
      unique: true 
    },
    email: {
      type: String, 
      required: true, 
      unqiue: true
    },
    password: { 
      type: String,
      required: true 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
  });

const User = mongoose.model('User', userSchema);

module.exports = User;
  