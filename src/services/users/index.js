const express = require("express")
var valid = require('validator')
const UserSchema = require("./schema")
const studentModel = require("./schema")
const {check, body, validationResult} = require("express-validator");
const usersRouter = express.Router()

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await UserSchema.find(req.query).sort({firstname: -1}).limit(0).skip(0)
    res.send({TotalStudents: users.length, users})
  } catch (error) {
    next(error)
  }
})
usersRouter.get("/:studentID/projects", async (req, res, next) => {
  try {
    const projects = await studentModel.studentProject(req.params.studentID)
    res.send(projects)
  } catch (error) {
    next(error)
  }
})



usersRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await UserSchema.findById(id)
    if (user) {
      res.send(user)
    } else {
      const error = new Error()
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    console.log(error)
    next("While reading users list a problem occurred!")
  }
})

usersRouter.post("/",
 async (req, res, next) => {
  try {
    
    
   
    const newUser = new UserSchema(req.body)
     const { _id } = await newUser.save()
     res.status(201).send(_id)
     
     
   } catch (error) {
     next(error)
   }
})

usersRouter.post("/checkEmail",
 async (req, res, next) => {
  try {
    const emaiExist = await UserSchema.findOne({"email": req.body.email}).then(function(result){
      return result !==null;
    })
     if(emaiExist){
       res.send("email exits")
     }else{
       const newUser = new UserSchema(req.body)
     const { _id } = await newUser.save()
     res.status(201).send(_id)
     }
     
   } catch (error) {
     next(error)
   }
})
 
usersRouter.put("/:id", async (req, res, next) => {
  try {
    const user = await UserSchema.findByIdAndUpdate(req.params.id, req.body)
    console.log(user)
    if (user) {
      res.send("Ok")
    } else {
      const error = new Error(`User with id ${req.params.id} not found`)
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

usersRouter.delete("/:id", async (req, res, next) => {
  try {
    const user = await UserSchema.findByIdAndDelete(req.params.id)
    if (user) {
      res.send("Deleted")
    } else {
      const error = new Error(`User with id ${req.params.id} not found`)
      error.httpStatusCode = 404
      next(error)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
