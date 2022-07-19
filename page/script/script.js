const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
timesTag = document.querySelector(".time span b"),
tryAgainBtn = document.querySelector("button");


let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = isTyping = 0;

function randomParagraph() {
    // vai pegar um numero aleatorio que sempre sera menor que o tamanho do paragrafo
    let randIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    // pega um paragrafo aleatorio do "paragraphs" e divide todos os caracteres
    // adicionando cara caractere dentro da tag span e depois adicionando dentro de um tag <p>
    paragraphs[randIndex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    // faz o foco no input quando comeca a digitar ou quando clica no texto
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(!isTyping) { // quando o timer ligar, nao vai reiniciar toda vez que for precionada outra tecla
        timer = setInterval(initTimer, 1000);
        isTyping = true;
    }
    // aqui se voce errar, pode apagar que vai runfar
    if(typedChar == null) {
        charIndex--;
        characters[charIndex].classList.remove("correct","incorrect");
    } else {
        if(characters[charIndex].innerHTML === typedChar) {
        // se o caractere que foi digitado estiver certo, e adicionado uma classe de correto, se estiver errado e adicionado uma classe de incorreto
            characters[charIndex].classList.add("correct");
        } else {
            characters[charIndex].classList.add("incorrect");
        }
        charIndex++; // incrimenta a conta de caracteres quando e digitado uma letra correta ou incorreta
    }
    characters.forEach(span => span.classList.remove("active"));
    characters[charIndex].classList.add("active");
}

function initTimer() {
    // Se o timeLeft passar for menor que 0 ele para ou limpa no botao Try Again
    if(timeLeft > 0) {
        timeLeft--;
        timesTag.innerText = timeLeft;
    } else {
        clearInterval(timer)
    }
}

function resetGame() {
    // chamando a loadParagraph e resetando tudo
    randomParagraph();
    inpField.value = "";
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = isTyping = 0;
    timesTag.innerText = timeLeft;
}

randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);