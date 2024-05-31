const express = require("express");
const app = express();
const user = require("../db/user");

app.use(express.json());

app.put("/users/:id", (req, res) => {
  const { designation } = req.body;

  if (!designation) {
    res.status(400).json("designation required");
  }
  // getting id from url in params /:id
  const id = req?.params?.id;

  // if no id specified throw 400 error
  if (!id) {
    return res.status(400).status("Please specify id's");
  }

  const idx = user.findIndex((user) => {
    user.id === id;
  });

  user.at(idx).designation = designation;

  return res.status(203).send(user);
});

app.put("/users", (req, res) => {
  const { designation } = req.body;
  if (!designation) {
    return res.status(400).json("designation required");
  }
  const id = req?.query?.id;

  if (!id) {
    res.status(400).send("Please Specify Id in query");
  }
  const idx = user.findIndex((user) => {
    user.id === id;
  });
  user.at(idx).designation = designation;
  return res.status(203).send(user);
});

app.listen(3000, () => {
  console.log("Your port is Running on 3000");
});
