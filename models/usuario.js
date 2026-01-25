const mongoose = require('mongoose');

// Conecetando com o MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/econatal')
//     .then(() => console.log('MongoDB local foi conectado com sucesso.'))
//     .catch((erro) => console.log('Erro ao conectar:', erro));

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
    rua: {
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

module.exports = mongoose.model('usuario', Usuario)