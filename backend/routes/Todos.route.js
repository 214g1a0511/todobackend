const express = require("express");
const todoRouter = express.Router();
const { todoModel } = require("../models/Todo.model");
const {patchValidation}=require("../validations/patchValidation");
const { postValidation } = require("../validations/postValidation");

todoRouter.get("/todos", async (req, res) => {
  try {
    const todos = await todoModel.find();
    // console.log(todos)
    if(todos.length===0){
      return res.send({msg:"There are no todos to show"})
    }
    return res.send(todos);
  } catch (error) {
    return res.send(error);
  }
});

todoRouter.post("/addTodo",postValidation, async (req, res) => {
  const payload = req.body;
  try {
    const newTodo = new todoModel(payload);
    await newTodo.save();
    return res.send({ msg: "created todo" });
  } catch (err) {
    return res.send(err);
  }
});
todoRouter.patch("/updateTodo/:id",patchValidation, async (req, res) => {
  const todoID = req.params.id;
  const { status } = req.body;
  try {
    const todo = await todoModel.findByIdAndUpdate(
      { _id: todoID },
      { status: status }
    );
    return res.send({ msg: "updated todo" });
  } catch (err) {
    return res.send(err);
  }
});
todoRouter.delete("/deleteTodo/:id", async (req, res) => {
  const todoID = req.params.id;

  try {
    const todo = await todoModel.findByIdAndDelete({ _id: todoID });
    return res.send({ msg: "deleted todo" });
  } catch (err) {
    return res.send({msg:"Todo not found"});
  }
});



todoRouter.get("/todoStatus/:status",async(req,res)=>{
  const status=req.params.status;
  console.log(status)
  try{
    if(status==="completed"){
      const completedTodos=await todoModel.find({status:"completed"})
      res.send(completedTodos)

    }
    else if(status==="initiated"){
      const activeTodos= await todoModel.find({status:"initiated"})
      res.send(activeTodos)
    }
    else{
      const allTodos=await todoModel.find()
      res.send(allTodos)
    }


  }catch(err){
    res.send(err)
  }
})
module.exports = { todoRouter };
