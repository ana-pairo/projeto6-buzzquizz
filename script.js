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
