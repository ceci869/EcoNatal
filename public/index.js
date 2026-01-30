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

        usuarioLogado: {
            nome: '',
            data_nascimento: '',
            email: '',
            endereco: '',
            senha: ''
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
                    setTimeout(() => {
                        this.pagina = 'cadastroSucesso';
                    }, 5000)
                } else {
                    alert('Erro: ' + (dados.erro || dados.mensagem));
                }
            } catch (error) {
                console.error(error);
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
                this.pagina = 'erroRegistro';
            }
        },
        
        async carregarUsuario() {
            const token = localStorage.getItem('token');
            if (!token) return;

            try {
                const resposta = await fetch('https://apieconatal.onrender.com/api/usuario_logado', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (resposta.ok) {
                    const dados = await resposta.json();
                    this.usuarioLogado = dados;
                } else {
                    if (resposta.status === 401 || resposta.status === 403) {
                        console.log('Token é inválido ou expirou');
                        this.fazerLogout();
                    } else {
                        console.error(`Erro na requisição: ${resposta.status}`)
                    }                   
                }
            } catch (error) {
                console.error('Usuário não encontrado', error);
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

                    this.formulario.nome = dados.nome || (dados.user && dados.user.nome) || (dados.usuario && dados.usuario.nome) || this.formulario.nome;

                    this.navegacao('dashboard');
                    this.carregarUsuario();
                } else {
                    alert('Erro:' + dados.mensagem);
                }
            } catch (error) {
                console.error(error);
                alert('Não foi possível conectar com o servidor')
            }
        },

        init() {
            if (localStorage.getItem('token')) {
                this.carregarUsuario();
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