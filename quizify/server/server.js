const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require('./routes/User');
const examQuestionsRoute = require('./routes/ExamQuestions');
const userExamsRoute = require('./routes/UserExams');
const examRoute = require('./routes/Exam');
const mcqsRoute = require('./routes/mcq'); // Import the mcqs route
const tutorialRoute = require('./routes/Tutorial');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_ACCESS).then(data => {
    console.log("connected to DB");
}).catch(error => {
    console.log(error);
});

app.use('/users', userRoute);
app.use('/examquestions', examQuestionsRoute);
app.use('/exam', examRoute);
app.use('/userexams', userExamsRoute);
app.use('/mcqs', mcqsRoute); // Use the mcqs route
app.use('/tutorials', tutorialRoute);

app.listen(5000, () => {
    console.log('Server started on 5000');
});
