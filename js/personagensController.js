import { conectaApi } from "./conectaApi.js";

const sectionPersonagens = document.getElementById('todos-os-personagens');

function insereConteudoCard(personagem) {
    sectionPersonagens.innerHTML += `
    <div class="personagem">
        <button class="botao-personagem" name="botao-personagem" data-personagem="${personagem.id}" value="${personagem.id}">
            <img class="imagem-personagem" src="${personagem.thumbnail.path}.${personagem.thumbnail.extension}" alt="Imagem do Homem-Aranha">
            <h3 class="nome-heroi">${personagem.name}</h3>
        </button>
    </div>
    `;
}

function configuraModal() {
    const modal = document.querySelector(".modal");
    const botaoPersonagem = document.getElementsByName('botao-personagem');

    botaoPersonagem.forEach(botao => {
        botao.addEventListener("click", async () => {
            const personagem = await conectaApi.personagem(botao.dataset.personagem);

            const comics = await getComics(personagem[0]);

            const conteudo = modal.querySelector('.conteudo-modal');

            conteudo.innerHTML = personagem;

            abreModal(modal);
            insereConteudoPersonagemModal(modal, personagem[0], comics);



            const botaoFechaModal = document.querySelector(".fechar");
            botaoFechaModal.addEventListener("click", () => { modal.style.display = "none"; })

        })
    });

}

function abreModal(modal) {
    modal.style.display = "block";
}

function insereConteudoPersonagemModal(modal, dado, gibis) {
    let conteudoGibi = conteudoGibiModal(gibis);
    modal.innerHTML = `
        <div class="conteudo-modal" id="conteudo-modal">
            <span class="fechar" id="fechar">&times;</span>
            <div class="personagem-modal">
                    <img  class="imagem-personagem-modal" src="${dado.thumbnail.path}.${dado.thumbnail.extension}" alt="">
                <div  class="bio-personagem">
                    <h5 class="nome-heroi-modal">${dado.name}</h5>
                    <p class="descricao-personagem">${dado.description} </p>
                </div>
            </div>
            <div class="gibis-modal">
                <p class="titulo-gibis-modal">Hqs em que aparece:</p>
                <ul class="lista-gibis-modal">
                    ${conteudoGibi}
                </ul>
            </div>
        </div>
        `;

}
async function getComics(dado) {
    const gibis = dado.comics.items;
    let comics = gibis.map(gibi => {
        let resourceURLArray = gibi.resourceURI.split('/');
        return resourceURLArray[resourceURLArray.length - 1];
    })
        .map(async id => {
            return await conectaApi.comic(id);
        })

    return await Promise.all(comics);
}

function limparListagem(){
    const sectionPersonagens = document.getElementById('todos-os-personagens');
    sectionPersonagens
        .querySelectorAll('.personagem')
        .forEach(div => div.remove());
}

function conteudoGibiModal(gibis) {
    let conteudo = '';
    gibis.forEach(dadosGibi => {
        conteudo += `
        <div class="gibi-modal">
            <li > <img class="img-gibi-modal" src="${dadosGibi.thumbnail.path}.${dadosGibi.thumbnail.extension}" alt=""></li>
            <h6>${dadosGibi.title}</h6>
        </div>    
    `;
    })

    return conteudo;
}

function paginacao() {
    const nomeProcurado = document.getElementById('busca-personagem');
    const botaoCarregarMais = document.querySelector('.botao-paginacao');
    let pagina = 0;
    botaoCarregarMais.addEventListener("click", async () => {
        pagina += 1;
        console.log(pagina)
        let offset = parseInt(pagina * 18);
        
        listaPersonagens(offset, nomeProcurado.value);
    })
}

function buscarPersonagens(){
    const nomeProcurado = document.getElementById('busca-personagem');
    nomeProcurado.addEventListener("search", async()=>{        
        limparListagem();

        await listaPersonagens(0, nomeProcurado.value);
    })
}

async function listaPersonagens(offset=0, nome) {
    const parametros = {
        'offset': offset,
        'nome': nome
        //'comic': 12671
    };

    const listaPersonagens = await conectaApi.listaPersonagens(parametros);
    listaPersonagens.forEach(personagem => insereConteudoCard(personagem));

    configuraModal();
}

listaPersonagens();
buscarPersonagens();
paginacao();
