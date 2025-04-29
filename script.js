const gameBoard = document.getElementById('gameBoard');
const numbers = [...Array(8).keys(), ...Array(8).keys()];
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Shuffle the numbers
numbers.sort(() => 0.5 - Math.random());

// Create cards
numbers.forEach(num => {
  const card = document.createElement('div');
  card.classList.add('memory-card');
  card.dataset.number = num;
  card.textContent = '?';
  card.addEventListener('click', flipCard);
  gameBoard.appendChild(card);
});

function flipCard() {
  if (lockBoard || this.classList.contains('matched') || this === firstCard) return;

  this.classList.add('flip');
  this.textContent = this.dataset.number;

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  if (firstCard.dataset.number === secondCard.dataset.number) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      firstCard.textContent = '?';
      secondCard.textContent = '?';
      resetBoard();
    }, 1000);
  }
}

function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}
