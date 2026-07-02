class Ghost {
    constructor(scene, x, y, texture) {
        this.sprite = scene.physics.add.sprite(x, y, texture);
        this.sprite.setDisplaySize(50, 50); // Adjust size as needed
        this.sprite.setCollideWorldBounds(true);
        scene.physics.add.collider(this.sprite, scene.walls);
        this.direction = Phaser.Math.Between(0, 3); // Initialize direction
    }

    move() {
        const speed = 100; // Speed of the ghost
        let newX = this.sprite.x;
        let newY = this.sprite.y;

        // Calculate new position based on current direction
        switch (this.direction) {
            case 0: // Move left
                newX -= speed * this.sprite.scene.game.loop.delta / 1000;
                break;
            case 1: // Move right
                newX += speed * this.sprite.scene.game.loop.delta / 1000;
                break;
            case 2: // Move up
                newY -= speed * this.sprite.scene.game.loop.delta / 1000;
                break;
            case 3: // Move down
                newY += speed * this.sprite.scene.game.loop.delta / 1000;
                break;
        }

        // Debugging: Log new positions
        console.log(`New Position: (${newX}, ${newY})`);

        // Calculate tile indices
        const tileX = Math.floor(newX / this.sprite.scene.tileSize);
        const tileY = Math.floor(newY / this.sprite.scene.tileSize);

        // Debugging: Log tile indices
        console.log(`Tile Indices: (${tileX}, ${tileY})`);

        // Ensure the new position is within bounds and not colliding with walls
        if (this.sprite.scene.maze[tileY] && this.sprite.scene.maze[tileY][tileX] !== undefined) {
            if (this.sprite.scene.maze[tileY][tileX] === 0) {
                this.sprite.setPosition(newX, newY);
            } else {
                // Change direction if the new position is invalid
                this.direction = Phaser.Math.Between(0, 3);
            }
        } else {
            // Change direction if the tile indices are out of bounds
            this.direction = Phaser.Math.Between(0, 3);
        }

        // Randomly change direction every few frames
        if (Phaser.Math.Between(0, 100) < 1) { // 1% chance to change direction
            this.direction = Phaser.Math.Between(0, 3);
        }
    }
}

export default Ghost; 