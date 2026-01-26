function sistema() {
    return {
        pagina: localStorage.getItem('token') ? 'login' : 'homepage',

        passo: 1,
        formulario: {
            nome: '',
            data_nascimento: '',
            email: '',
            rua: '',
            senha: '', 
            confirmandoSenha: '',
        },

        navegacao(nomePagina) {
            if (nomePagina !== 'login' && !localStorage.getItem('token')) {
                this.pagina = 'login';
                return;
            }

            this.pagina = nomePagina;
        },

        proximoPasso() {
            if (!this.formulario.nome || !this.formulario.data_nascimento || !this.formulario.email ) {
                return alert('Por favor, preencha todos os dados.');
            }
            this.passo = 2;
        },

        passoAnterior() {
            this.passo = 1;
        },

        async enviarCadastro() {
            if (this.formulario.senha !== this.formulario.confirmandoSenha) {
                return alert('Senhas diferentes! Digite novamente.');
            }

            console.log('Enviando dados:', this.formulario);

            try {
                const resposta = await fetch('/api/cadastro_usuarios', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.formulario)
                });

                const dados = await resposta.json();

                if (resposta.ok) {
                    alert('Seu cadastro foi realizado com sucesso!');
                    this.navegacao('login');
                } else {
                    alert('Erro: ' + (dados.erro || dados.mensagem));
                }
            } catch (error) {
                console.error(error);
                alert('Não foi possível realizar o cadastro.')
            }
        },

        async fazerLogin() {
            try {
                const resposta = await fetch('/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.formulario)
                });
                const dados = await resposta.json();

                if (resposta.ok) {
                    localStorage.setItem('token', dados.token);
                    this.navegacao('principal');
                } else {
                    alert('Erro:' + dados.mensagem);
                }
            } catch (error) {
                console.error(error);
                alert('Não foi possível conectar com o servidor')
            }
        },

        fazerLogout() {
            localStorage.removeItem('token');
            this.pagina = 'login';
            this.formulario.email = '';
            this.formulario.senha = '';
        }
    }
}

window.sistema = sistema;