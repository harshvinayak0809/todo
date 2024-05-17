import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editMode, setEditMode] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:4000/todos");
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (newTodo.trim() === "") return;
    await axios.post("http://localhost:4000/todos", { text: newTodo });
    setNewTodo("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:4000/todos/${id}`);
    fetchTodos();
  };

  const deleteAllTodo = async () => {
    await axios.delete(`http://localhost:4000/todos`);
    fetchTodos();
  };
  const updateTodo = async (id) => {
    await axios.put(`http://localhost:4000/todos/${id}`, { text: editText });
    setEditMode(null);
    setEditText("");
    fetchTodos();
  };

  return (
    <Div>
      <h1>Todo App</h1>
      <div>
        <input
          type='text'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='Enter todo...'
        />
        <button onClick={addTodo} className='addbtn'>
          Add Todo
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            {editMode === todo._id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  onClick={() => updateTodo(todo._id)}
                  className='savebtn'
                >
                  Save
                </button>
              </>
            ) : (
              <>
                {todo.text}
                <div className='btn'>
                  <button
                    onClick={() => setEditMode(todo._id)}
                    className='editbtn'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo._id)}
                    className='deletebtn'
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
      <button onClick={deleteAllTodo} className='clrbtn'>
        Clear All
      </button>
    </Div>
  );
};

export default Todo;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  align-items: center;
  justify-content: center;
  width: 30%;
  border-radius: 2rem;
  box-shadow: 0 0 10px 1px #000;
  padding: 2rem;
  font-weight: 500;
  background: rgb(238 249 249 / 50%);
  div {
    margin: 1rem 0;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5rem;
    box-shadow: 0 0px 10px 1px #012;
    border-radius: 10px;
    padding: 0.4rem;
    list-style: none;
    .btn {
      margin: 0;
    }
  }
  &:hover li {
    transform: translate(1.2);
  }
  input {
    margin: 0.5rem;
    padding: 0.3rem;
  }
  button {
    padding: 4px;
    margin: 0.2rem;
    border-radius: 4px;
    cursor: pointer;
  }
  .addbtn {
    background-color: green;
    color: white;
  }
  .editbtn {
    background-color: skyblue;
    color: black;
  }
  .deletebtn {
    background-color: red;
    color: black;
  }
  .clrbtn {
    background-color: pink;
    color: black;
  }
`;
