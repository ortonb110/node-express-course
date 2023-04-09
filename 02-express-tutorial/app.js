const express = require("express");
const app = express();
let { people } = require("./data");
//Static assets
app.use(express.static("./methods-public"));

//Api people
app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

//Parse form data
app.use(express.urlencoded({ extended: false }));
//Parse form JSON
app.use(express.json());

app.post("/login", (req, res) => {
  const { name } = req.body.name;
  if (!name) {
    return res.send("You did not enter any name!");
  } else {
    res.send(`Welcome ${name}`);
  }
});

app.post("/api/postman/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.send("You did not enter any name!");
  } else {
    res.status(201).json({ success: true, data: [...people, name] });
  }
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide name value" });
  } else {
    res.status(201).json({ success: true, person: name });
  }
});

//Update data
app.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
   const person = people.find(person => person.id === Number(id));
   if(!person) {
    return res.status(404).json({success: false, msg:`No person with an id ${id} exist`})
   } else {
     res.status(200).json({success:true, msg: "Name update!"});
   }
});

app.listen(5000, () => {
  console.log("Server started on port 5000...");
});
