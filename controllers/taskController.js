const tasks = [
  {
      "id": 1,
      "title": "Set up environment",
      "description": "Install Node.js, npm, and git",
      "completed": true
    },
    {
      "id": 2,
      "title": "Create a new project",
      "description": "Create a new project using the Express application generator",
      "completed": true
    },
    {
      "id": 3,
      "title": "Install nodemon",
      "description": "Install nodemon as a development dependency",
      "completed": true
    },
    {
      "id": 4,
      "title": "Install Express",
      "description": "Install Express",
      "completed": false
    },
    {
      "id": 5,
      "title": "Install Mongoose",
      "description": "Install Mongoose",
      "completed": false
    }

]

async function getAllTasks(req,res) {
  res.json(tasks);
};

async function getSingleTask(req,res) {
  try{
    const id = parseInt(req.params.id);
  const task = tasks.find(task => task.id == id);
  if (!task){
    return res
    .status(404).json({message:"Task not found"});
  };
  res.json(task);
  } catch(error){
    console.error(error);
    res.status(500).json({message:"Server side error"})
  }
};

async function createTask(req,res) {
  try {
    const {title,description,completed} = req.body;
    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof completed   !== "boolean"
    ) {
      return res.status(400).json({message: "Invalid task data"});
    }
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      completed,
    };
    console.log({newTask});
    tasks.push(newTask);
    return res.status(201).json({message : " Task created successfully"});
  } catch(error) {
    console.error(error);
    return res.status(500).json({message: "Server side error"});
  }
};

async function updateTask(req,res) {
  try {
    const id = parseInt(req.params.id ,10);
    if (isNaN(id)){
      return res.status(400).json({message: "Invalid Task Id"})
    }
    const task = tasks.find((task) => task.id === id);
    if (!task){
      return res.status(404).json({message: "Requested task is not available"});
    }
    const {title,description,completed} = req.body;
    if (
      typeof title !== "string" ||
      typeof description !== "string" ||
      typeof completed   !== "boolean"
    ) {
      return res.status(400).json({message: "Invalid task data"});
    }
    Object.assign(task, {title,description,completed});
    return res.status(200).json(task);
  } catch(error) {
    console.error(error);
    return res.status(500).json({message : "Server side error"})
  }
};

async function deleteTask(req,res) {
  try {
    const taskId = parseInt(req.params.id, 10);
    if (isNaN(taskId)){
      return res.status(400).json({message: "Invalid Task Id"});
    }
    const taskIndex = tasks.findIndex((task) => task.id === taskId)
    if (taskIndex === -1){
      return res.status(404).json({message: "Task not found"});
    }
    tasks.splice(taskIndex, 1);

    return res.status(200).json({message: "Task deleted successfully"});
  } catch (error) {
    console.error(error)
    res.status(500).json({message: "Server side error"});
  }
}

module.exports = {
  getAllTasks,
  getSingleTask,
  createTask,
  updateTask,
  deleteTask
};