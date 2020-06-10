//variables
//variables for the match game and cards
const cards = document.querySelectorAll('.card');
let cardFlipped = false;
let boardLock = false;
let firstCard, secondCard;

//variables for the flip counter
let flipCount =0;
let ticker = document.getElementById('flips');

//variable for the overlay that appears when the page is loaded or refreshed from https://www.freecodecamp.org/forum/t/adding-class-to-multiple-elements-same-class-javascript/211922
let overlays = Array.from(document.getElementsByClassName('overlay'));
overlays.forEach(overlay => {
    overlay.addEventListener('click', () => {
        overlay.classList.remove('visible');
    });
});

//functions
//card flip that also adds to the flip counter everytime a card is flipped
function cardFlip() {
    if (boardLock) return;
    if (this ===firstCard) return;
    flipCount ++;
    ticker.innerText = flipCount;
    this.classList.add('flip');

    if (!cardFlipped) {
        cardFlipped = true;
        firstCard = this;
        return;
    }    
    cardFlipped = false;
    secondCard = this;
    checkIfMatch();
}

//checks whether the dataset.img for the two currently flipped matches
function checkIfMatch() {
    let isMatch = firstCard.dataset.img === secondCard.dataset.img;
    isMatch ? disableCards() : cardUnFlip();
}

//if no match, the cards will unflip to their original position
function cardUnFlip() {
    boardLock = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetGame();
    }, 1500);
}

//disables cards after two have been flipped so three cards cannot click in quick succession
function disableCards() {
    firstCard.removeEventListener('click', cardFlip);
    secondCard.removeEventListener('click', cardFlip);
    resetGame();
}

function resetGame() {
    [cardFlipped, boardLock] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//shuffle function from https://stackoverflow.com/questions/58071245/queryselectorall-wont-work-for-shuffling-the-order-of-that-list
(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 20);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', cardFlip));
