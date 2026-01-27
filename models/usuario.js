const mongoose = require('mongoose');

// Definindo Schema
const Schema = mongoose.Schema;

const Usuario = new Schema({
    nome: {
        type: String,
        required: true
    },
    data_nascimento: {
        type: Date,
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
    senha: {
        type: String,
        required: true
    },
    criacao: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('usuarios', Usuario);