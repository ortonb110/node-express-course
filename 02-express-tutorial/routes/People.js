const express = require('express');
const Router = express.Router();
let { people } = require("../data");

Router.get("/", (req, res) => {
    res.status(200).json({ success: true, data: people });
  });
  
  Router.post("/", (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, msg: "Please provide name value" });
    } else {
      res.status(201).json({ success: true, person: name });
    }
  });
  Router.post("/postman", (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.send("You did not enter any name!");
    } else {
      res.status(201).json({ success: true, data: [...people, name] });
    }
  });
  
  
  
  //Update data
  Router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
     const person = people.find(person => person.id === Number(id));
     if(!person) {
      return res.status(404).json({success: false, msg:`No person with an id ${id} exist`})
     } else {
       const newPeople = people.map(person => {
        if(person.id === Number(id)) {
          person.name = name
        } return person;
       })
       res.status(200).json({success:true, people: newPeople});
     }
  });
  
  //Delete data
  Router.delete("/:id", (req, res) => {
    
     const person = people.find(person => person.id === Number(req.params.id));
     if(!person) {
      return res.status(404).json({success: false, msg:`No person with an id ${req.params.id} exist`})
     } else {
       const newPeople = people.filter(person=> person.id !== Number(req.params.id));
       res.status(200).json({success:true, people: newPeople});
     }
  });

  module.exports = Router