import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

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

// http://localhost:3000/
app.get('/', (req, res) => {
    res.send('scrivi /prodotti sulla barra di ricerca dopo alla fine del url per vedere i prodotti');
});

// http://localhost:3000/prodotto/cerca
app.get("/prodotti/cerca", (req, res) => {

    //estraggo nome da dalla query string (?nome=...)
    const nomeCercato = req.query.nome;

    // verifico abbia un valore
    if (!nomeCercato) {
        return res.status(404).json({ errore: "specifica nome da cercare" });
    };

    //nfiltriamo l'array
    const risultati = prodotti.filter(p => p.nome.toLowerCase().includes(nomeCercato.toLowerCase()));

    // restituisce un array di risultati
    res.json(risultati);

});


app.listen(port);