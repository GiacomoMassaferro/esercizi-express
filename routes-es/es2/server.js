import express from 'express';

const app = express();
const port = 3001;

const prodotti = [
    {
        id: 1,
        nome: 'Mouse Wireless',
        prezzo: 25.99
    },
    {
        id: 2,
        nome: 'Tastiera Meccanica',
        prezzo: 79.90
    },
    {
        id: 3,
        nome: 'Monitor 27"',
        prezzo: 199.99
    }
];

// http://localhost:3001/
app.get('/', (req, res) => {
    res.send('scrivi /prodotti sulla barra di ricerca dopo alla fine del url per vedere i prodotti');
})

// http://localhost:3001/prodotti
app.get('/prodotti', (req, res) => {
    res.json(prodotti);
}),

    app.listen(port);