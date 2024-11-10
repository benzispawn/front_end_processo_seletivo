const express = require('express');
const router = express.Router();
const veiculoController = require('../controllers/veiculoController');

router.post('/', veiculoController.criarVeiculo);

router.get('/', veiculoController.pegarVeiculos);

router.get('/:id', veiculoController.pegarVeiculoPorId);

router.put('/:id', veiculoController.updateVeiculo);

router.delete('/:id', veiculoController.deleteVeiculo);

module.exports = router;