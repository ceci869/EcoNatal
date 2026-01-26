// Imports
require('dotenv').config();
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const Usuario = require('./models/usuario');
const Contato = require('./models/contato');
const Catador = require('./models/catador');


const app = express();

app.use(cors());

app.use((req, res, next) => {
    console.log(`Chegou: ${req.method} em ${req.url}`);
    next();
});

app.use(express.json());

// Rota de cadastro
console.log('Tentando registar a rota aogra.')
app.post('/api/cadastro_usuarios', async (req, res) => {
    console.log('Recebendo pedido de cadastro:', req.body);

    try {
        const {nome, data_nascimento, email, rua, senha } = req.body;

        if (!nome || !data_nascimento || !email || !rua || !senha ) {
            return res.status(400).json({ erro: 'Preencha todos os seus dados!' })
        }

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
            rua,
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

// Rota de login
app.post('/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        console.log("--- TENTATIVA DE LOGIN ---");
        console.log("Body recebido:", req.body);
        console.log("Email buscando:", email);

        const usuario = await Usuario.findOne({ email: email });

        if (!usuario) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        } 

        const checarSenha = await bcrypt.compare(senha, usuario.senha);

        if (!checarSenha) {
            return res.status(422).json({ mensagem: 'Senha incorreta' });
        }

        const secreto = process.env.JWT_SECRET;
        const token = jsonwebtoken.sign({ id: usuario._id }, secreto);
        res.status(200).json({ mensagem: 'Autenticação realizada com sucesso!', token: token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
});


// Caminhos estáticos
app.post('/api/contato', async (req, res) => {
    console.log('Recebendo mensagem de contato:', req.body);

    try {
        const { nome, email, assunto, mensagem } = req.body;

        if (!nome || !email || !assunto || !mensagem) {
            return res.status(400).json({ erro: 'Preencha todos os campos!' });
        }

        const novoContato = new Contato({
            nome,
            email,
            assunto,
            mensagem
        });

        await novoContato.save();
        console.log('Mensagem de contato salva com sucesso!');

        res.status(201).json({ mensagem: 'Mensagem enviada com sucesso!' });
    } catch (error) {
        console.error('Erro no servidor:', error);
        res.status(500).json({ erro: 'Erro interno', detalhe: error.message });
    }
});

app.post('/api/cadastro_catadores', async (req, res) => {
    console.log('Recebendo pedido de cadastro de catador:', req.body);

    try {
        const { nome, telefone, email, endereco, coletas } = req.body;

        if (!nome || !telefone || !email || !endereco || !coletas || coletas.length === 0) {
            return res.status(400).json({ erro: 'Preencha todos os campos!' });
        }

        const catadorExiste = await Catador.findOne({ email: email });
        if (catadorExiste) {
            return res.status(400).json({ erro: 'Este email já está cadastrado.' });
        }

        const novoCatador = new Catador({
            nome,
            telefone,
            email,
            endereco,
            coletas
        });

        await novoCatador.save();
        console.log('Catador cadastrado com sucesso!');

        res.status(201).json({ mensagem: 'Catador cadastrado com sucesso!' });
    } catch (error) {
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