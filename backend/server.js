const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/user');
const consumoRoutes = require('./routes/consumo');

app.use('/api', userRoutes);
app.use('/api', consumoRoutes);

app.listen(process.env.PORT || 3000, () => {
    console.log('Servidor rodando na porta', process.env.PORT || 3000);
});