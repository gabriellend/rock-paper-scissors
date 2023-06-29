// ELEMENT SELECTORS
const buttons = document.querySelectorAll("button");
const roundResult = document.querySelector(".round-result h2");
const scoreLabels = document.querySelectorAll(".score-label");
const scores = document.querySelectorAll(".score");
const banner = document.querySelector("h1");

// VARIABLES
const ROCK = "rock";
const PAPER = "paper";
const SCISSORS = "scissors";
const PLAYER_WINS = "Player wins";
const COMPUTER_WINS = "Computer wins";

let playerScore = 0;
let computerScore = 0;

// FUNCTIONS
const getComputerChoice = () => {
  const choices = [ROCK, PAPER, SCISSORS];
  const randIndex = Math.ceil(Math.random() * 3);

  return choices[randIndex];
};

const updateScoreElements = (score, playerScoreText, computerScoreText) => {
  score.innerText = "";

  if (score.className.includes("player-score")) {
    score.appendChild(playerScoreText);
  } else if (score.className.includes("computer-score")) {
    score.appendChild(computerScoreText);
  }
};

const showScores = (playerScore, computerScore) => {
  const playerScoreText = document.createTextNode(" " + playerScore);
  const computerScoreText = document.createTextNode(" " + computerScore);

  scores.forEach((score) =>
    updateScoreElements(score, playerScoreText, computerScoreText)
  );

  scoreLabels.forEach((label) => {
    label.style.display = "inline-block";
  });
};

const showRoundResult = (result) => {
  roundResult.innerText = result;
};

const showGameResult = (result) => {
  banner.innerText = result;
};

const playRound = (playerSelection, computerSelection) => {
  playerSelection = playerSelection.toLowerCase();

  const playerWins =
    (playerSelection === ROCK && computerSelection === SCISSORS) ||
    (playerSelection === PAPER && computerSelection === ROCK) ||
    (playerSelection === SCISSORS && computerSelection === PAPER);
  const computerWins =
    (playerSelection === SCISSORS && computerSelection === ROCK) ||
    (playerSelection === ROCK && computerSelection === PAPER) ||
    (playerSelection === PAPER && computerSelection === SCISSORS);

  let resultMessage;
  let result;
  if (playerWins) {
    resultMessage = `You chose ${playerSelection} and the computer chose ${computerSelection}, you win!`;
    result = PLAYER_WINS;
  } else if (computerWins) {
    resultMessage = `You chose ${playerSelection} and the computer chose ${computerSelection}, you lose!`;
    result = COMPUTER_WINS;
  } else {
    resultMessage = `You both chose ${playerSelection}, it's a tie!`;
    result = "Tie";
  }

  showRoundResult(resultMessage);
  return result;
};

const clearScreen = () => {
  roundResult.textContent = "";
  banner.textContent = "";
  scoreLabels.forEach((label) => {
    label.style.display = "none";
  });
  buttons.forEach((button) => {
    button.disabled = true;
    button.style.display = "none";
  });
};

const handleGameOver = (playerScore, computerScore) => {
  clearScreen();

  let resultMessage;
  if (playerScore === 5 && computerScore < 5) {
    resultMessage = "You win the game! Refresh to play again!";
  } else if (computerScore === 5 && playerScore < 5) {
    resultMessage = "You lose the game! Refresh to play again!";
  } else {
    resultMessage = "It's a tie! Refresh to play again!";
  }

  showGameResult(resultMessage);
};

const game = (e) => {
  roundResult.textContent = "";

  let computerChoice = getComputerChoice();
  let playerChoice = e.target.innerText;

  let outcome = playRound(playerChoice, computerChoice);
  if (outcome === PLAYER_WINS) {
    playerScore++;
  } else if (outcome === COMPUTER_WINS) {
    computerScore++;
  }

  showScores(playerScore, computerScore);

  if (playerScore === 5 || computerScore === 5) {
    handleGameOver(playerScore, computerScore);
  }
};

// EVENT LISTENERS
buttons.forEach((button) => button.addEventListener("click", game));
