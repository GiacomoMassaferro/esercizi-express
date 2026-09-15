import express from 'express';

const app = express();
const port = 3003;
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

// http://localhost:3003/
app.get('/', (req, res) => {
    res.send('scrivi /prodotti sulla barra di ricerca dopo alla fine del url per vedere i prodotti');
})

// http://localhost:3003/prodotti
app.get('/prodotti', (req, res) => {
    res.json(prodotti);
}),

    // http://localhost:3003/prodotti/:id
    app.get('/prodotti/:id', (req, res) => {

        //recupero il valore di id dalla query e lo converto in numero
        const findId = parseInt(req.params.id);

        //trovo il prodotto nell'array
        const prodotto = prodotti.find(p => p.id === findId);

        //controllo che ci sia un risultato valido
        if (!prodotto) {
            return res.status(404).json({ errore: "prodotto non trovato" });
        };

        //restituisco il json del prodotto
        res.json(prodotto);
    })

app.post('/prodotti', (req, res) => {
    const { nome, prezzo } = req.body;

    //validazione di base dei dati inseriti
    if (!nome || !prezzo) {
        return res.status(400).json({ errore: 'Nome e prezzo sono campi obbligatori' });
    };

    //generazione dinamida el nuovo id (id massimo+1)
    const nuovoId = prodotti.length > 0 ? Math.max(...prodotti.map(p => p.id)) + 1 : 1;

    //creazione del nuovo oggetto prodotto
    const nuovoProdotto = {
        id: nuovoId,
        nome: nome,
        prezzo: Number(prezzo)
    };

    //inserimento nell'array
    prodotti.push(nuovoProdotto);

    //risposta status 201 (created) ed il prodotto generato
    res.status(201).json(nuovoProdotto);
});

app.listen(port);