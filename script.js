// ELEMENT SELECTORS
const choices = document.querySelectorAll("button");
const results = document.querySelector(".results");

// FUNCTIONS
const getComputerChoice = () => {
  const randNum = Math.ceil(Math.random() * 3);

  // This does the same thing as the switch statement below
  // just with an if/else statement
  // if (randNum === 1) {
  //   return "rock";
  // } else if (randNum === 2) {
  //   return "paper";
  // } else {
  //   return "scissors";
  // }

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

  if (playerWins) {
    const winTextNode = document.createTextNode(
      `You win this round! ${playerSelection} beats ${computerSelection}.`
    );
    results.appendChild(winTextNode);
  } else if (computerWins) {
    const loseTextNode = document.createTextNode(
      `You lose this round! ${computerSelection} beats ${playerSelection}.`
    );
    results.appendChild(loseTextNode);
  } else {
    const tieTextNode = document.createTextNode(
      `${playerSelection} and ${computerSelection}. It's a tie this round!`
    );
    results.appendChild(tieTextNode);
  }
};

const game = () => {
  let playerTotalWins = 0;
  let computerTotalWins = 0;
  let ties = 0;

  for (let round = 1; round <= 5; round++) {
    let computerChoice = getComputerChoice();
    let playerChoice = getPlayerChoice();
    // If player hits cancel
    if (!playerChoice) {
      console.log("Game canceled");
      return;
    }

    let outcome = playRound(playerChoice, computerChoice);
    if (outcome === "Player wins") {
      playerTotalWins++;
    } else if (outcome === "Computer wins") {
      computerTotalWins++;
    } else {
      ties++;
    }
  }

  // The above for loop can also be written as a while loop:
  // let round = 1;
  // while (round <= 5) {
  //  ...code to execute
  //  round ++
  //}

  if (playerTotalWins > computerTotalWins) {
    console.log("You win the game! Refresh to play again!");
  } else if (computerTotalWins > playerTotalWins) {
    console.log("You lose the game! Refresh to play again!");
  } else {
    console.log("The game is a tie! Refresh to play again!");
  }
};

// game();

choices.forEach((choice) =>
  choice.addEventListener("click", (e) => {
    results.textContent = "";

    let computerChoice = getComputerChoice();
    let playerChoice = e.target.innerText;

    playRound(playerChoice, computerChoice);
  })
);
