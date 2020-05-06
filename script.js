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
        this.shuffleCards();
    }

    shuffleCards(cardsArray) {
        for (let i = cardsArray.length - 1; i > 0; i--) {
            const randIndex = Math.floor(Math.random() * (i + 1));
            [cardsArray[i], cardsArray[randIndex]] = [cardsArray[randIndex], cardsArray[i]];
        }
        cardsArray = cardsArray.map((card, index) => {
            card.style.order = index;
        });
    }
}

cards.forEach(card => card.addEventListener('click', flipCard));