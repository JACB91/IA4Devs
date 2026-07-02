import config from './config/game-config.js';

class RoadFighter extends Phaser.Game {
    constructor() {
        super(config);
    }
}

window.onload = () => {
    new RoadFighter();
};

export default RoadFighter; 