// Importing the express module to create an instance of the express framework
const express = require("express");

// Importing the user database
const user = require("../db/user");

// Importing the uniqid module to generate unique ids
const uniqid = require("uniqid");

// Creating an instance of the express framework
const app = express();

// Setting up the express app to parse incoming JSON data
app.use(express.json());

// Defining a route for the root endpoint
app.get("/", (req, res) => {
  // Sending a response to the client
  res.send("Hello World!");
});

// Defining a route for the /user endpoint, which accepts a POST request
app.post("/user", (req, res) => {
  // Extracting the name and email from the request body
  const { name, email } = req.body;

  // Generating a unique id
  const id = uniqid();

  // Checking if a user with the same email already exists in the database
  const userExists = user.some((user) => user.email === email);

  // Checking if any required fields are missing
  if (!id || !name || !email) {
    // Sending a 400 Bad Request response if any required fields are missing
    return res.status(400).send("All fields are required");
  } else if (userExists) {
    // Sending a 400 Bad Request response if a user with the same email already exists
    return res.status(400).send("User already exists");
  } else {
    // Adding the new user to the database
    user.push({ id, name, email });

    // Sending the updated user database as the response
    res.send(user);
  }
});

// Defining a route for the /users endpoint, which accepts a POST request
app.post("/users", (req, res) => {
  // Extracting the users array from the request body
  const { users } = req.body;

  // Checking if the users array is empty or not provided
  if (!users || users.length === 0) {
    // Sending a 400 Bad Request response if the users array is empty or not provided
    return res.status(400).send("Users are required");
  }

  // Adding the new users to the database
  user.push(...users);

  // Sending the updated user database as the response
  return res.send(user);
});

// Starting the server on port 4000
app.listen(4000, () => console.log("Listening on port 4000"));
