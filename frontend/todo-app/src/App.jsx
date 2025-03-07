import "./App.css";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

function App() {
  const [todos, setTodos] = useState();
  const [deleteID, setdeleteID] = useState();
  const [checked, setChecked] = useState();
  const [updateID, setUpdateID] = useState();
  const [todoData, setTodoData] = useState("");

  useEffect(() => {
    getTodos();
  }, [deleteID, updateID, checked,todoData]);
  useEffect(() => {
    deleteTodos();
  }, [deleteID]);
  useEffect(() => {
    updateTodos();
  }, [updateID, checked]);

  const getTodos = async () => {
    await axios
      .get("http://localhost:8080/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  };
  // console.log(todos)
  // const handleDelete = async (e, deleteID) => {
  //   await axios
  //     .delete(`http://localhost:8080/deleteTodo/${deleteID}`)
  //     .then((res) => console.log(res.data))
  //     .catch((err) => console.log(err));
  const handleDelete = (id) => {
    setdeleteID(id);
  };
  // console.log(deleteID);

  const deleteTodos = async () => {
    await axios
      .delete(`http://localhost:8080/deleteTodo/${deleteID}`)
      .then((res) => getTodos())
      .catch((err) => console.log(err));
  };

  const handleChecked = (e, id) => {
    let isChecked = e.target.checked;
    console.log("---------");
    console.log("e", isChecked);
    console.log("id", id);
    setChecked(isChecked);
    console.log("------");
    setUpdateID(id);
  };
  // console.log(checked)

  const updateTodos = async () => {
    console.log("id", updateID);
    console.log("checked", checked);
    await axios
      .patch(
        `http://localhost:8080/updateTodo/${updateID}`,
        checked
          ? {
              status: "completed",
            }
          : {
              status: "initiated",
            }
      )
      .then((res) => {})
      .catch((err) => console.log(err));
  };
  // const handleCreatePosts=(e)=>{
  //   setTodoData({...todoData,[e.target.name]:e.target.value})
  //   console.log(todoData)
  // }
  const handleCreateTodo = (e) => {
    e.preventDefault();
    createTodos();
  };

  const createTodos = async () => {
    await axios
      .post("http://localhost:8080/addTodo", { title: todoData,status:"initiated" })
      .then((res) => getTodos())
      .catch((err) => console.log(err));
  };
  // console.log(todoData)

  return (
    <>
     
      <h1 className="text-5xl text-center">To-do List</h1>
      <div className="w-1/2 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 m-auto">
        <div className="flex flex-col">
          <div className="flex p-5 justify-between">
            <div className="flex ">
              <input
                type="email"
                class="form-control"
                name="createTodo"
                // value={todoData}
                onChange={(e) => setTodoData(e.target.value)}
                placeholder="Add a new task.."
                size={65}
              />
            </div>

            <div className="w-23 flex justify-around align-middle bg-gray-950 text-white p-3 rounded-lg cursor-pointer" onClick={(e) => handleCreateTodo(e)} >
              {/* <div className="justify-center"> */}
              <button >
                <FaPlus />
              </button>
              {/* </div> */}
              {/* <div> */}
              <h5 className="mb-0">Add</h5>
              {/* </div> */}
            </div>
          </div>
          <div className="w-100 flex justify-evenly text-center text-xl rounded-lg">
            <div
              className="w-45 border-2 border-gray-200
 rounded-sm"
            >
              All
            </div>
            <div
              className="w-45 border-2 border-gray-200
 rounded-sm"
            >
              Active
            </div>
            <div
              className="w-45 border-2 border-gray-200
 rounded-sm"
            >
              Completed
            </div>
          </div>
          <div className="flex flex-col gap-2  m-2">
            {todos &&
              todos.map((todo) => (
                <div
                  key={todo._id}
                  className="flex justify-between text-center border-2 border-gray-200 p-2 m-2 rounded-lg"
                >
                  <div key={todo._id}>
                    <input
                      type="checkbox"
                      class="form-check-input scale-150 p-2 align-middle"
                      onChange={(e) => handleChecked(e, todo._id)}
                    />
                  </div>
                  <div className="text-xl">
                    {checked ? (
                      <del>
                        <p>{todo.title}</p>
                      </del>
                    ) : (
                      <p>{todo.title}</p>
                    )}
                  </div>
                  <div onClick={(e) => handleDelete(todo._id)}>
                    <RxCross2 size={30} />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <p>{todos} </p>
    </>
  );
}

export default App;
