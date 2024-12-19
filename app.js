const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const taskRouter = require("./routes/tasks");
app.use(taskRouter);
const logger = (req,res,next) => {
    res.send(`${req.method}: Recieved on ${req.url}`)
};
app.use(logger);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});


module.exports = app;