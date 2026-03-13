// start creating server here
import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
// app.use((req, res, next) =>{
//     let body = '';
//     req.on('data', chunk => body += chunk);
//     res.on('end', () =>{
//         try{
//             req.body = body ? JSON.parse(body) : {};
//         }catch{
//             req.body = {};
//         }
//         next();
//     })
// })

let todos = [];
let todoId = 0;

app.get('/', (req, res) =>{
    res.status(200).send("Hello World")
})

app.post('/create/todo', (req, res) =>{
    try{
        const {title, description} = req.body
        if(!title || !description){
            return res.status(400).json({error: 'Title and description required'})
        }
        const todo = {id: todoId++, title, description};
        todos.push(todo);
        todoId++;

        res.status(200).json(todos)
    }catch(err){
        res.status(500).json({error: err.message});
    }
})


app.get('/todos', (req, res) =>{    
    res.status(200).json(todos);
})


app.get('/todo', (req, res) =>{
    const id = parseInt(req.query.id);
    if(isNaN(id)) return res.status(404).json({error: 'Todo not found'});
    const todo = todos.find(t => t.id ===id);
    if(!todo) return res.status(404).json({error: 'Todo not found'});
    
    res.status(200).json(todo);
})

app.delete('/todo', (req, res) =>{
    const id = parseInt(req.query.id);
    if(isNaN(id)) return res.status(404).json({error: 'Invalid ID'});
    
    const index = todos.findIndex(t => t.id === id);
    if(index === -1) return res.status(404).json({error: 'Todo not found'});
    todos.splice(index, 1);
    res.status(200).json(todos);
})



app.listen(3000, () => console.log('Server running on port 3000'));