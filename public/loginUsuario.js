function sistema() {
    return {
        pagina: localStorage.getItem('token') ? 'login' : 'homepage',

        formulario: {
            email: '',
            senha: '',
        },

        navegacao(nomePagina) {
            if (nomePagina !== 'login' && !localStorage.getItem('token')) {
                this.pagina = 'login';
                return;
            }

            this.pagina = nomePagina;
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