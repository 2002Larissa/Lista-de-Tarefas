const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-task')

let minhaListaDeItens = []

function adicionarNovaTarefa(){

    if (input.value.trim() === '') {
        alert('Você não pode inserir uma tarefa vazia. Por favor, insira uma tarefa válida.');
        return; // Encerra a função se o campo estiver vazio
    }
    minhaListaDeItens.push({
        tarefa: input.value,
        concluida: false
    })

    input.value = ''

    mostrarTarefas()
}

function mostrarTarefas(){

    let novaLi = ''

    //['almoçar', 'estudar', 'terminar a todo list']
    minhaListaDeItens.forEach((item, posicao) => {

        novaLi = novaLi + `
        <li class="task ${item.concluida && "done"}">
            <img src="CSS/Imagens/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <P>${item.tarefa}</P>
            <img src="CSS/Imagens/trash.png" alt="delete-tarefa" onclick="deletarItem(${posicao})">
        </li>
                `
    })

    listaCompleta.innerHTML = novaLi

    localStorage.setItem('Lista', JSON.stringify(minhaListaDeItens))

}

function concluirTarefa(posicao){
    minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida

    mostrarTarefas()
}

function deletarItem(posicao){
    minhaListaDeItens.splice(posicao, 1)

    mostrarTarefas()
}


function recarregarItens(){
    const tarefasDoLocalStorage = localStorage.getItem('Lista')

    if(tarefasDoLocalStorage){
    minhaListaDeItens = JSON.parse(tarefasDoLocalStorage)
    }
    mostrarTarefas()
}

recarregarItens()
button.addEventListener('click', adicionarNovaTarefa)