import "./App.css";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { SlCheck } from "react-icons/sl";

function App() {
  const [todos, setTodos] = useState();
  const [checked, setChecked] = useState();
  const [todoData, setTodoData] = useState("");
  const [statusType, setStatusType] = useState();
  const [updateID, setUpdateID] = useState();
  const [deleteID, setDeleteID] = useState();

  useEffect(() => {
    updateTodos();
  }, []);

  useEffect(() => {
    console.log(statusType);
    statusTodos(statusType);
  }, [statusType, checked]);

  useEffect(() => {
    deleteTodos();
  }, []);
  const deleteTodos = async (deleteID) => {
    await axios
      .delete(`http://localhost:8080/deleteTodo/${deleteID}`)
      .then((res) => statusTodos())
      .catch((err) => console.log(err));
  };

  const updateTodos = async (e, updateID) => {
    console.log(e);
    console.log("updated id:", updateID);
    let isChecked = e.target.checked;
    setChecked(isChecked);

    // console.log("checked", checked);
    await axios
      .patch(
        `http://localhost:8080/updateTodo/${updateID}`,
        isChecked
          ? {
              status: "completed",
            }
          : {
              status: "initiated",
            }
      )
      .then((res) => {
        console.log("update res", res.data);
        statusTodos();
      })
      .catch((err) => console.log(err));
  };

  const statusTodos = async (statusType) => {
    console.log(status);
    await axios
      .get(`http://localhost:8080/todoStatus/${statusType}`)
      .then((res) => setTodos(res.data))
      .catch((err) => console.log(err));
  };

  const handleCreateTodo = (e) => {
    e.preventDefault();
    createTodos();
  };

  const createTodos = async () => {
    await axios
      .post("http://localhost:8080/addTodo", {
        title: todoData,
        status: "initiated",
      })
      .then((res) => statusTodos())
      .catch((err) => console.log(err));
  };

  const getData = (date) => {
    // console.log(date)
    let newDate = new Date(date);
    /* Date format you have */
    let dateMDY = `${newDate.getDate()}-${
      newDate.getMonth() + 1
    }-${newDate.getFullYear()}`;
    // console.log(dateMDY)
    /* Date converted to MM-DD-YYYY format */
    return dateMDY;
  };

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

            <div
              className="w-23 flex justify-around align-middle bg-gray-950 text-white p-3 rounded-lg cursor-pointer"
              onClick={(e) => handleCreateTodo(e)}
            >
              {/* <div className="justify-center"> */}
              <button>
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
              className="w-45 border-2 border-gray-200 py-2
 rounded-sm cursor-pointer focus:border-blue-500 active:border-blue-700 "
              onClick={() => setStatusType("allTodos")}
            >
              All
            </div>
            <div
              className="w-45 border-2 border-gray-200 py-2
 rounded-sm cursor-pointer focus:border-blue-500 active:border-blue-700"
              onClick={() => setStatusType("initiated")}
            >
              Active
            </div>
            <div
              className="w-45 border-2 border-gray-200 py-2 cursor-pointer
 rounded-sm focus:border-blue-500 active:border-blue-700"
              onClick={() => setStatusType("completed")}
            >
              Completed
            </div>
          </div>
          <div className="flex flex-col gap-2  pt-5">
            {statusType === "completed"
              ? todos.map((todo) => (
                  <div className="flex justify-between border border-gray-200 rounded-lg p-1 m-2 ">
                    <div className="border-2 border-green-900 bg-green-200 rounded-lg p-1 text-green-900">
                      COMPLETED
                    </div>
                    <div className="text-2xl">{todo.title}</div>
                    <div className="text-2xl">{getData(todo.createdAt)}</div>
                  </div>
                ))
              : statusType === "initiated"
              ? todos?.map((todo) => (
                  <div
                    key={todo._id}
                    className="flex justify-between items-center text-center border-2 border-gray-200 p-2 m-2 rounded-lg"
                  >
                    <div key={todo._id}>
                      <input
                        type="checkbox"
                        class="form-check-input scale-150 p-2"
                        onChange={(e) => updateTodos(e, todo._id)}
                        checked={todo.status === "completed"}
                      />
                    </div>
                    <div className="text-2xl text-center">
                      {todo.status === "completed" ? (
                        <del>
                          <p className=" mb-0">{todo.title}</p>
                        </del>
                      ) : (
                        <p className=" mb-0">{todo.title}</p>
                      )}
                    </div>
                    <div onClick={() => deleteTodos(todo._id)}>
                      <RxCross2 size={30} className="cursor-pointer" />
                    </div>
                  </div>
                ))
              : todos?.map((todo) => (
                  <div
                    key={todo._id}
                    className="flex justify-between items-center text-center border-2 border-gray-200 p-2 m-2 rounded-lg"
                  >
                    <div key={todo._id}>
                      <input
                        type="checkbox"
                        class="form-check-input scale-150 p-2"
                        onChange={(e) => updateTodos(e, todo._id)}
                        checked={todo.status === "completed"}
                      />
                    </div>
                    <div className="text-2xl text-center">
                      {todo.status === "completed" ? (
                        <del>
                          <p className=" mb-0">{todo.title}</p>
                        </del>
                      ) : (
                        <p className=" mb-0">{todo.title}</p>
                      )}
                    </div>
                    <div onClick={() => deleteTodos(todo._id)}>
                      <RxCross2 size={30} />
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
      {/* <p>{todos} </p> */}
    </>
  );
}

export default App;
