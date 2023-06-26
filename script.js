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
    console.log(
      `You win this round! ${playerSelection} beats ${computerSelection}.`
    );
    return "Player wins";
  } else if (computerWins) {
    console.log(
      `You lose this round! ${computerSelection} beats ${playerSelection}.`
    );
    return "Computer wins";
  } else {
    console.log(
      `${playerSelection} and ${computerSelection}. It's a tie this round!`
    );
    return "It's a tie";
  }
};

const game = () => {
  let round = 1;
  let playerTotalWins = 0;
  let computerTotalWins = 0;
  let ties = 0;

  while (round <= 5) {
    let computerChoice = getComputerChoice();
    let playerChoice = getPlayerChoice();

    let outcome = playRound(playerChoice, computerChoice);
    if (outcome === "Player wins") {
      playerTotalWins++;
    } else if (outcome === "Computer wins") {
      computerTotalWins++;
    } else {
      ties++;
    }

    round++;
  }

  if (playerTotalWins > computerTotalWins) {
    console.log("You win the game!");
  } else if (computerTotalWins > playerTotalWins) {
    console.log("You lose the game!");
  } else {
    console.log("The game is a tie!");
  }
};

game();
