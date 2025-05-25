const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.post('/consumo', (req, res) => {
    const { usuario_id, mes, ano, energia_kwh, agua_litros, plastico_kg } = req.body;
    const sql = 'INSERT INTO consumo (usuario_id, mes, ano, energia_kwh, agua_litros, plastico_kg) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(sql, [usuario_id, mes, ano, energia_kwh, agua_litros, plastico_kg], (err) => {
        if (err) return res.status(400).json({ error: err });
        res.json({ message: 'Consumo registrado!' });
    });
});

router.get('/consumo/:id_usuario', (req, res) => {
    const sql = 'SELECT * FROM consumo WHERE usuario_id = ?';
    db.query(sql, [req.params.id_usuario], (err, results) => {
        if (err) return res.status(400).json({ error: err });
        res.json(results);
    });
});

router.get('/consumo/comparar/:id_usuario', (req, res) => {
    const { mes1, ano1, mes2, ano2 } = req.query;
    const { id_usuario } = req.params;

    const sql = 'SELECT * FROM consumo WHERE usuario_id = ? AND ((mes = ? AND ano = ?) OR (mes = ? AND ano = ?))';
    db.query(sql, [id_usuario, mes1, ano1, mes2, ano2], (err, results) => {
        if (err) return res.status(400).json({ error: err });

        const dadosAntes = results.find(r => r.mes == mes1 && r.ano == ano1);
        const dadosDepois = results.find(r => r.mes == mes2 && r.ano == ano2);

        res.json({ antes: dadosAntes, depois: dadosDepois });
    });
});

module.exports = router;