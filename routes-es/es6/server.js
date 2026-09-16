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

// http://localhost:3000/prodotti/:id
app.delete('/prodotti/:id', (req, res) => {
    // cerco l'id del prodotto
    const idRichiesto = parseInt(req.params.id);

    // cerco la posizione del prodotto
    const index = prodotti.find(p => p.id === idRichiesto);

    // se l'id è -1 il prodotto non esiste
    if (index === -1) {
        return res.status(404).json({ errore: "prodotto non trovato" });
    };

    // rimuovo l'elemento dall'array con splice
    const [prodottoEliminato] = prodotti.splice(index, 1);

    res.json({
        messaggio: "Prodotto eliminato con successo",
        prodotto: prodottoEliminato
    })

});

app.listen(port);