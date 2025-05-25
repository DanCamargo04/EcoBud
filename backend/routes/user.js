const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();

const SECRET = process.env.JWT_SECRET;

router.post('/register', (req, res) => {
    const { email, senha } = req.body;
    const hashedPassword = bcrypt.hashSync(senha, 8);
    const sql = 'INSERT INTO usuario (email, senha) VALUES (?, ?)';

    db.query(sql, [email, hashedPassword], (err) => {
        if (err) return res.status(400).json({ error: err });
        res.json({ message: 'Usuário cadastrado!' });
    });
});

router.post('/login', (req, res) => {
    const { email, senha } = req.body;
    const sql = 'SELECT * FROM usuario WHERE email = ?';

    db.query(sql, [email], (err, results) => {
        if (err) return res.status(400).json({ error: err });
        if (results.length === 0) return res.status(404).json({ error: 'Usuário não encontrado' });

        const usuario = results[0];
        const senhaValida = bcrypt.compareSync(senha, usuario.senha);
        if (!senhaValida) return res.status(401).json({ error: 'Senha inválida' });

        const token = jwt.sign({ id: usuario.id }, SECRET, { expiresIn: '1d' });
        res.json({ auth: true, token });
    });
});

module.exports = router;