var passoAtual = 1;
var passosTotais = 2;
const tituloCadastro = document.getElementById('titleC');
const textoCadastro = document.getElementById('textC')

    function proximoPasso() {
        if (passoAtual < passosTotais) {
            var secaoAtual = document.getElementById('passo' + passoAtual);
            secaoAtual.classList.add("hidden");

            passoAtual++;

            var proximaSecao = document.getElementById('passo' + passoAtual);

            proximaSecao.className += "block";
            tituloCadastro.innerHTML = '<h1 class="text-[40px] font-bold text-[#1C2A02] text-center w-100 mx-auto mb-8" id="titleC">Vamos precisar de mais alguns dados...</h1>'
            textoCadastro.className = "hidden"

        }
    };

    function passoAnterior() {
        if (passoAtual > 1) {
            var secaoAtual = document.getElementById('passo' + passoAtual);
            secaoAtual.classList.toggle("hidden");

            passoAtual--;

            var secaoAnterior = document.getElementById('passo' + passoAtual);

            secaoAnterior.className += "block";
            tituloCadastro.innerHTML = '<h1 class="text-[40px] font-bold text-[#1C2A02] text-center" id="titleC">Primeira vez?</h1>'
            textoCadastro.className = "text-[20px] font-normal text-[#1C2A02] mb-[30px] text-center"
        }
    };