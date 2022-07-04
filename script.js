function pegarQuizzes () {
    const promise = axios.get("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes");
    promise.then(exibirQuizzes);
}

let listaIDs = JSON.parse(localStorage.getItem('id'));

function exibirQuizzes (object) {
    let cont=0;
    quizzServer = object.data;
    let quizzes = document.querySelector(".quadroQuizzes");
    let userQuizzes = document.querySelector(".semQuizzUsuario");
    //LINHA ADICIONADA - CORRIGIR BUG
    if(localStorage.getItem("id")!=='[]' && localStorage.length > 0) {
        userQuizzes.classList.add("escondido");
        document.querySelector(".comQuizzUsuario").classList.remove("escondido");
    }
    //LINHA ADICIONADA
    let container = document.querySelector(".container");
    quizzes.innerHTML = "";
    container.classList.remove("escondido");

    for(let i = 0; i < quizzServer.length; i++) {
        if (listaIDs!== null) {
            for(let j = 0; j < listaIDs.length; j++) {
                if(quizzServer[i].id !== listaIDs[j].id) {            
                    quizzes.innerHTML += `<div class="quizz" onclick="requisitarQuizz(${quizzServer[i].id});" style="background-image: linear-gradient( to bottom, rgba(255,0,0,0), rgba(0,0,0,1)), url(${quizzServer[i].image});">
                    <div class="nomeQuizz">${quizzServer[i].title}</div>
                    </div>`;
                }
            }
        }
        
        if(listaIDs === null) {
            quizzes.innerHTML += `<div class="quizz" onclick="requisitarQuizz(${quizzServer[i].id});" style="background-image: linear-gradient( to bottom, rgba(255,0,0,0), rgba(0,0,0,1)), url(${quizzServer[i].image});">
            <div class="nomeQuizz">${quizzServer[i].title}</div>
            </div>`;
        } 
          
    }
}
    // if (localStorage.getItem("id")!=='[]' && localStorage.length > 0){
    //     userQuizzes.classList.add("escondido");
    // }

    //console.log(listaIDs)
    // if (listaIDs===null) {
    //     for(let i = 0; i < quizzServer.length; i++) {
    //         quizzes.innerHTML += `<div class="quizz" onclick="requisitarQuizz(${quizzServer[i].id});" style="background-image: linear-gradient( to bottom, rgba(255,0,0,0), rgba(0,0,0,1)), url(${quizzServer[i].image});">
    //         <div class="nomeQuizz">${quizzServer[i].title}</div>
    //         </div>`;
    //     }
    // } else {
    //     for(let i = 0; i < quizzServer.length; i++) {
    //         cont=0;
    //         for(let j = 0; j < listaIDs.length; j++) {
    //             //console.log(j)
    //             if (quizzServer[i].id === listaIDs[j]){
    //                 cont++
    //             }
    //         }
    //             if(cont>0) {
    //                 document.querySelector(".quizzUsuario").innerHTML += `<div class="quizz" onclick="requisitarQuizz(${quizzServer[i].id});" style="background-image: linear-gradient( to bottom, rgba(255,0,0,0), rgba(0,0,0,1)), url(${quizzServer[i].image});">
    //                 <div class="nomeQuizz">${quizzServer[i].title}</div>
    //                 </div>`;
    //             } else {
    //                 quizzes.innerHTML += `<div class="quizz" onclick="requisitarQuizz(${quizzServer[i].id});" style="background-image: linear-gradient( to bottom, rgba(255,0,0,0), rgba(0,0,0,1)), url(${quizzServer[i].image});">
    //                 <div class="nomeQuizz">${quizzServer[i].title}</div>
    //                 </div>`;
    //             }
    //     }
    // }
    

    
    


pegarQuizzes();

function exibirQuizzesUsuario () {
    let quadroQuizzesUsuario = document.querySelector(".quizzesDoUsuario");
    quadroQuizzesUsuario.innerHTML = "";
    for(let i = 0; i < listaIDs.length; i++) {
        quadroQuizzesUsuario.innerHTML += `<div class="quizz" onclick="requisitarQuizz(${listaIDs[i].id});" style="background-image: linear-gradient( to bottom, rgba(255,0,0,0), rgba(0,0,0,1)), url(${listaIDs[i].image});">
        <div class="nomeQuizz">${listaIDs[i].title}</div>
        </div>`

    }
}

exibirQuizzesUsuario();


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
    if (url.slice(0,4)!="http"){
        msgErro();
    }
    let cont=0;
    for (let i = 0; i < levels.length; i++) {
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

    if (tituloCriarQuizz.length<20 || tituloCriarQuizz.length>65){
        alert("Atenção! O título do quizz deve ter no mínimo 20 e no máximo 65 caracteres.")
        erro++
    }
    else if (urlCriarQuizz.slice(0,4)!="http"){
        alert("Atenção! Insira uma url de imagem válida.");
        erro++;
    }
    else if (isNaN(qtdPerguntasCriarQuizz) || qtdPerguntasCriarQuizz<3){
        alert("Atenção! O seu quizz deve ter pelo menos 3 perguntas.");
        document.querySelector(".qtdPerguntasCriarQuizz").value="";
        erro++;
    }
    else if (isNaN(qtdNiveisCriarQuizz) || qtdNiveisCriarQuizz<2){
        alert("Atenção! Você deve criar pelo menos 2 níveis para o seu quizz.");
        document.querySelector(".qtdNiveisCriarQuizz").value="";
        erro++;
    }
    if (erro==0){
        abrirCriarPerguntasQuizz();
    }
}

// TELA 2 CRIAÇÃO DE QUIZZES

function abrirCriarPerguntasQuizz(){
    
    document.querySelector(".criarQuizz1").classList.add("escondido")
    document.querySelector(".criarQuizz2").classList.remove("escondido")

    for (let i=3; i<qtdPerguntasCriarQuizz;i++){

        document.querySelector(".criarQuizz2").innerHTML+=`<div class="criarPergunta perg${i+1}">
        <div class="criarPerguntaMaximizado escondido">
            <h1>Pergunta ${i+1}</h1>
            <input class="textoPergunta perg${i+1}" type="text" placeholder="Texto da pergunta">
            <input class="corPergunta perg${i+1}" type="text" placeholder="Cor de fundo da pergunta">
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
            alert(`Atenção! Foi digitado uma URL de imagem inválida na resposta incorreta 3 da Pergunta ${i+1}. Corrija para prosseguir`)
            erro++
        }
        if (erro==0){
            //Criar o objeto com as informacoes da pergunta i+1 e dar push num objeto maior pra todo o quizz
            a+=1
        }

    }

    if (a===qtdPerguntasCriarQuizz){
        abrirCriarNiveisQuizz()
    }
    
}

function abrirCriarNiveisQuizz(){

    document.querySelector(".criarQuizz2").classList.add("escondido")
    document.querySelector(".telaNiveis").classList.remove("escondido")
    renderizarNiveis();

}

// TELA DE QUIZZ
let objetoQuizz, numeroDePerguntas,pontuacao, idDoQuiz;
let containerDePerguntas = document.querySelector(".quizzPage");

function requisitarQuizz(IDdoQuizz) {
    idDoQuiz = IDdoQuizz
    const promise = axios.get(`https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes/${idDoQuiz}`);
    promise.then(abrirQuizz);
}

function abrirQuizz (resposta){
    pontuacao = 0;
    document.querySelector(".container").classList.add("escondido");
    containerDePerguntas.classList.remove("escondido");

    objetoQuizz = resposta.data;
    let perguntas = objetoQuizz.questions;
    numeroDePerguntas = perguntas.length;

    containerDePerguntas.innerHTML = 
    `<div class="capa">
        <img src='${objetoQuizz.image}'>
        <div class="tituloQuizz">${objetoQuizz.title}</div>
        <div class="camada"></div>
    </div>`;

        for (let i=0; i<perguntas.length; i++){
            let template = ""

            let template1 =
            `<div class="pergunta aResponder">
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
            if (perguntas[i].color === "#FFFFFF"){
                document.querySelector(`.cor${i}`).style.color="#488584";
                document.querySelector(`.cor${i}`).style.boxShadow = "0px 0px 5px rgba(0, 0, 0, 0.3)"
            }
        }
    
    containerDePerguntas.innerHTML += `
    <div class="containerResultado escondido">
        <div class="resultado">
            <div class="pontuacao"></div>
            <div class="descricao"></div>
        </div>

        <div class="reiniciarQuizz" onclick="reinicarQuizz();">Reiniciar Quizz</div>
        <div class="voltar" onclick="voltarPaginaQuizzes();">Voltar para Home</div>
    </div>`;
    document.querySelector(".capa").scrollIntoView({block:"center", behavior:"auto"});      
}

function comparador() {
    return Math.random() - 0.5;
}

function escolherAlternativa(divEscolhida) {
    let divAlternativas = divEscolhida.parentElement;
    divAlternativas.parentElement.classList.remove("aResponder");
    

    if(divAlternativas.querySelector(".alternativaSelecionada")){
        return
    } else {
        divEscolhida.classList.add("alternativaSelecionada")
        while(divAlternativas.querySelector(".respostaOculta")){
            divAlternativas.querySelector(".respostaOculta").classList.remove("respostaOculta");
        }
        
        if(divAlternativas.querySelector(".alternativaSelecionada.alternativaCerta")){
            pontuacao++;
        }
    }

    let proximaPergunta = document.querySelector(".aResponder")
    if (document.querySelector(".aResponder")){
        setTimeout(function (){proximaPergunta.scrollIntoView({block: "center", behavior: "smooth"});},2000);
    }


    if(document.querySelector(".aResponder") === null){

        let containerResultado = document.querySelector(".containerResultado");
        let acerto = Math.round((pontuacao/numeroDePerguntas)*100)
        let porcentagemAcerto = `${acerto}%`
        let niveisAcerto = objetoQuizz.levels;
        let levelEscolhido = -1;

        for (let i=0; i < niveisAcerto.length; i++){

            if(acerto >= niveisAcerto[i].minValue){
                if(levelEscolhido < 0){
                    levelEscolhido = i;
                } else {
                    if(niveisAcerto[i].minValue > niveisAcerto[levelEscolhido].minValue){
                        levelEscolhido = i;
                    }
                }
            }
        }

        document.querySelector(".pontuacao").innerHTML = `${porcentagemAcerto} de acerto: ${niveisAcerto[levelEscolhido].title}`;
        document.querySelector(".descricao").innerHTML =`<img src='${niveisAcerto[levelEscolhido].image}'/><div class="descricaoTexto">${niveisAcerto[levelEscolhido].text}</div>`;

        setTimeout(function (){
            containerResultado.classList.remove("escondido");
            document.querySelector(".resultado").scrollIntoView({block:"center", behavior: "smooth"});
        },2000)        
    }
}
 
function reinicarQuizz() {
    containerDePerguntas.scrollIntoView({block:"start", behavior: "smooth"});
    requisitarQuizz(idDoQuiz);
}

function voltarPaginaQuizzes() {
    containerDePerguntas.classList.add("escondido");
    document.querySelector(".container").classList.remove("escondido");  
    document.querySelector(".container").scrollIntoView({block:"start", behavior:"auto"});                    
}






//TELA DE NÍVEIS

function renderizarNiveis (){
    let niveis = document.querySelector(".pagNiveis");
    niveis.innerHTML = "";
    qtdNiveisCriarQuizz = 5;
    for (let i = 0; i < qtdNiveisCriarQuizz; i++) {
        niveis.innerHTML += 
        `<div class="niveis">
            <div class="nivelMaximizado escondido">
                <span>Nível ${i+1}</span>
                <input class ="tituloNivel nv${i+1}" type="text" placeholder="Título do nível">
                <input class ="acertos nv${i+1}" type="text" placeholder="% de acerto mínima">
                <input class ="url nv${i+1}" type="text" placeholder="URL da imagem do nível">
                <textarea class ="descricao nv${i+1}" name="" id="" cols="30" rows="10" placeholder="Descrição do nível"></textarea>
            </div>
            <div class="nivelMinimizado">
                <h1>Nivel ${i+1}</h1>
                <img src="./imgs/icon-edit.svg" onclick="maximizarNivel(this)"/>
            </div>
        </div>`;
    }
}

function maximizarNivel(elemento){

    if(document.querySelector(".nivelMaximizado:not(.escondido)")) {
        document.querySelector(".nivelMaximizado:not(.escondido)").classList.add("escondido");
    }
    if(document.querySelector(".nivelMinimizado.escondido")) {
        document.querySelector(".nivelMinimizado.escondido").classList.remove("escondido");
    }
    elemento.parentElement.parentElement.firstElementChild.classList.remove("escondido");
    elemento.parentElement.parentElement.firstElementChild.scrollIntoView({block:"center", behavior: "smooth"});
    elemento.parentElement.classList.add("escondido");

}

let objQuizz = {
    title: "",
    image: "",
    questions: [
        
    ],
    levels: [
        
    ]
}

function finalizarQuizz () {
    objQuizz.title = tituloCriarQuizz;
    objQuizz.image = urlCriarQuizz;

    for(let i = 0; i < qtdPerguntasCriarQuizz; i++) {
         objQuizz.questions[i] = 
             {
                 title: document.querySelector(`.textoPergunta.perg${i+1}`).value,
                 color: document.querySelector(`.corPergunta.perg${i+1}`).value,
                 answers: [
                     {
                         text: document.querySelector(`.respCorreta.perg${i+1}`).value,
                         image: document.querySelector(`.urlRespCorreta.perg${i+1}`).value,
                         isCorrectAnswer: true
                     },
                     {
                         text: document.querySelector(`.respIncorreta1.perg${i+1}`).value,
                         image: document.querySelector(`.urlRespIncorreta1.perg${i+1}`).value,
                         isCorrectAnswer: false
                     },
                     {
                        text: document.querySelector(`.respIncorreta2.perg${i+1}`).value,
                        image: document.querySelector(`.urlRespIncorreta2.perg${i+1}`).value,
                        isCorrectAnswer: false
                    },
                    {
                        text: document.querySelector(`.respIncorreta3.perg${i+1}`).value,
                        image: document.querySelector(`.urlRespIncorreta3.perg${i+1}`).value,
                        isCorrectAnswer: false
                    }
                 ]
             }
        
        }     
    
     for(let i = 0; i < qtdNiveisCriarQuizz; i++) {
        objQuizz.levels[i] = {
            title: document.querySelector(`.tituloNivel.nv${i+1}`).value,
            image: document.querySelector(`.url.nv${i+1}`).value,
            text: document.querySelector(`.descricao.nv${i+1}`).value,
            minValue: document.querySelector(`.acertos.nv${i+1}`).value
        }
     }

      for(let i = 0; i < qtdPerguntasCriarQuizz; i++){
         
          if (objQuizz.questions[i].answers[3].text === "") {
              objQuizz.questions[i].answers.splice(3,1);
              if(objQuizz.questions[i].answers[2].text === "") {
                 objQuizz.questions[i].answers.splice(2,1);
              }
          }
      }

    console.log(objQuizz);
    const promise = axios.post("https://mock-api.driven.com.br/api/v7/buzzquizz/quizzes", objQuizz);
    //console.log(promise);
    promise.then(mostrarSucesso);
}


//TELA DE SUCESSO DO QUIZZ

let id;

function mostrarSucesso (resp) {
    document.querySelector(".telaNiveis").classList.add("escondido");
    document.querySelector(".telaSucesso").classList.remove("escondido");
    document.querySelector(".telaSucesso").innerHTML = "";
    document.querySelector(".telaSucesso").innerHTML = `
    <div class="sucessoTitulo">Seu quizz está pronto!</div>
    <div class="novoQuizz" style="background-image: linear-gradient( to bottom, rgba(255,0,0,0), rgba(0,0,0,1)), url(${urlCriarQuizz});" onclick="acessarQuizz()">
        <div class="nomeQuizz" onclick="acessarQuizz()">${tituloCriarQuizz}</div>
    </div> 
    <div class="botoes">
        <input type="button" class="botaoAcessarQuizz" value="Acessar Quizz" onclick="acessarQuizz()">
        <input type="button" class="botaoHome" value="Voltar pra home" onclick="voltarHome()">
    </div>`;

    //criar Local Storage dos IDs criados:
    salvarQuizzLocalmente(resp.data)
}

function salvarQuizzLocalmente(id){
    if (localStorage.length===0){
        localStorage.setItem('id',JSON.stringify([id]));
    } else {
        let listaID=JSON.parse(localStorage.getItem('id'))
        listaID.push(id)
        localStorage.setItem('id', JSON.stringify(listaID))
    }
    console.log(localStorage)
}

function voltarHome () {
    let sucesso = document.querySelector(".telaSucesso");
    sucesso.classList.add("escondido");
    pegarQuizzes();
}

function acessarQuizz () {
    let sucesso = document.querySelector(".telaSucesso");
    sucesso.classList.add("escondido");
    let quizzPage = document.querySelector(".quizzPage");
    quizzPage.classList.remove("escondido");
}



//BOTÃO CRIAR QUIZZ

function telaCriacao () {
    let homepage = document.querySelector(".container");
    homepage.classList.add("escondido");
    document.querySelector(".criarQuizz1").classList.remove("escondido");
}
