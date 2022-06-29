function pegarQuizz () {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(exibirQuizz);
}


function exibirQuizz (object) {
    quizzServer = object.data;
    let quizzes = document.querySelector(".quadroQuizzes");
    quizzes.innerHTML = "";
    for(let i = 0; i < quizzServer.length; i++) {
        quizzes.innerHTML += `<div class="quizz" style="background-image: linear-gradient( to bottom, rgba(255,0,0,0), rgba(0,0,0,1)), url(${quizzServer[i].image});">
        <div class="tituloQuizz">${quizzServer[i].title}</div>
    </div>`;
    }
    
}

pegarQuizz();



function msgErro () {
    alert("Preencha os dados corretamente!");
}

function erroNiveis () {
    let tituloNivel = document.querySelector(".tituloNivel").value;
    let acertos = document.querySelector(".acertos").value;
    let url = document.querySelector(".url").value;
    let descricao = document.querySelector(".descricao").value;
    
    if(tituloNivel.length < 10) {
        msgErro();
    }
    if(isNaN(acertos) || acertos < 0 || acertos > 100) {
        msgErro();
    }
    if(descricao.length < 30) {
        msgErro();
    }
    let cont=0;
    for (let i = 0; i < levels.lenght; i++) {
        if(levels.minValue === 0) {
            cont++;
        }
    }
    if (cont === 0) {
        msgErro();
    }
}