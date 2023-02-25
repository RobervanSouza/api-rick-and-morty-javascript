const characterId = document.getElementById('characterId');// pega o id
const btnOk = document.getElementById('btn-go');// start a função
const content = document.getElementById('content');// para aparece o objeto
const imagem = document.getElementById('img');


const fetchApi = (id) => { // o fetch pega os daddos da api e da a rsposta then
    const result = fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then((resp) => resp.json())// pegoa todos os dados
    .then((data) =>{
        
        return data;
       });// entrega o object
       
    
    return result;
}

btnOk.addEventListener('click', async  (event) =>{
    event.preventDefault();// pega o id digitado  e faz o evento
    const resultadoApi = await fetchApi(characterId.value) // pega o personagem pelo id
    content.textContent = `${JSON.stringify(resultadoApi, undefined, 2)}`;// traz um objeto
    imagem.src = `${resultadoApi.image}`
})