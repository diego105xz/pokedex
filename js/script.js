//Variaveis com classes HTML
const numeroPokemon = document.querySelector('.pokemon_numero');
const nomePokemon = document.querySelector('.pokemon_nome');
const animacaoPokemon = document.querySelector('.pokemon_img');

const form = document.querySelector('.formulario');
const input = document.querySelector('.input_pesquisa');

const btnVoltar = document.querySelector('.btn_voltar');
const btnProximo = document.querySelector('.btn_proximo');

let pesquisaPokemon = 1;

const buscaPokemon = async (pokemon) =>{
    
    //Manda requisição para API
    const API = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    

    //verificar se a busca é um dado existente na api
    if(API.status == 200){
        //Retorna a repsota da API em Json
        const dados = API.json();

        return dados;
    }
    
}

//função responsavel por renderizar os resultados
const exibePokemon = async (pokemon) =>{
    //Caso Api demore a busca vai exibir carregando...
    numeroPokemon.innerHTML = '';
    nomePokemon.innerHTML = 'Carregando...';

    //Guarda dados da api
    const dados = await buscaPokemon(pokemon);

    //verificar se a busca é um dado existente na api
    if(dados){

        //Aponta aquis dados da requisição desejamos extrair da API
        numeroPokemon.innerHTML = dados.id
        nomePokemon.innerHTML = dados.name;
        animacaoPokemon.src = dados['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        //reseta campo pesquisa
        input.value = '';
        //Caso utilize a funcao pesquisa a varivel dos botões recebe o valor do id
        pesquisaPokemon = dados.id;
    }else{
        //Não encotrou resultado na api
        numeroPokemon.innerHTML = '';
        nomePokemon.innerHTML = 'Não encontrado';
        animacaoPokemon.style.display = 'none';
    }

}

//Pega dado do formulari
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    //Pega o dado do input e faz solicitação para API
    exibePokemon(input.value.toLowerCase());

});

//Botão descremento
btnVoltar.addEventListener('click', () =>{

    //Regra para não descrementar valor negativo
    if(pesquisaPokemon > 1){
        //descrementa
        pesquisaPokemon--;
        //chama a funcão
        exibePokemon(pesquisaPokemon);
    }

});

//Botão incremento
btnProximo.addEventListener('click', () =>{
    //incrementa
    pesquisaPokemon++;
    //chama a funcão
    exibePokemon(pesquisaPokemon);
  });

exibePokemon(pesquisaPokemon);