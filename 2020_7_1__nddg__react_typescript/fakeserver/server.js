const express = require('express')
const app = express()
const port = 3500
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

let characters = [];

app.get('/characters', (req, res) => {

    setTimeout(() => {
        res.send(characters);
    }, 2000);
});

app.post('/characters', (req, res) => {
    console.log('POST received', req.body);

    const character = req.body;
    character.id = Math.floor(Math.random() * 100000);
    characters.push(character);

    console.log('Now you have these characters: ', characters);

    setTimeout(() => {
        res.status(200).send();
    }, 2000);
});

app.get('/', (req, res) => res.send('The Character Api!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))