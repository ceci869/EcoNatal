var ativo = document.querySelector('.ativo'),
    meusbotoes = ativo.querySelectorAll('button');
    home = document.getElementById('home');

meusbotoes.forEach(function(a){
    a.addEventListener('click', botaoAtivado);
});

function botaoAtivado() {
    console.log(this, this.parentNode);

    this.parentNode
        .querySelectorAll('button')
        .forEach(function(a) {
            a.style.borderBottom = '0';
        });
    
    this.style.borderBottom = 'solid 1px';
}