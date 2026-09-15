import express from 'express';

const app = express();
const port = 3000;

// http://localhost:3000/
app.get('/', (req, res) => {

    // ottengo l'ora esatta attuale e la salvo in una variabile

    const currentTime = new Date().toLocaleTimeString('it-IT');
    res.send(`Benvenuto in questo server express, l'ora attuale è:${currentTime}`);
})

app.listen(port);