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
})

// rotta PUT
app.put('/prodotti/:id', (req, res) => {
    //recupero l'id dal url e lo converto in numero
    const idRichiesto = parseInt(req.params.id);

    // cerco il prodotto nell'array
    const prodotto = prodotti.find(p => p.id === idRichiesto);

    // se l'id non esiste restituisce un errore not found
    if (!prodotto) {
        return res.status(404).json({ errore: 'id non trovato' });
    };

    // estrarre i nuovi dati dal body della richiesta
    const { nome, prezzo } = req.body;

    // controllo la validità dei dati inviati
    if (!nome || prezzo === undefined) {
        return res.status(400).json({ errore: 'Nome e prezzo sono dati obbligatori per l\'aggiornamento' })
    };

    // aggiorno i dati del prodotto esistente
    prodotto.nome = nome;
    prodotto.prezzo = Number(prezzo);

    // restituisce il prodotto aggiornato
    res.json(prodotto);


})

app.listen(port);