const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Todo = require("./Todo"); // Import the Todo model
const cors = require("cors");
const app = express();
const PORT = 4000;

try {
  mongoose
    .connect(
      "mongodb+srv://harsh:harsh@todo-internship.pdaltz3.mongodb.net/?retryWrites=true&w=majority&appName=todo-internship"
    )
    .then(console.log("connecetde"));
} catch (e) {
  console.log(e);
}

app.use(bodyParser.json());
app.use(cors());
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/todos", async (req, res) => {
  const { text } = req.body;
  const todo = new Todo({ text });
  await todo.save();
  res.status(201).send();
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.status(204).send();
});
app.delete("/todos", async (req, res) => {
  await Todo.deleteMany();
  res.status(204).send();
});
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  await Todo.findByIdAndUpdate(id, { text });
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
