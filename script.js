const characterId = document.getElementById('characterId');// pega o id
const btnOk = document.getElementById('btn-go');// start a função
const content = document.getElementById('content');// para aparece o objeto
const imagem = document.getElementById('img');
const resetar = document.getElementById('btn-reset');
const children = document.getElementById('styled')


const fetchApi = (id) => { // o fetch pega os daddos da api e da a rsposta then
    const result = fetch(`https://rickandmortyapi.com/api/character/${id}`)
        .then((resp) => resp.json())// pegoa todos os dados
        .then((data) => {

            return data;
        });// entrega o object


    return result;
}

const array = [ 'name', 'status', 'species', 'gender', 'origin', 'episode' ];
const nomes = {
    name: 'Nome',
    status: 'Status',
    species: 'Especies',
    gender: 'Genero',
    origin: 'Planeta de origin',
    episode: 'Episodios',
}
const resultado = (result) => {
    // Cria um novo array mapeando cada elemento do array original
    return array.map((key) => document.getElementById(key))
        .map((elementos) => {
            // Verifica se o elemento está marcado e se o valor correspondente no objeto 'result' é um array
            if (elementos.checked === true && (Array.isArray(result[ elementos.name ])) === true) {
                // Converte os valores do array em uma string com quebras de linha após cada valor separado por vírgula
                const arrayResult = result[ elementos.name ].join('\r\n');
                // Cria um novo elemento <p>
                const newElement = document.createElement('p');
                // Define o HTML interno do elemento <p> com o nome e os valores do array
                newElement.innerHTML = ` ${nomes[ elementos.name ]}  : ${arrayResult}`;
                // Anexa o novo elemento <p> ao elemento 'content'
                content.appendChild(newElement);
            }
            // Verifica se o elemento está marcado e se o valor correspondente no objeto 'result' é um objeto
            else if (elementos.checked === true && (elementos.name === 'origin')) {
                // Cria um novo elemento <p>
                const newElement = document.createElement('p');
                // Define o HTML interno do elemento <p> com o nome e a propriedade 'name' do objeto aninhado
                newElement.innerHTML = ` ${nomes[ elementos.name ]}  : ${result[ elementos.name ].name}`;
                // Anexa o novo elemento <p> ao elemento 'content'
                content.appendChild(newElement);
            }
            // Verifica se o elemento está marcado e se o valor correspondente no objeto 'result' não é um objeto
            else if (elementos.checked && typeof (result[ elementos.name ]) !== 'object') {
                // Cria um novo elemento <p>
                const newElement = document.createElement('p');
                // Define o HTML interno do elemento <p> com o nome e o valor
                newElement.innerHTML = ` ${nomes[ elementos.name ]}   : ${result[ elementos.name ]}`;
                // Anexa o novo elemento <p> ao elemento 'content'
                content.appendChild(newElement);
            }
        })
}


/*
 if(elementos.checked && typeof(result[elementos.name]) !== 'object' );// faz um map nos que foi selecionado e cria um novo objeto so com os que foram checados
*/
btnOk.addEventListener('click', async (event) => {
    event.preventDefault();// pega o id digitado  e faz o evento
    if (characterId.value === '') {
        return content.innerHTML = "Digite algum numero"
    }
    const resultadoApi = await fetchApi(characterId.value) // pega o personagem pelo id

    if (content.firstChild === null) {// primeiro filho para que não repita
        children.className = 'styled'
        imagem.src = `${resultadoApi.image}`// se tiver filho
        resultado(resultadoApi);
    } else {
        content.innerHTML = '';// se ja tiver personagem selecionado não cira novamente
        children.className = 'styled'
        imagem.src = `${resultadoApi.image}`
        resultado(resultadoApi);
    }

})

resetar.addEventListener('click', () => location.reload())
