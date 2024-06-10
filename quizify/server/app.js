const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoute = require('./routes/User');
const examQuestionsRoute = require('./routes/ExamQuestions');
const userExamsRoute = require('./routes/UserExams');
const examRoute = require('./routes/Exam');
const mcqsRoute = require('./routes/mcq'); // Import the mcqs route
const tutorialRoute = require('./routes/Tutorial');
require('dotenv').config();
const path = require("path");

mongoose.set('strictQuery', false);

const uri = process.env.DATABASE_ACCESS; // Use MongoDB Atlas connection string from .env file
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch(err => {
  console.error('Error connecting to MongoDB Atlas', err);
});

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRoute);
app.use('/examquestions', examQuestionsRoute);
app.use('/exam', examRoute);
app.use('/userexams', userExamsRoute);
app.use('/mcqs', mcqsRoute); // Use the mcqs route
app.use('/tutorials', tutorialRoute);

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });

const PORT = process.env.PORT || 5000; // Use environment port or 5000 as default
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
