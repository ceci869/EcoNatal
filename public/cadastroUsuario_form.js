import { cadastrandoUsuario } from "./api.js";
const formulario = document.getElementById('Cadastro');

formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    console.log('Formulário submetido! Iniciando fetch...')

    const senha = document.getElementById('senha').value;
    const confirmandoSenha = document.getElementById('confirmandoSenha').value;

    if (senha !== confirmandoSenha) {
        return alert('Senhas diferentes! Por favor, digite novamente.');
    }

    // Coletando dados do formulário
    const dadosFormulario = new FormData(evento.target);
    const dados = Object.fromEntries(dadosFormulario);

    console.log('Dados que serão enviados:', dados);

    // Chamando o outro arquivo
    const resposta = await cadastrandoUsuario(dados);

    if (resposta.sucesso) {
        alert('Seu cadastro foi realizado com sucesso!' + resposta.dados.mensagem);
    } else {
        alert('Erro: ' + resposta.dados.erro);
    }
});

// Elementos
const secao1 = document.getElementById('passo1');
const secao2 = document.getElementById('passo2');
const proximoPasso = document.getElementById('avancar');
const passoAnterior = document.getElementById('voltar');
const tituloCadastro = document.getElementById('titleC');
const textoCadastro = document.getElementById('textC');

// Progrmando cadastro com mais de uma etapa
proximoPasso.addEventListener('click', () => {
    const field = document.querySelector('input[name="nome"]').value;
    if (!field) return alert('Por favor, preencha os seus dados.');

    secao1.classList.add('hidden');
    secao2.className += 'block';
    tituloCadastro.innerHTML = '<h1 class="text-[40px] font-bold text-[#1C2A02] text-center w-100 mx-auto mb-8" id="titleC">Vamos precisar de mais alguns dados...</h1>'
    textoCadastro.className = "hidden"
});

passoAnterior.addEventListener('click', () => {
    secao1.className = 'block';
    secao2.className = 'hidden';
    tituloCadastro.innerHTML = '<h1 class="text-[40px] font-bold text-[#1C2A02] text-center" id="titleC">Primeira vez?</h1>';
    textoCadastro.className = "text-[20px] font-normal text-[#1C2A02] mb-[30px] text-center";
});




