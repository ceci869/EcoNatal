const mongoose = require('mongoose');

// Definindo Schema
const Schema = mongoose.Schema;

const Catador = new Schema({
    nome: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    coletas: {
        type: [String],
        required: true
    },
    criacao: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('catador', Catador);