export default class UIScene extends Phaser.Scene {
    constructor() {
        super('UIScene');
        this.score = 0;
        this.lastSpeedIncrement = 0;  // Track last speed increase threshold
    }

    create() {
        // Create score text
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            fill: '#fff'
        });

        // Remove any existing listeners before adding new ones
        this.game.events.removeListener('addScore');
        this.game.events.removeListener('resetScore');

        // Listen for score events from GameScene
        this.game.events.on('addScore', this.updateScore, this);
        
        // Listen for game restart
        this.game.events.on('resetScore', this.resetScore, this);
    }

    updateScore(points) {
        this.score += points;
        this.scoreText.setText('Score: ' + this.score);

        // Check if we've reached a new speed threshold (every 30 points)
        const speedThreshold = Math.floor(this.score / 30);
        if (speedThreshold > this.lastSpeedIncrement) {
            this.lastSpeedIncrement = speedThreshold;
            this.game.events.emit('increaseSpeed');
        }
    }

    resetScore() {
        this.score = 0;
        this.lastSpeedIncrement = 0;
        this.scoreText.setText('Score: 0');
    }

    shutdown() {
        // Clean up listeners when scene shuts down
        this.game.events.removeListener('addScore');
        this.game.events.removeListener('resetScore');
    }
} 