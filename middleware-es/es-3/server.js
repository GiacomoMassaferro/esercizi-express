import express from "express";

const app = express();
const port = 3000;

// middleware per interpretare il body JSON delle richieste
app.use(express.json());

// middleware di logging custom
app.use((req, res, next) => {
    const orario = new Date().toLocaleTimeString();
    console.log(`[${orario}] ${req.method} ${req.originalUrl}`);
    next();
});

// middleware per l'header personalizzato
app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'MioServer');
    next()
});

// middleware di autenticazione
app.use((req, res, next) => {
    // express converte tutti i nomi degli header in maiuscolo automaticamente
    const authHeader = req.headers['authorization']; // oppure req.get('authorizzation)

    if (!authHeader) {
        return res.status(401).json({
            errore: "accesso negato: token di autorizzazione mancante."
        });
    }

    // se non manca va alla prossima
    next()
})

// rotta base http://localhost:3000/
app.get('/', (req, res) => {
    res.send('Server attivo e logger operativo');
});

// avvio del server
app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});