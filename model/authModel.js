const mongoose = require('mongoose');

const Auth = new mongoose.Schema(
    {
      studentid: {
        type:Number,
        // required:true,
        trim:true,
    },
      name: {
          type:String,
          required:true,
          trim:true,
      },
      mobile: {
          type:String,
          // required:true,
          trim:true,
          unique:true
      },
      course:{
          type:String,
          default:""
      },
      designation: {
        type: String,
        default: ""
      },
      gender: {
        type: String,
        default: ""
      },
    },
    {
      collection: "users",
      timestamps: true,
    }
  );

module.exports = mongoose.model("Auth", Auth);



