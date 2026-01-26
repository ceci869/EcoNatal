// cadastro
export async function cadastrandoUsuario(dadosUsuario) {
    try {
    const resposta = await fetch('/api/cadastro_usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosUsuario)
    });

    const resultado = await resposta.json();

    return {
        sucesso: resposta.ok,
        dados: resultado
    };
}   catch (erro) {
    console.error('Erro de conexão:', erro);
    return {
        sucesso: false,
        dados: {erro: 'Falha ao conectar com o servidor.'}
    };
}
}