const express = require("express")
var valid = require('validator')
const projectSchema = require("./schema")
const {check, body, validationResult} = require("express-validator");
const projectRouter = express.Router()

projectRouter.get("/", async (req, res, next) => {
  try {
    const users = await projectSchema.find(req.query).sort({firstname: -1}).limit(0).skip(0)
    res.send({TotalStudents: users.length, users})
  } catch (error) {
    next(error)
  }
})

projectRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await projectSchema.findById(id)
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

projectRouter.post("/",
 async (req, res, next) => {
  try {
    
    
   
    const newUser = new projectSchema(req.body)
     const { _id } = await newUser.save()
     res.status(201).send(_id)
     
     
   } catch (error) {
     next(error)
   }
})

projectRouter.post("/checkEmail",
 async (req, res, next) => {
  try {
    const emaiExist = await projectSchema.findOne({"email": req.body.email}).then(function(result){
      return result !==null;
    })
     if(emaiExist){
       res.send("email exits")
     }else{
       const newUser = new projectSchema(req.body)
     const { _id } = await newUser.save()
     res.status(201).send(_id)
     }
     
   } catch (error) {
     next(error)
   }
})
 
projectRouter.put("/:id", async (req, res, next) => {
  try {
    const user = await projectSchema.findByIdAndUpdate(req.params.id, req.body)
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

projectRouter.delete("/:id", async (req, res, next) => {
  try {
    const user = await projectSchema.findByIdAndDelete(req.params.id)
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

module.exports = projectRouter
