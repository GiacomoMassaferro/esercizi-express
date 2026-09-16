import express from "express";

import prodottiRouter from "./routes/prodotti.js";

const app = express();

const port = 3000;

// middleware per il parsing del JSON
app.use(express.json());

// montaggio router
app.use("/prodotti", prodottiRouter);

app.get("/", (req, res) => {
    res.send("API prodotti attiva. Vai su /prodotti");
});


app.listen(port);