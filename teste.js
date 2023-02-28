const characterId = document.getElementById('characterId');// pega o id
const btnOk = document.getElementById('btn-go');// start a função
const content = document.getElementById('content');// para aparece o objeto
const imagem = document.getElementById('img');
const resetar = document.getElementById('btn-reset');
const stylizacao = document.getElementById('styled')


const fetchApi = (id) => { // o fetch pega os daddos da api e da a rsposta then
    const result = fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then((resp) => resp.json())// pegoa todos os dados
        .then((data) => {

            return data;
        });// entrega o object


    return result;
}

const array = [ 'name', 'status', 'species', 'gender', 'origin', 'episode' ];

const resultado = (result) => {
    return array.map((key) => document.getElementById(key))// cria novo array 
        .map((elementos) => {
            if (elementos.checked && typeof (result[ elementos.name ]) !== 'object') {
                const newElement = document.createElement('p');
                newElement.innerHTML = ` ${elementos.name}  : ${result[ elementos.name ]}`;
                children.appendChild(newElement);
            }
        })

}

/*
 if(elementos.checked && typeof(result[elementos.name]) !== 'object' );// faz um map nos que foi selecionado e cria um novo objeto so com os que foram checados
*/
btnOk.addEventListener('click', async (event) => {
    event.preventDefault();// pega o id digitado  e faz o evento
    if (characterId.value === '') {
        return content.innerHTML = "Digite algun numero"
    }
    const resultadoApi = await fetchApi(characterId.value) // pega o personagem pelo id
    // content.textContent = `${JSON.stringify(resultadoApi, undefined, 2)}`;// traz um objeto
    // content.textContent = `${JSON.stringify(resultado(resultadoApi), undefined, 2)}`;// traz um objeto
    if (content.firstChild === null) {// primeiro filho para que não repita
        //stylizacao.className= 'styled'
        imagem.src = `${resultadoApi.image}`// se tiver filho
        resultado(resultadoApi);
    } else {
        content.innerHTML = '';// se ja tiver personagem selecionado não cira novamente
        //   stylizacao.className = 'styled'
        imagem.src = `${resultadoApi.image}`
        resultado(resultadoApi);
    }
})
