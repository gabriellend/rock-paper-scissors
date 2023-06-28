// ELEMENT SELECTORS
const buttons = document.querySelectorAll("button");
const roundResult = document.querySelector(".round-result h2");
const scoreLabels = document.querySelectorAll(".score-label");

// FUNCTIONS
const getComputerChoice = () => {
  const randNum = Math.ceil(Math.random() * 3);

  switch (randNum) {
    case 1:
      return "rock";
    case 2:
      return "paper";
    case 3:
    default:
      return "scissors";
  }
};

const getPlayerChoice = () => {
  let playerChoice = prompt("Enter 'rock', 'paper', or 'scissors' to play.");
  // If player hits cancel
  if (playerChoice === null) {
    return;
  }
  while (playerChoice === "") {
    playerChoice = prompt("Enter 'rock', 'paper', or 'scissors' to play.");
    // If player hits cancel
    if (playerChoice === null) {
      return;
    }
  }

  return playerChoice;
};

const showScores = (playerScore, computerScore) => {
  const playerScoreText = document.createTextNode(`Your score: ${playerScore}`);
  const computerScoreText = document.createTextNode(
    `Computer score: ${computerScore}`
  );

  scoreLabels.forEach((label) => {
    label.innerText = "";

    if (label.className.includes("player-score")) {
      label.appendChild(playerScoreText);
    } else if (label.className.includes("computer-score")) {
      label.appendChild(computerScoreText);
    }

    label.style.display = "inline-block";
  });
};

const showRoundResult = (result) => {
  roundResult.innerText = result;
};

const playRound = (playerSelection, computerSelection) => {
  playerSelection = playerSelection.toLowerCase();

  const playerWins =
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper");
  const computerWins =
    (playerSelection === "scissors" && computerSelection === "rock") ||
    (playerSelection === "rock" && computerSelection === "paper") ||
    (playerSelection === "paper" && computerSelection === "scissors");

  let resultMessage;
  let result;
  if (playerWins) {
    resultMessage = `You chose ${playerSelection} and the computer chose ${computerSelection}, you win!`;
    result = "Player wins";
  } else if (computerWins) {
    resultMessage = `You chose ${computerSelection} and the computer chose ${playerSelection}, you lose!`;
    result = "Computer wins";
  } else {
    resultMessage = `You both chose ${playerSelection}, it's a tie!`;
    result = "Tie";
  }

  showRoundResult(resultMessage);
  return result;
};

let playerScore = 0;
let computerScore = 0;

const game = (e) => {
  roundResult.textContent = "";

  let computerChoice = getComputerChoice();
  let playerChoice = e.target.innerText;

  let outcome = playRound(playerChoice, computerChoice);
  if (outcome === "Player wins") {
    playerScore++;
  } else if (outcome === "Computer wins") {
    computerScore++;
  }

  showScores(playerScore, computerScore);

  if (playerScore === 5 || computerScore === 5) {
    roundResult.textContent = "";
    buttons.forEach((button) => (button.disabled = true));
    if (playerScore === 5 && computerScore < 5) {
      showRoundResult("You win the game! Refresh to play again!");
    } else if (computerScore === 5 && playerScore < 5) {
      showRoundResult("You lose the game! Refresh to play again!");
    } else {
      showRoundResult("It's a tie! Refresh to play again!");
    }
  }
};

buttons.forEach((button) => button.addEventListener("click", game));
