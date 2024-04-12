'use strict';

// SELECTING DOM ELEMENTS
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// INTIALIZING DOM ELEMENT VALUES
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// INTIALIZING  GAME VARIABLES
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let hasgameOver = false;

// PLAYER SWICTHING FUNCTIONALITY
const switchPlayer = function () {
  // RESETTING THE CURRENT PLAYER SCORE
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');

  // SWICTHING THE CURRENT PLAYER
  activePlayer = Number(!activePlayer);
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

// ROLLING A DICE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
  if (!hasgameOver) {
    // GENERATE A RANDOM NUMBER
    const dice = Math.trunc(Math.random() * 6) + 1;

    // DISPLAY THE DICE
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      // ADD DICE TO CURRENT SCORE
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // SWICTHING THE CURRENT PLAYER
      switchPlayer();
    }
  }
});

// HOLDING THE SCORE FUNCTIONALITY
btnHold.addEventListener('click', function () {
  if (!hasgameOver) {
    // HOLDING THE CURRENT SCORE TO TOTAL SCORES
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // GAMEOVER CHECKING
    if (scores[activePlayer] >= 100) {
      // GAME OVER SETTINGS
      hasgameOver = true;

      // MANIPULATING THE STYLES THE OF THE WINNER
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      // HIDING THE DICE
      diceEl.classList.add('hidden');
    } else {
      // SWICTHING THE CURRENT PLAYER
      switchPlayer();
    }
  }
});

// RESETTING THE GAME FUNCTIONALITY

btnNew.addEventListener('click', function () {
  // RESETTING TOTAL SCORES OF PLAYERS
  score0El.textContent = 0;
  score1El.textContent = 0;

  // RESETTING THE CURRENT SCORES OF PLAYERS
  current0El.textContent = 0;
  current1El.textContent = 0;

  // TO START THE FRESH GAME
  hasgameOver = false;
  currentScore = 0;
  scores[0] = 0;
  scores[1] = 0;

  // HIDING THE DICE
  diceEl.classList.add('hidden');

  // IMPLEMENTING THE HIGH SCORE PLAYER AS  ACTIVE PLAYER

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
});
