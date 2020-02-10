//import express from 'express'; //ES2015 Modules
const express = require('express'); // CommonJS Modules

const server = express();

server.get('/', (req, res) => {
    res.json({ hello: 'web26' })
})

const port = 5000;
server.listen(port, () => {
    console.log(`API on port ${port} works!`)
})

//npm install express
//npm run server