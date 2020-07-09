const express = require("express")
var valid = require('validator')
const projectSchema = require("./schema")
const {check, body, validationResult} = require("express-validator");
const projectRouter = express.Router()

projectRouter.get("/", async (req, res, next) => {
  try {
    const projects = await projectSchema.find(req.query).sort({firstname: -1}).limit(0).skip(0)
    res.send({TotalProjects: projects.length, projects})
  } catch (error) {
    next(error)
  }
})

projectRouter.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const project = await projectSchema.findById(id)
    if (project) {
      res.send(project)
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
    
    
   
    const newProject = new projectSchema(req.body)
     const { _id } = await newProject.save()
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
       const newProject = new projectSchema(req.body)
     const { _id } = await newUser.save()
     res.status(201).send(_id)
     }
     
   } catch (error) {
     next(error)
   }
})
 
projectRouter.put("/:id", async (req, res, next) => {
  try {
    const project = await projectSchema.findByIdAndUpdate(req.params.id, req.body)
    console.log(project)
    if (project) {
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
    const project = await projectSchema.findByIdAndDelete(req.params.id)
    if (project) {
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
