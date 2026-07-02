export default class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene');
    }

    preload() {
        // Load game assets with correct paths
        this.load.image('player', './assets/images/sprites/player.png');
        this.load.image('enemy-blue', './assets/images/sprites/enemy-blue.png');
        this.load.image('enemy-yellow', './assets/images/sprites/enemy-yellow.png');
        this.load.image('enemy-green', './assets/images/sprites/enemy-green.png');
        this.load.image('road', './assets/images/backgrounds/road.png');
    }

    create() {
        this.scene.start('MenuScene');
    }
} 