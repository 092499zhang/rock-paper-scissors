let humanScore = 0;
let computerScore = 0;
let gameOver = false;

const rules = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper"
};

function getComputerChoice() {
  const options = ["rock", "paper", "scissors"];
  return options[Math.floor(Math.random() * options.length)];
}

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return "It's a tie!";
  }

  if (rules[humanChoice] === computerChoice) {
    humanScore++;
    return `You win this round! ${humanChoice} beats ${computerChoice}.`;
  } else {
    computerScore++;
    return `You lose this round. ${computerChoice} beats ${humanChoice}.`;
  }
}

function handleClick(e) {
  if (gameOver) return;

  const humanChoice = e.target.dataset.choice;
  const computerChoice = getComputerChoice();
  const resultMessage = playRound(humanChoice, computerChoice);

  document.getElementById("result").textContent =
    `You chose ${humanChoice}, computer chose ${computerChoice}. ${resultMessage}`;

  document.getElementById("score").textContent =
    `Score — You: ${humanScore}, Computer: ${computerScore}`;

  if (humanScore === 5 || computerScore === 5) {
    endGame();
  }
}

function endGame() {
  gameOver = true;

  const finalMessage =
    humanScore === 5
      ? "You reached 5 points. You win!"
      : "Computer reached 5 points. You lose!";

  const finalDiv = document.createElement("div");
  finalDiv.id = "final-message";
  finalDiv.textContent = finalMessage;
  finalDiv.style.marginTop = "20px";
  finalDiv.style.fontWeight = "bold";

  const resetBtn = document.createElement("button");
  resetBtn.id = "reset-button";
  resetBtn.textContent = "Play Again";
  resetBtn.style.marginTop = "10px";
  resetBtn.addEventListener("click", resetGame);

  //添加到主容器 .box 内部，而不是 document.body
  const container = document.querySelector(".box");
  container.appendChild(finalDiv);
  container.appendChild(resetBtn);
}

function resetGame() {
  humanScore = 0;
  computerScore = 0;
  gameOver = false;

  document.getElementById("result").textContent = "";
  document.getElementById("score").textContent = `Score — You: 0, Computer: 0`;

  const finalMsg = document.getElementById("final-message");
  if (finalMsg) finalMsg.remove();

  const resetBtn = document.getElementById("reset-button");
  if (resetBtn) resetBtn.remove();
}

// 初始化按钮监听器
const buttons = document.querySelectorAll("button[data-choice]");
buttons.forEach(btn => btn.addEventListener("click", handleClick));

// 初始分数显示
document.getElementById("score").textContent = `Score — You: 0, Computer: 0`;
