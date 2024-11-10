const Veiculo = require('../models/veiculo');

exports.criarVeiculo = async (req, res) => {
    try {
        console.log(req.body);
        delete req.body.id;
        const { placa, chassi, renavam, modelo, marca, ano } = req.body;
        const veiculo = await Veiculo.create({ placa, chassi, renavam, modelo, marca, ano });
        res.status(201).json(veiculo);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

exports.pegarVeiculos = async (req, res) => {
    try {
        const veiculos = await Veiculo.findAll();
        res.status(200).json(veiculos);
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

exports.pegarVeiculoPorId = async (req, res) => {
    try {
        const veiculo = await Veiculo.findByPk(req.params.id);
        if (veiculo) {
            res.status(200).json(veiculo);
        } else {
            res.status(404).json({
                error: 'Veiculo não encontrado',
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

exports.updateVeiculo = async (req, res) => {
    try {
        const [update] = await Veiculo.update(req.body, {
            where: { id: req.params.id },
        });
        if (update) {
            const updatedVeiculo = await Veiculo.findByPk(req.params.id);
            res.status(200).json(updatedVeiculo);
        } else {
            res.status(404).json({
                error: 'Veiculo não encontrado',
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}

exports.deleteVeiculo = async (req, res) => {
    try {
        const deleted = await Veiculo.destroy({
            where: { id: req.params.id },
        });
        if (deleted) {
            res.status(204).json({
                message: 'Veiculo removido com sucesso!',
            });
        } else {
            res.status(404).json({
                error: 'Veiculo não encontrado',
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error.message,
        })
    }
}