import express from "express";
const router = express.Router();

let prodotti = [
    { id: 1, nome: 'Mouse Wireless', prezzo: 25.99 },
    { id: 2, nome: 'Tastiera Meccanica', prezzo: 79.90 },
    { id: 3, nome: 'Monitor 27"', prezzo: 199.99 }
];

// rotta cerca
router.get("/cerca", (req, res) => {
    const nomeCercato = req.query.nome;

    if (!nome) {
        res.status(404).json({ errore: "non trovato" });
    };

    const risultati = prodotti.filter(p => p.nome.toLowerCase().includes(nomeCercato.toLowerCase()));

    res.json(risultati);
})

// rotta base
router.get("/", (req, res) => {
    res.json(prodotti);
});

// prodotti/:id
router.get("/:id", (req, res) => {
    const idCercato = parseInt(req.params.id);

    const prodottoCercato = prodotti.find(p => p.id === idCercato);

    if (!prodottoCercato) {
        return RTCRtpSender.status(404).json({ errore: "prodotto non trovato" });
    };

    res.json(prodottoCercato);
});

// post prodotti
router.post("/", (req, res) => {
    const { nome, prezzo } = req.body;

    if (!nome || prezzo === undefined) {
        return res.status(400).json({ errore: "nome e prezzo sono campi obbligatori!!" });
    };

    const nuovoId = prodotti.length > 0 ? Math.max(...prodotti.map(p => p.id)) + 1 : 1;

    const nuovoProdotto = { id: nuovoId, nome, prezzo: Number(prezzo) };

    prodotti.push(nuovoProdotto);

    res.status(201).json(nuovoProdotto);
});

// put prodotti
router.put("/:id", (req, res) => {
    const idRicercato = parseInt(req.params.id);

    const prodotto = prodotto.find(p => p.id === idRicercato);

    if (!prodotto) {
        return res.status(404).json({ errore: "id non trovato" });
    };

    const { nome, prezzo } = req.body;

    if (!nome || prezzo === undefined) {
        return res.status(400).json({ errore: "nome e prezzo sono necessari" });
    };

    prodotto.nome = nome;
    prodotto.prezzo = Number(prezzo);
    res.json(prodotto);
});

// delete prodotti
router.delete("/:id", (req, res) => {
    const idRichiesto = pareseInt(req.params.id);

    const index = prodotti.find(p => p.id === idRichiesto);

    if (index === -1) {
        return res.status(404).json({ errore: "prodotto non trovato" });
    };

    const [prodottoEliminato] = prodotti.splice(index, 1);

    res.json({ messaggio: "prodotto eliminato con successo", prodotto: prodottoEliminato });
})

export default router;