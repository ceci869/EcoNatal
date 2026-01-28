function sistema() {
    return {
        pagina: localStorage.getItem('token') ? 'dashboard' : 'homepage',

        passo: 1,
        formulario: {
            nome: '',
            data_nascimento: '',
            email: '',
            endereco: '',
            senha: '', 
            confirmandoSenha: '',
            telefone: '',
            coletas: []
        },

        navegacao(nomePagina) {
            if (nomePagina !== 'login' && !localStorage.getItem('token')) {
                this.pagina = 'login';
                return;
            }

            this.pagina = nomePagina;
        },

        emailValido() {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.formulario.email);
        },

        async enviarCadastro() {
            if (this.formulario.senha !== this.formulario.confirmandoSenha) {
                return alert('Senhas diferentes! Digite novamente.');
            }

            console.log('Enviando dados:', this.formulario);

            try {
                const resposta = await fetch('https://apieconatal.onrender.com/api/cadastro_usuarios', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.formulario)
                });

                const dados = await resposta.json();

                if (resposta.ok) {
                    // alert('Seu cadastro foi realizado com sucesso!');
                    setTimeout(() => {
                        this.pagina = 'cadastroSucesso';
                    }, 5000)
                } else {
                    alert('Erro: ' + (dados.erro || dados.mensagem));
                }
            } catch (error) {
                console.error(error);
                // alert('Não foi possível realizar o cadastro.')
                setTimeout(() => {
                    this.pagina = 'erroCadastro';
                })
            }
        },

        podeConcluir() {
            return this.formulario.endereco && this.formulario.coletas.length > 0;
        },

        async enviarCadastroDeCatador() {
            try {
                const resposta = await fetch('https://apieconatal.onrender.com/api/cadastro_catadores', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.formulario)
                });
                const data = await resposta.json();
                if (resposta.ok) {
                    this.pagina = 'registroSucesso';
                } else {
                    alert(data.erro);
                }
            } catch (error) {
                // alert('Erro ao enviar cadastro');
                this.pagina = 'erroRegistro';
            }
        },

        async fazerLogin() {
            try {
                const resposta = await fetch('https://apieconatal.onrender.com/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(this.formulario)
                });
                const dados = await resposta.json();

                if (resposta.ok) {
                    localStorage.setItem('token', dados.token);
                    this.navegacao('dashboard');
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
        },

        podeEntrar() {
            return this.emailValido() && this.formulario.senha;
        },

        podeAvancar() {
            const validacoesBasicas = this.formulario.nome && this.emailValido();

            if (this.pagina === 'registro'){
                return validacoesBasicas && this.formulario.telefone;        
            }

            return validacoesBasicas && this.formulario.data_nascimento;
        }
    }
}

window.sistema = sistema; 