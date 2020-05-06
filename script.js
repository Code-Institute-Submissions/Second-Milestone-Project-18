const cards = document.querySelectorAll('.card');

function flipCard() {
    this.classList.toggle('flip');
}

class Match {
    constructor(totalTime, cards) {
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById(timeRemaining)
        this.cardsArray = cards;
    }
    
    startGame() {
        this.timeRemaining = this.totalTime;
        this.matchedCards = [];
        this.busy = true;        
        this.cardToCheck = null;
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));