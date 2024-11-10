const express = require("express");
const sequelize = require('./config/database');
const veiculoRotas = require("./routes/veiculoRoutes");
const cors = require('cors');

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/veiculos', veiculoRotas);

sequelize.sync({force: true}).then(() => {
    console.log('Database e tabelas criadas.');
    app.listen(3000, () => console.log('Server funcionando na porta 3000'));
})

module.exports = app;
