class Player {
    constructor(scene, x, y) {
        this.sprite = scene.physics.add.sprite(x, y, 'pacman');
        this.sprite.setDisplaySize(50, 50); // Adjust size as needed
        this.sprite.setTint(0xffff00);
        this.sprite.body.setCollideWorldBounds(true);
        this.scene = scene;
    }

    update(cursors) {
        this.sprite.setVelocity(0);

        if (cursors.left.isDown) {
            this.sprite.setVelocityX(-150);
        } else if (cursors.right.isDown) {
            this.sprite.setVelocityX(150);
        }

        if (cursors.up.isDown) {
            this.sprite.setVelocityY(-150);
        } else if (cursors.down.isDown) {
            this.sprite.setVelocityY(150);
        }
    }

    collectPellet(pellet) {
        if (pellet.name === 'cornerPellet') {
            this.scene.score += 5; // Increase score by 5 for larger pellets
        } else {
            this.scene.score += 1; // Increase score by 1 for normal pellets
        }
        pellet.destroy(); // Remove the pellet from the scene
        this.scene.scoreLabel.setText('Score: ' + this.scene.score); // Update the score label

        // Alternate Pacman's image
        if (this.sprite.texture.key === 'pacman') {
            this.sprite.setTexture('pacmanEat'); // Change to pacmanEat image
        } else {
            this.sprite.setTexture('pacman'); // Change back to pacman image
        }
    }
}

export default Player; 