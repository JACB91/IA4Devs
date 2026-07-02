export default class BaseScene extends Phaser.Scene {
    constructor(key) {
        super(key);
        this.screenCenter = null;
    }

    create() {
        // Set screen center after scene is created and we have access to game config
        this.screenCenter = [
            this.game.config.width / 2,
            this.game.config.height / 2
        ];
    }
} 