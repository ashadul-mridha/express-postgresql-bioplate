const express = require('express');
const { Pool } = require('pg');
const poll = require("./db");
const app = express()
const port = 3000

//req data parse
app.use(express.json());


// routes 

// get all todos 
app.get("/todos", async (req,res) => {
    try {
        const allTodos = await poll.query("SELECT * from todo");
        res.send(allTodos.rows)
    } catch (error) {
        console.log(error);
    }
})
// get a todo 
app.get("/todos/:id", async (req,res) => {
    try {
        const {id} = req.params;

        const todo = await poll.query(`SELECT * from todo WHERE id = ${id}`);
        // console.log(todo);
        res.send(todo.rows[0])
    } catch (error) {
        console.log(error);
    }
})
// create a todo 
app.post("/todos", async (req, res) => {
    try {
        const {name , desc} = req.body;

        const newTodo = await poll.query("INSERT INTO todo (name ,description) VALUES ($1, $2) RETURNING *", [name ,desc]);
        res.send(newTodo.rows[0])
    } catch (error) {
        console.log(error);
    }
})
// update a todo 
app.put("/todos/:id", async (req,res) => {
    try {
        const {id} = req.params;
        const {desc} = req.body;

        const updateTodo = await poll.query(`UPDATE todo SET description = $1 WHERE id = $2`,[desc, id]);
         
        res.send('Todo Was Update');
        console.log(`UPDATE todo SET description = ${desc} WHERE id = ${id}`,updateTodo);
    } catch (error) {
        console.log(error);
    }
    
})
// delete a todo
app.delete('/todos/:id', async (req , res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await poll.query(`DELETE FROM todo WHERE id = ${id}`);
        res.send('Todo Delete SuccessFully')
    } catch (error) {
        console.log(error);
    }
})


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})