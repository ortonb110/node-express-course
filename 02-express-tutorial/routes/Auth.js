const express = require('express');
const Router = express.Router();


Router.post("/", (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.send("You did not enter any name!");
    } else {
      res.send(`Welcome ${name}`);
    }
  });


  module.exports = Router;