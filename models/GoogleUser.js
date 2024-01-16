const mongoose = require('mongoose');
const { Schema } = mongoose;

const GoogleUserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    
    uid:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    },
  });
  
  const GoogleUser = mongoose.model('googleuser', GoogleUserSchema);
  module.exports = GoogleUser;