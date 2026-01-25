const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');


const Usuario = require('./models/usuario');

const app = express();

app.use(cors());

app.use((req, res, next) => {
    console.log(`Chegou: ${req.method} em ${req.url}`);
    next();
});

app.use(express.json());

console.log('Tentando registar a rota aogra.')
app.post('/api/cadastro_usuarios', async (req, res) => {
    console.log('Recebendo pedido de cadastro:', req.body);

    try {
        const {nome, data_nascimento, email, cep, senha } = req.body;

        const usuarioExiste = await Usuario.findOne({ email: email });
        if (usuarioExiste) {
            return res.status(400).json({ erro: 'Este email já está cadastrado.' });
        }

        const salt = await bcrypt.genSalt(10);
        const senhaHash = await bcrypt.hash(senha, salt);

        const novoUsuario = new Usuario({
            nome,
            data_nascimento,
            email,
            cep,
            senha: senhaHash
        });

        await novoUsuario.save();
        console.log('O usuário foi salvo com sucesso!')

        res.status(201).json({ mensagem: 'Usuário criado com sucesso!' });
    }   catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).json({ erro: 'Erro interno', detalhe: error.message });
    }
});

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://127.0.0.1:27017/econatal')
    .then(() => console.log('MongoDB conectado com sucesso!'))
    .catch((erro) => console.log('Erro no MongoDB', erro));

app.listen(5000, '0.0.0.0', () => {
    console.log('Servidor rodando na porta 5000')
});