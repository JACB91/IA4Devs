const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'gameContainer',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            checkCollision: {
                up: true,
                down: true,
                left: true,
                right: true
            }
        }
    }
};

let game;
let player, opponent, ball;
let cursors;
let playerScore = 0;
let opponentScore = 0;
let scoreText;

// Match settings
let maxGoals;
let difficulty;

// Difficulty settings
let aiSpeed, ballSpeed;
let predictedBallPosition;
let reactionTime;

function startGame() {
    console.log("Starting game...");

    // Get settings from the menu
    maxGoals = parseInt(document.getElementById('maxGoals').value);
    difficulty = document.getElementById('difficulty').value;

    // Hide the menu and show the game UI
    document.getElementById('menu').style.display = 'none';
    document.getElementById('gameUI').style.display = 'flex';

    // Initialize the game
    game = new Phaser.Game(config);
    console.log("Game initialized.");
}

function preload() {
    // No assets to load since we're using simple shapes
}

function create() {
    console.log("Create function started");

    // Set difficulty parameters
    switch (difficulty) {
        case 'slow':
            aiSpeed = 4;
            ballSpeed = 400;
            reactionTime = 0.5;
            break;
        case 'medium':
            aiSpeed = 5;
            ballSpeed = 550;
            reactionTime = 0.7;
            break;
        case 'fast':
            aiSpeed = 6;
            ballSpeed = 700;
            reactionTime = 0.9;
            break;
        default:
            aiSpeed = 5;
            ballSpeed = 550;
            reactionTime = 0.7;
    }

    // Create a simple table
    this.add.rectangle(400, 300, 780, 580, 0x008000); // Green table

    // Create goals with a distinct color and wider size
    const playerGoal = this.add.rectangle(400, 590, 400, 20, 0xffd700); // Wider gold color for player's goal
    const opponentGoal = this.add.rectangle(400, 10, 400, 20, 0xffd700); // Wider gold color for opponent's goal

    // Create side walls
    const playerWallLeft = this.add.rectangle(100, 590, 200, 20, 0x000000);
    const playerWallRight = this.add.rectangle(700, 590, 200, 20, 0x000000);
    const opponentWallLeft = this.add.rectangle(100, 10, 200, 20, 0x000000);
    const opponentWallRight = this.add.rectangle(700, 10, 200, 20, 0x000000);

    // Enable physics for goals and walls
    this.physics.add.existing(playerGoal, true);
    this.physics.add.existing(opponentGoal, true);
    this.physics.add.existing(playerWallLeft, true);
    this.physics.add.existing(playerWallRight, true);
    this.physics.add.existing(opponentWallLeft, true);
    this.physics.add.existing(opponentWallRight, true);

    // Create player
    player = this.add.rectangle(400, 550, 100, 20, 0xff0000); // Red player
    this.physics.add.existing(player);
    player.body.setImmovable(true);

    // Create opponent
    opponent = this.add.rectangle(400, 50, 100, 20, 0x0000ff); // Blue opponent
    this.physics.add.existing(opponent);
    opponent.body.setImmovable(true);

    // Create ball
    ball = this.add.circle(400, 300, 10, 0xffff00); // Yellow ball
    this.physics.add.existing(ball);
    ball.body.setCollideWorldBounds(true);
    ball.body.setBounce(1);
    ball.body.setVelocity(ballSpeed, ballSpeed);

    // Enable keyboard input
    cursors = this.input.keyboard.createCursorKeys();

    // Add collision detection
    this.physics.add.collider(ball, player, hitPlayer, null, this);
    this.physics.add.collider(ball, opponent, hitOpponent, null, this);
    this.physics.add.collider(ball, playerWallLeft);
    this.physics.add.collider(ball, playerWallRight);
    this.physics.add.collider(ball, opponentWallLeft);
    this.physics.add.collider(ball, opponentWallRight);

    // Check for scoring
    this.physics.add.overlap(ball, playerGoal, () => {
        opponentScore++;
        resetBall();
    }, null, this);

    this.physics.add.overlap(ball, opponentGoal, () => {
        playerScore++;
        resetBall();
    }, null, this);

    // Create score text
    scoreText = this.add.text(400, 16, 'Player: 0 - Opponent: 0', { fontSize: '32px', fill: '#fff' });
    scoreText.setOrigin(0.5, 0); // Center the text horizontally

    resetBall();

    console.log("Create function completed");
}

function update() {
    // Player movement logic with reduced speed
    if (cursors.left.isDown) {
        player.x -= 5;
    } else if (cursors.right.isDown) {
        player.x += 5;
    }

    // Ensure player stays within table bounds
    player.x = Phaser.Math.Clamp(player.x, 50, 750);

    // Improved AI movement
    if (ball.body.velocity.y < 0) { // Ball is moving towards AI
        // Predict where the ball will intersect with AI's y position
        predictedBallPosition = ball.x + (ball.body.velocity.x * (opponent.y - ball.y) / Math.abs(ball.body.velocity.y));
        
        // Add some randomization based on difficulty
        predictedBallPosition += (1 - reactionTime) * (Math.random() * 100 - 50);
        
        // Clamp the predicted position within bounds
        predictedBallPosition = Phaser.Math.Clamp(predictedBallPosition, 50, 750);
        
        // Move towards predicted position
        if (predictedBallPosition < opponent.x - 10) {
            opponent.x -= aiSpeed;
        } else if (predictedBallPosition > opponent.x + 10) {
            opponent.x += aiSpeed;
        }
    } else {
        // Return to center when ball is moving away
        if (Math.abs(opponent.x - 400) > 50) {
            if (opponent.x < 400) {
                opponent.x += aiSpeed * 0.5;
            } else {
                opponent.x -= aiSpeed * 0.5;
            }
        }
    }

    // Update score text
    document.getElementById('scoreboard').innerText = `Player: ${playerScore} - Opponent: ${opponentScore}`;

    // Check for game over
    if (playerScore >= maxGoals || opponentScore >= maxGoals) {
        this.scene.pause();
        const winner = playerScore >= maxGoals ? 'Player' : 'Opponent';
        document.getElementById('scoreboard').innerText = `Game Over! ${winner} wins!`;
    }
}

function hitPlayer(ball, player) {
    ball.body.setVelocityY(-ballSpeed);
}

function hitOpponent(ball, opponent) {
    ball.body.setVelocityY(ballSpeed);
}

function resetBall() {
    ball.setPosition(400, 300);
    
    // Random initial direction (up or down)
    const randomDirection = Math.random() < 0.5 ? -1 : 1;
    
    // Random angle between -45 and 45 degrees
    const randomAngle = (Math.random() * 90 - 45) * Math.PI / 180;
    
    // Calculate velocity components
    const velocityX = Math.sin(randomAngle) * ballSpeed;
    const velocityY = Math.cos(randomAngle) * ballSpeed * randomDirection;
    
    // Set the ball's velocity
    ball.body.setVelocity(velocityX, velocityY);
}

function pauseGame() {
    if (game && game.scene.scenes[0]) {
        game.scene.scenes[0].scene.pause();
        game.scene.scenes[0].physics.pause();
        document.getElementById('pauseButton').style.display = 'none';
        document.getElementById('resumeButton').style.display = 'inline-block';
        console.log("Game paused.");
    }
}

function resumeGame() {
    if (game && game.scene.scenes[0]) {
        game.scene.scenes[0].scene.resume();
        game.scene.scenes[0].physics.resume();
        document.getElementById('pauseButton').style.display = 'inline-block';
        document.getElementById('resumeButton').style.display = 'none';
        console.log("Game resumed.");
    }
}

function quitGame() {
    if (game) {
        game.destroy(true);
        game = null;
    }
    playerScore = 0;
    opponentScore = 0;
    document.getElementById('gameUI').style.display = 'none';
    document.getElementById('menu').style.display = 'block';
    document.getElementById('scoreboard').innerText = 'Player: 0 - Opponent: 0';
    console.log("Game quit and reset.");
} 