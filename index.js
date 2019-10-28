// implement your API here
const express = require("express");
const cors = require("cors");

const db = require("./data/db");

const server = express();

server.use(cors());
server.use(express.json());

server.post("/api/users", createNewUser);
server.get("/api/users/:id", getUserById);
server.get("/api/users", getAllUsers);
server.delete("/api/users/:id", deleteUser);
server.put("/api/users/:id", updateUser);
server.get("*", handleDefaultRequest);

function createNewUser(req, res) {
  if (!req.body.name || !req.body.bio) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  }

  const user = {
    name: req.body.name,
    bio: req.body.bio
  };

  db.insert(user)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({
          error: "There was an error while saving the user to the database"
        })
        .end();
    });
}

function getUserById(req, res) {
  const { id } = req.params;
  db.findById(id)
    .then(data => {
      !data
        ? res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." })
        : res.json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
}

function getAllUsers(req, res) {
  db.find()
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
    });
}

function deleteUser(req, res) {
  const { id } = req.params;
  db.remove(id)
    .then(data => {
      !data
        ? res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." })
        : res.json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user could not be removed" })
        .end();
    });
}

function updateUser(req, res) {
  const { id } = req.params;
  db.update(id, req.body)
    .then(data => {
      if (!data) {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      } else if (!req.body.name || !req.body.bio) {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user." })
          .end();
      } else {
        res.status(200).json(req.body);
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The user information could not be modified." })
        .end();
    });
}

function handleDefaultRequest(req, res) {
  res.json("hello from node");
}

server.listen(process.env.PORT || 3000, () => {
  console.log("listening on " + (process.env.PORT || 3000));
});
