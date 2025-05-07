let humanScore = 0;
let computerScore = 0;
let roundCount = 0;
const maxRounds = 3;
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
  if (gameOver) return; // 游戏结束时不允许再点击

  const humanChoice = e.target.dataset.choice;
  const computerChoice = getComputerChoice();
  const resultMessage = playRound(humanChoice, computerChoice);
  roundCount++;

  document.getElementById("result").textContent =
    `Round ${roundCount}: You chose ${humanChoice}, computer chose ${computerChoice}. ${resultMessage}`;

  document.getElementById("score").textContent =
    `Score — You: ${humanScore}, Computer: ${computerScore}`;

  if (roundCount === maxRounds) {
    let finalMessage = "";

    if (humanScore > computerScore) {
      finalMessage = "🎉 You are the overall winner!";
    } else if (computerScore > humanScore) {
      finalMessage = "😢 The computer wins overall!";
    } else {
      finalMessage = "🤝 It's a tie overall!";
    }

    const finalDiv = document.createElement("div");
    finalDiv.id = "final-message";
    finalDiv.textContent = finalMessage;
    finalDiv.style.marginTop = "10px";
    finalDiv.style.fontWeight = "bold";
    document.body.appendChild(finalDiv);

    createResetButton();
    gameOver = true;
  }
}

function createResetButton() {
  const resetBtn = document.createElement("button");
  resetBtn.id = "reset-button";
  resetBtn.textContent = "Play Again";
  resetBtn.style.marginTop = "10px";
  resetBtn.addEventListener("click", resetGame);
  document.body.appendChild(resetBtn);
}

function resetGame() {
  // 重置状态
  humanScore = 0;
  computerScore = 0;
  roundCount = 0;
  gameOver = false;

  // 清除文字
  document.getElementById("result").textContent = "";
  document.getElementById("score").textContent = `Score — You: 0, Computer: 0`;

  // 删除最终结果与按钮
  const finalMsg = document.getElementById("final-message");
  if (finalMsg) finalMsg.remove();

  const resetBtn = document.getElementById("reset-button");
  if (resetBtn) resetBtn.remove();
}

const buttons = document.querySelectorAll("button[data-choice]");
buttons.forEach(btn => btn.addEventListener("click", handleClick));

// 初始化分数
document.getElementById("score").textContent = `Score — You: 0, Computer: 0`;
