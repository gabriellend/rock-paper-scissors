// ELEMENT SELECTORS
const buttons = document.querySelectorAll("button");
const roundResult = document.querySelector(".round-result h2");
const scoreLabels = document.querySelectorAll(".score-label");
const scores = document.querySelectorAll(".score");
const banner = document.querySelector("h1");

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

const showScores = (playerScore, computerScore) => {
  const playerScoreText = document.createTextNode(" " + playerScore);
  const computerScoreText = document.createTextNode(" " + computerScore);

  scores.forEach((score) => {
    score.innerText = "";

    if (score.className.includes("player-score")) {
      score.appendChild(playerScoreText);
    } else if (score.className.includes("computer-score")) {
      score.appendChild(computerScoreText);
    }

    scoreLabels.forEach((label) => {
      label.style.display = "inline-block";
    });
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
    resultMessage = `You chose ${playerSelection} and the computer chose ${computerSelection}, you lose!`;
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
    banner.textContent = "";
    scoreLabels.forEach((label) => {
      label.innerText = "";
    });
    buttons.forEach((button) => {
      button.disabled = true;
      button.style.display = "none";
    });

    let result;
    if (playerScore === 5 && computerScore < 5) {
      result = "You win the game! Refresh to play again!";
    } else if (computerScore === 5 && playerScore < 5) {
      result = "You lose the game! Refresh to play again!";
    } else {
      result = "It's a tie! Refresh to play again!";
    }

    showGameResult(result);
  }
};

// EVENT LISTENERS
buttons.forEach((button) => button.addEventListener("click", game));
