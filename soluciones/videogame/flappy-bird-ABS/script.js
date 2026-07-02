const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  parent: "game-container",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 500 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

let startButton, stopButton, continueButton, gameOverText;
let bird,
  pipes,
  pipeGap = 150,
  isGameOver = true,
  score = 0;
let scoreText;
let pipeTimer; // Global variable to track pipe generation timer
let currentScene; // Store scene reference
const game = new Phaser.Game(config);

function preload() {
  // Load assets
  this.load.image("bird", "assets/bird.png");
  this.load.image("pipe", "assets/pipe.png");
  this.load.image("background", "assets/background.png");
}

function create() {
  // Add background
  this.add.image(240, 320, "background").setScale(1.5);

  // Add Start Button
  startButton = this.add
    .text(240, 320, "Start", {
      font: "32px Arial",
      fill: "#ffffff",
      backgroundColor: "#000",
      padding: { x: 20, y: 10 },
    })
    .setOrigin(0.5)
    .setInteractive()
    .on("pointerdown", startGame, this);

  // Add Stop and Continue Buttons (hidden initially)
  stopButton = this.add
    .text(400, 20, "Stop", {
      font: "20px Arial",
      fill: "#ffffff",
      backgroundColor: "#ff0000",
      padding: { x: 10, y: 5 },
    })
    .setInteractive()
    .setVisible(false)
    .on("pointerdown", stopGame, this);

  continueButton = this.add
    .text(400, 20, "Continue", {
      font: "20px Arial",
      fill: "#ffffff",
      backgroundColor: "#00ff00",
      padding: { x: 10, y: 5 },
    })
    .setInteractive()
    .setVisible(false)
    .on("pointerdown", continueGame, this);

  // Add keyboard input for spacebar
  this.input.keyboard.on("keydown-SPACE", flap, this);

  // Add Score Text (bottom right)
  scoreText = this.add
    .text(420, 600, `Score: ${score}`, {
      font: "24px Arial",
      fill: "#ffffff",
    })
    .setOrigin(1, 1);

  // Add collision with world bounds
  bird.setCollideWorldBounds(true);
  bird.body.onWorldBounds = true;

  this.physics.world.on(
    "worldbounds",
    function (body) {
      if (body.gameObject === bird) {
        endGame(this.scene);
      }
    },
    this
  );
}

function startGame() {
  // Reset game state
  isGameOver = false;
  score = 0;
  scoreText.setText(`Score: ${score}`);

  // Clear UI elements
  startButton.setVisible(false);
  if (gameOverText) gameOverText.destroy();

  // Resume physics if paused
  this.physics.resume();

  // Clear existing objects
  if (bird) bird.destroy();
  if (pipes) pipes.clear(true, true);

  // Clean up existing timer
  if (pipeTimer) pipeTimer.remove();

  // Create new bird with world bounds collision
  bird = this.physics.add.sprite(100, 320, "bird");
  bird.setCollideWorldBounds(true);
  bird.body.onWorldBounds = true;
  bird.body.gravity.y = 1000;

  // Initialize pipes group with faster generation
  pipes = this.physics.add.group();
  pipeTimer = this.time.addEvent({
    delay: 1500, // Reduced from 2000 to 1500ms
    callback: addPipes,
    callbackScope: this,
    loop: true,
  });

  // Set up collisions
  this.physics.add.collider(bird, pipes, hitPipe, null, this);

  // Store scene reference
  currentScene = this;

  // Show stop button
  stopButton.setVisible(true);
  stopButton.bringToTop();
}

function update() {
  if (isGameOver) {
    return;
  }

  // Check if the bird has fallen off the screen
  if (bird.y > 640 || bird.y < 0) {
    endGame(this);
  }

  // Check if bird passes pipes and increase score
  pipes.getChildren().forEach((pipe) => {
    if (pipe.x < bird.x && !pipe.passed) {
      pipe.passed = true;
      score += 1; // Increase score
      scoreText.setText(`Score: ${score}`); // Update score display
    }
  });
}

function flap() {
  if (isGameOver) {
    return;
  }

  bird.setVelocityY(-300); // Make the bird "jump"
}

function addPipes() {
  const topPipeY = Phaser.Math.Between(-200, 0);
  const bottomPipeY = topPipeY + pipeGap + 320;

  const topPipe = pipes.create(480, topPipeY, "pipe").setOrigin(0, 0);
  const bottomPipe = pipes.create(480, bottomPipeY, "pipe").setOrigin(0, 0);

  // Increase pipe movement speed
  [topPipe, bottomPipe].forEach((pipe) => {
    pipe.body.velocity.x = -250; // Increased from -200 to -250
    pipe.body.allowGravity = false;
    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
    pipe.passed = false;
  });
}

function hitPipe() {
  if (!isGameOver) {
    endGame(this);
  }
}

function endGame(scene) {
  isGameOver = true;
  currentScene = scene;

  // Stop physics and pipe generation
  scene.physics.pause();
  if (pipeTimer) pipeTimer.remove();

  // Show game over state
  bird.setTint(0xff0000);

  gameOverText = scene.add
    .text(240, 250, "Game Over", {
      font: "48px Arial",
      fill: "#ffffff",
      backgroundColor: "#000",
      padding: { x: 20, y: 10 },
    })
    .setOrigin(0.5);

  startButton.setPosition(240, 350).setVisible(true);
  stopButton.setVisible(false);
}

function resetGame() {
  isGameOver = false;
  score = 0;
  scoreText.setText("Score: 0");

  // Reset bird properties
  bird.clearTint();
  bird.setPosition(100, 320);
  bird.setVelocity(0, 0);

  // Clear existing pipes and restart physics
  pipes.clear(true, true);
  currentScene.physics.resume();

  // Remove game over text if it exists
  if (gameOverText) {
    gameOverText.destroy();
  }

  // Reset pipe generation
  pipeTimer = currentScene.time.addEvent({
    delay: 2000,
    callback: addPipes,
    callbackScope: currentScene,
    loop: true,
  });

  // Reset button visibility
  startButton.setVisible(false);
  stopButton.setVisible(true);
}

function stopGame() {
  this.physics.pause(); // Pause the game
  stopButton.setVisible(false); // Hide Stop Button
  continueButton.setVisible(true); // Show Continue Button
}

function continueGame() {
  this.physics.resume(); // Resume the game
  continueButton.setVisible(false); // Hide Continue Button
  stopButton.setVisible(true); // Show Stop Button
}
