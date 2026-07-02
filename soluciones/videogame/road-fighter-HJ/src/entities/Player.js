export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        
        // Add to scene and enable physics
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        // Setup physics properties
        this.body.setCollideWorldBounds(false);
        
        // Initialize player properties
        this.speed = 300;
        this.acceleration = 10;
        this.isAccelerating = false;
        
        // Define road boundaries
        this.roadWidth = 256;
        this.centerX = scene.game.config.width / 2;
        this.leftBoundary = this.centerX - this.roadWidth/2 + 32;  // Add half player width
        this.rightBoundary = this.centerX + this.roadWidth/2 - 32; // Subtract half player width
        
        // Setup input handlers 
        this.setupInputs();
    }

    setupInputs() {
        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    update() {
        this.handleMovement();
        this.clampToRoad();
    }

    handleMovement() {
        // Left-right movement
        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-this.speed);
        } else if (this.cursors.right.isDown) {
            this.body.setVelocityX(this.speed);
        } else {
            this.body.setVelocityX(0);
        }

        // Acceleration
        if (this.cursors.up.isDown) {
            this.isAccelerating = true;
        } else {
            this.isAccelerating = false;
        }
    }

    clampToRoad() {
        // Keep player within road boundaries
        if (this.x < this.leftBoundary) {
            this.x = this.leftBoundary;
            this.body.setVelocityX(0);
        } else if (this.x > this.rightBoundary) {
            this.x = this.rightBoundary;
            this.body.setVelocityX(0);
        }
    }
} 