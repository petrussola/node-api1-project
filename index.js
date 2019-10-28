// implement your API here
const express = require('express');
const cors = require('cors');

const server = express();

server.use(cors());
server.use(express.json());

server.get('*', handleDefaultRequest)

function handleDefaultRequest(req, res) {
    res.json('hello from node')
}

server.listen(process.env.PORT || 3000, () => {
    console.log('listening on ' + (process.env.PORT || 3000))
});