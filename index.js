// implement your API here
const express = require("express");
const cors = require("cors");

const db = require("./data/db");

const server = express();

server.use(cors());
server.use(express.json());

server.get("/api/users/:id", getUserById);
server.get("/api/users", getAllUsers);
server.get("*", handleDefaultRequest);

function getUserById(req, res) {
  const { id } = req.params;
  db.findById(id)
    .then(data => {
      console.log(data);
      !data
        ? res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." })
        : res.json(data);
    })
    .catch(error => {
      console.log(error);
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." });
    });
}

function getAllUsers(req, res) {
  db.find()
    .then(data => {
      console.log(data);
      res.json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The users information could not be retrieved." });
      console.log(error);
    });
}

function handleDefaultRequest(req, res) {
  res.json("hello from node");
}

server.listen(process.env.PORT || 3000, () => {
  console.log("listening on " + (process.env.PORT || 3000));
});
