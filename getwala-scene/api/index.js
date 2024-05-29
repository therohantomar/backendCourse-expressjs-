// Importing the express module and creating an instance of the express application
const express = require("express");
const app = express();

// Importing the users from the db/user.js file
const users = require("../db/user");

// Middleware to parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(express.urlencoded({ extended: true }));
// Middleware that parses JSON.
app.use(express.json());

// Simple logger middleware.
const logger = (req, res, next) => {
  console.log(req.method, req.url);
  next();
};

// Function to get the list of users from the db/user.js file
function getUsers() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve(users);
    } else {
      reject("something went wrong");
    }
  });
}

// Route to handle the root URL i.e. "/"
app.get("/", (req, res) => {
  res.send(
    "<html><head></head><body><h1 style='color:black;text-align:center'>👋 Hello Brother 👋</h1></body></html>"
  );
});

// Route to handle the "/users" URL and fetch all the users from the db/user.js file
app.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Route to handle the "/users/search" URL and fetch the users based on the name and designation provided in the query parameters
app.get("/users/search", logger, (req, res) => {
  const { name, designation } = req.query;

  if (!name && !designation) {
    return res
      .status(400)
      .send({ message: "Please provide name and designation" });
  }
  const filteredUsers = users.filter(
    (user) => user.name.includes(name) || user.designation.includes(designation)
  );

  res.send(filteredUsers);
});

// Route to handle the "/users/:id" URL and fetch the user based on the id provided in the URL parameter
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  res.send(users.find((user) => user.id == id));
});

// Route to handle all other URLs which do not exist and send a 404 Not Found response
app.use((req, res, next) => {
  res
    .status(404)
    .send(
      "<html><head></head><body><h1 style='color:red;'>🚀👽🔥 404 Not Found 🔥👽🚀</h1></body></html>"
    );
  next();
});

// Starting the server on port 3000
app.listen(3000, () => {
  console.log(`server is running on port 3000`);
});
