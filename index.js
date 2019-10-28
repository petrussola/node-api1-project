// implement your API here
const express = require('express');
const cors = require('cors');

const db = require('./data/db');

const server = express();

server.use(cors());
server.use(express.json());

server.get('/api/users', getAllUsers)
server.get('*', handleDefaultRequest)

function getAllUsers(req, res) {
    db.find()
    .then(data => {
        console.log(data)
        res.json(data)
    })
    .catch(error => {
        console.log(error)
    })
}

function handleDefaultRequest(req, res) {
    res.json('hello from node')
}

server.listen(process.env.PORT || 3000, () => {
    console.log('listening on ' + (process.env.PORT || 3000))
});