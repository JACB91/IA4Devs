export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    create() {
        const text = this.add.text(400, 300, 'Game Over\nPress SPACE to Restart', {
            fontSize: '32px',
            fill: '#fff',
            align: 'center'
        }).setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('GameScene');
        });
    }
} 