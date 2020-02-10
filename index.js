//import express from 'express'; //ES2015 Modules
const express = require('express'); // CommonJS Modules

const server = express();

const Hubs = require('./data/hubs-model.js')

//teaches express how to read JSON from the body
server.use(express.json()); //needed for POST and PUT/PATCH

server.get('/', (req, res) => {
    res.json({ hello: 'web26' })
})

//view a list of hubs
server.get('/api/hubs', (req, res) => {
    // go and get hubs from the data base
    Hubs.find().then(hubs => {
        res.status(200).json(hubs);
    }).catch(err => {
        console.log(err)
        res.status(500).json({ errorMessage: 'oops' })
    });
})

//add a hub
server.post('/api/hubs', (req,res) => {
    //axios.post(url, data, options); the data will be in the body of the res
    const hubInfo = req.body;
    //validate the data, and if the data is valid save it
    console.log('body', req.body)

    Hubs.add(hubInfo).then(hub =>{
        res.status(201).json(hub);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: 'oops'})
    })
})
//^ for post in postman, select body, raw, and switch from text to JSON!


//delete a hub
server.delete('/api/hubs/:id', (req, res) => {
    Hubs.remove(req.params.id).then(removed => {
        res.status(200).json(removed);
    }).catch(err=>{
        console.log(err)
        res.status(500).json({ errorMessage: 'oops'})
    })
})

const port = 5000;
server.listen(port, () => {
    console.log(`API on port ${port} works!`)
})

//npm install express
//npm run server