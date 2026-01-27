const mongoose = require('mongoose');

// Definindo Schema
const Schema = mongoose.Schema;

const Contato = new Schema({
    nome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    assunto: {
        type: String,
        required: true
    },
    mensagem: {
        type: String,
        required: true
    },
    criacao: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('contato', Contato);