function pegarQuizzes () {
    const promise = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promise.then(exibirQuizzes);
}


function exibirQuizzes (object) {
    quizzServer = object.data;
    let quizzes = document.querySelector(".quadroQuizzes");
    quizzes.innerHTML = "";
    for(let i = 0; i < quizzServer.length; i++) {
        quizzes.innerHTML += `<div class="quizz" style="background-image: linear-gradient( to bottom, rgba(255,0,0,0), rgba(0,0,0,1)), url(${quizzServer[i].image});">
        <div class="tituloQuizz">${quizzServer[i].title}</div>
    </div>`;
    }
    
}

// pegarQuizz();



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


/*TELA 1 CRIAÇÃO DE QUIZZES*/ 

let tituloCriarQuizz, urlCriarQuizz, qtdPerguntasCriarQuizz, qtdNiveisCriarQuizz;

function prosseguirCriarPerguntas(){
    let erro=0;
    tituloCriarQuizz=document.querySelector(".tituloCriarQuizz").value
    urlCriarQuizz=document.querySelector(".urlCriarQuizz").value.toLowerCase()
    qtdPerguntasCriarQuizz=Number(document.querySelector(".qtdPerguntasCriarQuizz").value)
    qtdNiveisCriarQuizz=Number(document.querySelector(".qtdNiveisCriarQuizz").value)

    if (tituloCriarQuizz.length<20){
        alert("Atenção! O título do quizz deve ter no mínimo 20 e no máximo 65 caracteres.")
        erro++
    }
    if (urlCriarQuizz.slice(0,4)!="http"){
        alert("Atenção! Insira uma url de imagem válida.")
        erro++
    }
    if (isNaN(qtdPerguntasCriarQuizz) || qtdPerguntasCriarQuizz<3){
        alert("Atenção! Para a quantidade de perguntas, digite um número maior do que 2.")
        erro++
    }
    if (isNaN(qtdNiveisCriarQuizz) || qtdNiveisCriarQuizz<2){
        alert("Atenção! Para a quantidade de níveis, digite um número maior do que 1.")
        erro++
    }
    if (erro==0){
        abrirCriarPerguntasQuizz();
    }
}

/*TELA 2 CRIAÇÃO DE QUIZZES*/ 

function abrirCriarPerguntasQuizz(){
    
    document.querySelector(".criarQuizz1").classList.add("escondido")
    document.querySelector(".criarQuizz2").classList.remove("escondido")

    for (let i=3; i<qtdPerguntasCriarQuizz;i++){

        document.querySelector(".criarQuizz2").innerHTML+=`<div class="criarPergunta perg${i+1}">
        <div class="criarPerguntaMaximizado escondido">
            <h1>Pergunta ${i+1}</h1>
            <input class="textoPergunta perg${i+1}" type="text" placeholder="Texto da pergunta">
            <input class="urlPergunta perg${i+1}" type="text" placeholder="Cor de fundo da pergunta">
            <h1>Resposta correta</h1>
            <input class="respCorreta perg${i+1}" type="text" placeholder="Resposta correta">
            <input class="urlRespCorreta perg${i+1}" type="text" placeholder="URL da imagem">
            <h1>Respostas incorretas</h1>
            <input class="respIncorreta1 perg${i+1}" type="text" placeholder="Resposta incorreta 1">
            <input class="urlRespIncorreta1 perg${i+1}" type="text" placeholder="URL da imagem 1">
            <input class="respIncorreta2 perg${i+1}" type="text" placeholder="Resposta incorreta 2">
            <input class="urlRespIncorreta2 perg${i+1}" type="text" placeholder="URL da imagem 2">
            <input class="respIncorreta3 perg${i+1}" type="text" placeholder="Resposta incorreta 3">
            <input class="urlRespIncorreta3 perg${i+1}" type="text" placeholder="URL da imagem 3">
        </div>
        <div class="criarPerguntaMinimizado">
            <h1>Pergunta ${i+1}</h1>
            <img src="./imgs/icon-edit.svg" onclick="maximizarPergunta(this)"/>
        </div>
    </div>`

    }

    document.querySelector(".criarQuizz2").innerHTML+=`<div class="botaoCriarQuizz2" onclick="prosseguirCriarNiveis()">
    Prosseguir pra criar níveis
</div>`

}

function maximizarPergunta(elemento){

    document.querySelector(".criarPerguntaMaximizado:not(.escondido)").classList.add("escondido")
    document.querySelector(".criarPerguntaMinimizado.escondido").classList.remove("escondido")
    elemento.parentElement.parentElement.firstElementChild.classList.remove("escondido")
    elemento.parentElement.classList.add("escondido")

}

function prosseguirCriarNiveis(){

    //Apagar essa linha depois
    qtdPerguntasCriarQuizz=3
    let erro=0;
    let a=0;
    let textoPergunta, corPergunta, respCorreta, urlRespCorreta, respIncorreta1, urlRespIncorreta1, respIncorreta2, urlRespIncorreta2, respIncorreta3, urlRespIncorreta3;

    for (let i=0; i<qtdPerguntasCriarQuizz; i++){

        textoPergunta=document.querySelector(`.textoPergunta.perg${i+1}`).value;
        corPergunta=document.querySelector(`.corPergunta.perg${i+1}`).value;
        respCorreta=document.querySelector(`.respCorreta.perg${i+1}`).value;
        urlRespCorreta=document.querySelector(`.urlRespCorreta.perg${i+1}`).value;
        respIncorreta1=document.querySelector(`.respIncorreta1.perg${i+1}`).value;
        urlRespIncorreta1=document.querySelector(`.urlRespIncorreta1.perg${i+1}`).value;
        respIncorreta2=document.querySelector(`.respIncorreta2.perg${i+1}`).value;
        urlRespIncorreta2=document.querySelector(`.urlRespIncorreta2.perg${i+1}`).value;
        respIncorreta3=document.querySelector(`.respIncorreta3.perg${i+1}`).value;
        urlRespIncorreta3=document.querySelector(`.urlRespIncorreta3.perg${i+1}`).value;

        if (textoPergunta.length<20){
            alert(`Atenção! O texto da Pergunta ${i+1} deve ter no mínimo 20 caracteres.`)
            erro++
        }
        else if (corPergunta.slice(0,1)!="#" || corPergunta.length!==7){
            //Faltou fazer a verificação pra cada caracter depois do # se é uma letra de A a F ou 
            //se é um número
            alert(`Atenção! Insira uma cor válida para o fundo da Pergunta ${i+1}. Ex: #FAFAFA.`)
            erro++
        }
        else if (respCorreta===""){
            alert(`Atenção! Insira a resposta correta para a Pergunta ${i+1}.`)
            erro++
        }
        else if (urlRespCorreta.slice(0,4)!="http"){
            alert(`Atenção! Insira uma url de imagem válida para a resposta correta da Pergunta ${i+1}.`)
            erro++
        }
        else if (respIncorreta1===""){
            alert(`Atenção! Digite a resposta incorreta 1 para a Pergunta ${i+1}.`)
            erro++
        }
        else if (urlRespIncorreta1.slice(0,4)!="http"){
            alert(`Atenção! Insira uma url de imagem válida para a resposta incorreta 1 da Pergunta ${i+1}.`)
            erro++
        }
        else if ((respIncorreta2==="" && urlRespIncorreta2!=="")||(respIncorreta2!=="" && urlRespIncorreta2==="")){
            alert(`Atenção! Você só preencheu uma informação da resposta incorreta 2 da Pergunta ${i+1}. Preencha as duas ou deixe ambas vazias para prosseguir.`)
            erro++
        }
        else if ((respIncorreta3!=="" && respIncorreta2==="")||(urlRespIncorreta3!=="" && respIncorreta2==="")){
            alert(`Atenção! Na Pergunta ${i+1} você deve preencher completamente os dados na resposta incorreta 2 para então poder cadastrar a resposta incorreta 3. Se preferir, deixe ambas totalmente vazias.`)
            erro++
        }
        else if ((respIncorreta3==="" && urlRespIncorreta3!=="")||(respIncorreta3!=="" && urlRespIncorreta3==="")){
            alert(`Atenção! Você só preencheu uma informação da resposta incorreta 3 da Pergunta ${i+1}. Preencha as duas ou deixe ambas vazias para prosseguir.`)
            erro++
        }
        else if (urlRespIncorreta2!=="" && urlRespIncorreta2.slice(0,4)!="http"){
            alert(`Atenção! Foi digitado uma URL de imagem inválida na resposta incorreta 2 da Pergunta ${i+1}. Corrija para prosseguir`)
            erro++
        }
        else if (urlRespIncorreta3!=="" && urlRespIncorreta3.slice(0,4)!="http"){
            alert(`Atenção! Foi digitado uma URL de imagem inválida na resposta incorreta 2 da Pergunta ${i+1}. Corrija para prosseguir`)
            erro++
        }
        if (erro==0){
            //Criar o objeto com as informacoes da pergunta i+1 e dar push num objeto maior pra todo o quizz
            a+=1
        }

    }

    if (a===3){
        abrirCriarNiveisQuizz()
    }
    
}

function abrirCriarNiveisQuizz(){

    document.querySelector(".criarQuizz2").classList.add("escondido")

    //Editar linha abaixo pra fazer aparecer a tela de Criar Niveis
    //document.querySelector(".criarNiveis").classList.remove("escondido")

}

// TELA DE QUIZZ

// const promise = axios.get("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/1");
// promise.then(abrirQuizz);

function requisitarQuizz(IDdoQuizz) {
    const promise = axios.get("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/1");
    promise.then(abrirQuizz);
    promisse.catch(erroAbrirQuizz);
}

function abrirQuizz (resposta){

    let containerDePerguntas = document.querySelector(".quizzPage");
    containerDePerguntas.classList.remove("escondido");

    let objetoQuizz = resposta.data;
    let perguntas = objetoQuizz.questions;

    containerDePerguntas.innerHTML = 
    `<div class="capa">
        <img src='${objetoQuizz.image}'>
        <div class="tituloQuizz">${objetoQuizz.title}</div>
        <div class="camada"></div>
    </div>`;

    for (let i=0; i<perguntas.length; i++){
        let template = ""

        let template1 =
        `<div class="pergunta">
            <div class="enunciado cor${i}">${perguntas[i].title}</div>
            <div class="alternativas">`;

        template += template1;

        let alternativas = perguntas[i].answers;
        alternativas.sort(comparador);

        for(let j=0; j<alternativas.length; j++){
           
            let alternativa = alternativas[j];
            let marcadorRespostaCorreta = "";

            if(alternativa.isCorrectAnswer === true){
                marcadorRespostaCorreta =  "alternativaCerta";
            } else {
                marcadorRespostaCorreta =  "alternativaErrada";
            }

            let template2 = 
            `<div class="respostaOculta ${marcadorRespostaCorreta}" onclick="escolherAlternativa(this);">
                <img src="${alternativa.image}">
                ${alternativa.text}
            </div>`

            template += template2;
        }

        template += `</div></div>`;
        containerDePerguntas.innerHTML += template;
        document.querySelector(`.cor${i}`).style.backgroundColor=`${perguntas[i].color}`;
    }

    
}

function comparador() {
    return Math.random() - 0.5;
}

function escolherAlternativa(divEscolhida) {
    let divAlternativas = divEscolhida.parentElement;
    

    if(divAlternativas.querySelector(".alternativaSelecionada")){
        return
    } else {
        divEscolhida.classList.add("alternativaSelecionada")
        while(divAlternativas.querySelector(".respostaOculta")){
            divAlternativas.querySelector(".respostaOculta").classList.remove("respostaOculta");
        }
    }
}
