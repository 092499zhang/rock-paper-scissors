function getComputerChoice() {
    const arry = ["rock", "paper", "scissors"];
    return arry[Math.floor(Math.random() * arry.length)];
}

function getHumanChoice() {
    let choice = prompt("Make your guess (rock, paper, or scissors):").toLowerCase();
    if (choice === "rock" || choice === "paper" || choice === "scissors") {
        return choice;
    } else {
        console.log("You need to give a valid value.");
        return undefined;
    }
}

function playGame() {
    let humanScore = 0;
    let computerScore = 0;

    function playRound(humanChoice, computerChoice) {
        if (humanChoice === computerChoice) {
            return "It's a tie.";
        } else if ((humanChoice === "rock" && computerChoice === "scissors") ||
            (humanChoice === "paper" && computerChoice === "rock") ||
            (humanChoice === "scissors" && computerChoice === "paper")) {
            humanScore++;
            return "You win!";
        } else {
            computerScore++;
            return "You lose.";
        }
    }

    const element = document.getElementById("btn");
    element.addEventListener("click", playRound);

    for (let i = 0; i < 5; i++) {
        let humanSelection = getHumanChoice();
        if (humanSelection) {
            let computerSelection = getComputerChoice();
            console.log(`Computer chose: ${computerSelection}`);
            console.log(`You chose: ${humanSelection}`);
            console.log(playRound(humanSelection, computerSelection));
            console.log(`Human Score: ${humanScore}`);
            console.log(`Computer Score: ${computerScore}`);
        } else {
            console.log("Invalid choice, round skipped.");
            i--; // Adjust the loop counter to ensure 5 valid rounds are played
        }
    }

    // Display final scores
    console.log(`Final Human Score: ${humanScore}`);
    console.log(`Final Computer Score: ${computerScore}`);

    if (humanScore > computerScore) {
        console.log("You are the overall winner!");
    } else if (computerScore > humanScore) {
        console.log("The computer is the overall winner!");
    } else {
        console.log("The game is a tie!");
    }
}

// Start the game
playGame();


