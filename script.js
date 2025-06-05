
const dino = document.getElementById("fish");
const cactus = document.getElementById("cactus");
const scoreText = document.getElementById("score");

let isJumping = false;
let isAlive = true;
let score = 0;
let cactusInterval;
 
function jump() {
  if (isJumping) return;
  isJumping = true;
  dino.classList.add("jump"); 
  setTimeout(() => {
    dino.classList.remove("jump");
    isJumping = false;
  }, 400);
}

function startGame() {
  score = 0;
  isAlive = true;
  cactus.style.right = "-25px";
  moveCactus();
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") jump();
  });
}

function moveCactus() {
  let cactusRight = -25;
  cactusInterval = setInterval(() => {
    if (!isAlive) {
      clearInterval(cactusInterval);
      alert("Game Over! Score: " + score);
      return;
    }

    cactusRight += 5;
    cactus.style.right = cactusRight + "px";

    if (cactusRight > 600) {
      cactusRight = -25;
      score++;
      scoreText.textContent = "Score: " + score;
    }

    // Collision detection
    const dinoBottom = parseInt(
      window.getComputedStyle(dino).getPropertyValue("bottom")
    );
    if (cactusRight > 510 && cactusRight < 550 && dinoBottom < 40) {
      isAlive = false;
    }
  }, 20);
}