import React, { useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
const TodoList = () => {
  const [tasks, setTasks] = React.useState([]);
  const [editIndex, setEditIndex] = React.useState(null);
  const [editedTaskText, setEditedTask] = React.useState("");

  async function addTask(event) {
    event.preventDefault();
    let taskInput = document.getElementById("task-input").value;
    if (taskInput.trim() === "") {
      alert("Task cannot be empty!");
      document.getElementById("task-input").value = "";
      return;
    }
    await axios.post("https://todo-mern-server-labkbqrsg-anshus-projects-172604fa.vercel.app/tasks", {
      task: taskInput,
      isCompleted: false,
    });
    setTasks((prevTasks) => [...prevTasks, taskInput]);
    document.getElementById("task-input").value = "";
    getTasks();
  }

  const handleEdit = (index, task) => {
    setEditIndex(index);
    setEditedTask(task?.task);
  };

  const handleSave = (index) => {
    const updatedTasks = [...tasks];
    try {
      axios.put(`https://todo-mern-server-labkbqrsg-anshus-projects-172604fa.vercel.app/tasks/${tasks[index]?._id}`, {
        task: editedTaskText,
        isCompleted: false
      })
    } catch (error) {
      console.log("Error", error);
    }
    updatedTasks[index] =  { task: editedTaskText, isCompleted: false };
    setTasks(updatedTasks);
    setEditIndex(null);
    setEditedTask("");
  };

  const handleDelete = async (index) => {
    const updatedTasks = tasks.filter((task, idx) => idx !== index);
    setTasks(updatedTasks);
    try {
      axios.delete(`https://todo-mern-server-labkbqrsg-anshus-projects-172604fa.vercel.app/tasks/${tasks[index]?._id}`)
    } catch (error) {
      console.log("Error", error);
    }
  };

  const getTasks = async () => {
    try {
      const response = await axios.get("https://todo-mern-server-labkbqrsg-anshus-projects-172604fa.vercel.app/tasks");
      setTasks(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h1 className="flex justify-center items-center text-6xl font-bold text-slate-800 mb-5">
        TODO List
      </h1>
      <form
        onSubmit={addTask}
        className="flex items-center justify-center w-[600px] mb-5"
      >
        <input
          type="text"
          id="task-input"
          className="border-[3px] p-2 rounded-md border-solid bg-slate-500 w-[80%] text-white"
          autoFocus
        />
        <button
          type="submit"
          className="flex border-[3px] p-2 w-[20%] rounded-md border-solid bg-slate-600 text-white justify-center items-center"
        >
          Add Task
        </button>
      </form>
      <div className="flex flex-col justify-center w-[600px]">
        <ul className="flex flex-col gap-2 justify-center text-semibold text-xl w-full">
          {tasks?.length === 0 ? (
            <h2>No tasks left</h2>
          ) : (
            tasks?.map((task, index) => (
              <li
                key={index}
                className="flex items-center justify-between text-semibold text-xl w-full px-4"
              >
                <div className="flex items-center gap-2">
                  <p>{index + 1}</p>
                  {editIndex === index ? (
                    <input
                      type="text"
                      value={editedTaskText}
                      onChange={(e) => setEditedTask(e.target.value)}
                    />
                  ) : (
                    <p>{task?.task}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {editIndex === index ? (
                    <button onClick={() => handleSave(index)}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(index, task)}>
                      <FaEdit />
                    </button>
                  )}
                  <button onClick={() => handleDelete(index)}>
                    <MdDelete />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
