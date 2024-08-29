function gibi(id){
    let gibis = {
        '1':{
            nome: 'Gibi 1',
            imagem: 'http://dfasdfasdf/1',
            ano: 1999
        },

        '2':{
            nome: 'Gibi 2',
            imagem: 'http://dfasdfasdf/2',
            ano: 2000
        },
        '3':{
            nome: 'Gibi 3',
            imagem: 'http://dfasdfasdf/3',
            ano: 2001
        }
    }

    return gibis[id];
}

let personagem = {
    nome: 'Home aranha',
    gibis: [
        {
            resourceUrl: 'https://fsadfad/asfdsf/1'
        },
        {
            resourceUrl: 'https://fsadfad/asfdsf/2'
        },
        {
            resourceUrl: 'https://fsadfad/asfdsf/3'
        }                
    ]
};

let gibis = personagem.gibis
        .map(gibi => {
            let resourceURLArray = gibi.resourceUrl.split('/');
            return resourceURLArray[resourceURLArray.length -1];
            })
        .map(id => gibi(id))
        .filter(gibi => gibi.ano < 2000)

console.log(gibis)
