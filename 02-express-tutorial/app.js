const express = require("express");
const app = express();
const people = require('./routes/People')
const login = require('./routes/Auth')
//Static assets
app.use(express.static("./methods-public"));


//Parse form data
app.use(express.urlencoded({ extended: false }));
//Parse form JSON
app.use(express.json());
app.use('/api/people', people)

app.use('/login', login);

//Api people


app.listen(5000, () => {
  console.log("Server started on port 5000...");
});
