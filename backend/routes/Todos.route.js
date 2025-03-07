const express = require("express");
const todoRouter = express.Router();
const { todoModel } = require("../models/Todo.model");

todoRouter.get("/todos", async (req, res) => {
  try {
    const todos = await todoModel.find();
    // console.log("todos")
    res.send(todos);
  } catch (error) {
    res.send(error);
  }
});

todoRouter.post("/addTodo", async (req, res) => {
  const payload = req.body;
  try {
    const newTodo = new todoModel(payload);
    await newTodo.save();
    res.send({ msg: "created todo" });
  } catch (err) {
    res.send({ msg: "Something went wrong" });
  }
});
todoRouter.patch("/updateTodo/:id", async (req, res) => {
  const todoID = req.params.id;
  const { status } = req.body;
  try {
    const todo = await todoModel.findByIdAndUpdate(
      { _id: todoID },
      { status: status }
    );
    res.send({ msg: "updated todo" });
  } catch (err) {
    res.send(err);
  }
});
todoRouter.delete("/deleteTodo/:id", async (req, res) => {
  const todoID = req.params.id;

  try {
    const todo = await todoModel.findByIdAndDelete({ _id: todoID });
    res.send({ msg: "deleted todo" });
  } catch (err) {
    res.send(err);
  }
});
// todoRouter.get("/completedTodos",async(req,res)=>{
//   try{
//     const todos=await todoModel.find({status:"completed"});
//     res.send(todos)

//   }catch(err){
//     res.send(err)
//   }
// })
// todoRouter.get("/activeTodos",async(req,res)=>{
//   try{
//     const todos=await todoModel.find({status:"initiated"});
//     // console.log(todos)
//     res.send(todos)
//   }
//   catch(err){
//     res.send(err)
//   }
// })
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
