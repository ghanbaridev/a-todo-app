import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const TASKS_FILE = path.join(__dirname, 'tasks.json');
const PORT = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Model functions
function getAllTasks() {
    try {
        const data = fs.readFileSync(TASKS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}

function saveTasks(tasks) {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2), 'utf8');
}

// Routes
app.get('/', (req, res) => {
    const tasks = getAllTasks();
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.completed).length;
    const completedPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    res.render('index', { 
        tasks,
        totalTasks,
        completedTasks,
        completedPercentage
    });
});

app.post('/add', (req, res) => {
    const { title } = req.body;
    if (!title) return res.redirect('/');
    
    const tasks = getAllTasks();
    const newTask = {
        id: Date.now(),
        title,
        completed: false,
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveTasks(tasks);
    res.redirect('/');
});

app.post('/complete/:id', (req, res) => {
    const { id } = req.params;
    const tasks = getAllTasks();
    const task = tasks.find(t => t.id === Number(id));
    
    if (task) {
        task.completed = !task.completed;
        saveTasks(tasks);
    }
    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    const tasks = getAllTasks();
    const filteredTasks = tasks.filter(t => t.id !== Number(id));
    saveTasks(filteredTasks);
    res.redirect('/');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    
    // Create tasks.json if it doesn't exist
    if (!fs.existsSync(TASKS_FILE)) {
        fs.writeFileSync(TASKS_FILE, '[]', 'utf8');
        console.log('Created tasks.json file');
    }
});