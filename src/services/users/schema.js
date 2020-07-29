const { Schema } = require("mongoose")
const mongoose = require("mongoose")
var valid = require('validator')

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate:{
      validator: async(value)=>{
          if(!valid.isEmail(value)){
              throw new Error("Email is invalid")
          }else{
              const checkEmail = await studentModel.findOne({email: value})
              if(checkEmail){
                  throw new Error("Email already existed")
              }
          }
          
      }
  }
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  img : {
    type: String, 
    required: true
  },
  projects : [{
    type : Schema.Types.ObjectId, ref: 'projects'
  }],

 
})
UserSchema.static("studentProject", async function(id){
  const projects  = await studentModel.find({_id: id}).populate("projects");
  return projects;
})


const studentModel = mongoose.model("students",  UserSchema)
module.exports = studentModel