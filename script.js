//variables
const cards = document.querySelectorAll('.card');

let countdown;
let cardFlipped = false;
let lockBoard = false;
let firstCard, secondCard;

let totalTime = 60;
let minute = 60;
let timer = document.getElementById('time');

//functions

function flipCard() {
    if (lockBoard) return;
    this.classList.add('flip');

    if (!cardFlipped) {
        cardFlipped = true;
        firstCard = this;
        return;
    }    
        
    cardFlipped = false;
     secondCard = this;

    checkForMatch();
}

function restartGame () {
    shuffle();
    hideCards();
    matchedCards = [];
    totalTime = 60;
    timer.innerText = totalTime
    countdown = setInterval(startClock, 1000);
    cards.forEach(card => {
        card.addEventListener('click', flipCard);
    });
}

function startClock() {
    totalTime--;
    timer.innerText = totalTime;
    if (totalTime <= 0)
    gameOver ()
}

function gameOver () {
    clearInterval (countdown);
    document.getElementById('lose-modal').classList.add('visible');
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [cardFlipped, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 20);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));