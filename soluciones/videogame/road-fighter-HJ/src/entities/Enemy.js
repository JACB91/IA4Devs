export default class Enemy extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        // Pick a random color for the enemy
        const colors = ['blue', 'yellow', 'green'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        super(scene, x, y, `enemy-${randomColor}`);
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.speed = 200;
        this.hasScored = false;  // Track if this enemy has been scored
    }

    update() {
        this.y += this.speed * this.scene.game.loop.delta / 1000;
        
        // Check if enemy has passed the player and hasn't been scored yet
        if (!this.hasScored && this.y > this.scene.player.y) {
            this.hasScored = true;
            this.scene.game.events.emit('addScore', 10);
        }
        
        // Remove enemy when it goes off screen
        if (this.y > this.scene.game.config.height + 50) {
            this.destroy();
        }
    }
} 