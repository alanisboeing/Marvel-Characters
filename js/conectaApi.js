const auth = 'apikey=f0ec93b717b069951af497dfe5e2fa91&ts=1684245290667&hash=abb786b6486f85ca104252ac1a8b1d3c';

async function listaPersonagens(parametros){
    let path = new URL('https://gateway.marvel.com:443/v1/public/characters?limit=18&offset=' + parametros.offset + '&' + auth);
    if(parametros.nome){
        path.searchParams.append('nameStartsWith', parametros.nome);
        //path += `&nameStartsWith=${parametros.nome}`;
    }

    if(parametros.comic){
        path.searchParams.append('comics', parametros.comic);
        //path += `&comics=${parametros.comic}`;
    }

    const conexao = await fetch(path);
    const conexaoConvertida = await conexao.json();
    const listaPersonagens = conexaoConvertida.data.results;
    return listaPersonagens;
}

async function listaDePersonagens(offset){
    const conexao = await fetch('https://gateway.marvel.com:443/v1/public/characters?limit=18&offset=' + offset + '&' + auth);
    const conexaoConvertida = await conexao.json();
    const listaPersonagens = conexaoConvertida.data.results;
    return listaPersonagens;
}
async function listaDePersonagensFiltrados(filtroNome){
    const conexao = await fetch('https://gateway.marvel.com:443/v1/public/characters?limit=18&nameStartsWith=' + filtroNome  + '&' + auth);
    const conexaoConvertida = await conexao.json();
    const listaPersonagens = conexaoConvertida.data.results;
    return listaPersonagens;
}

async function personagem(idPersonagem){
    const conexao = await fetch('https://gateway.marvel.com:443/v1/public/characters/' + idPersonagem + '?apikey=f0ec93b717b069951af497dfe5e2fa91&ts=1684245290667&hash=abb786b6486f85ca104252ac1a8b1d3c');
    const conexaoConvertida = await conexao.json();
    const dadosPersonagem = conexaoConvertida.data.results;
    return dadosPersonagem;
}
async function comic(idGibi){
    const conexao = await fetch('https://gateway.marvel.com/v1/public/comics/' + idGibi + '?apikey=f0ec93b717b069951af497dfe5e2fa91&ts=1684245290667&hash=abb786b6486f85ca104252ac1a8b1d3c');
    const conexaoConvertida = await conexao.json();

    const dadosGibi = conexaoConvertida.data.results[0];

   return dadosGibi;
}


export const conectaApi = {
    listaPersonagens,
    listaDePersonagens,
    listaDePersonagensFiltrados,
    personagem,
    comic
}