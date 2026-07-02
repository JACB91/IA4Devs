import BaseScene from './BaseScene.js';
import Player from '../entities/Player.js';
import RoadManager from '../services/RoadManager.js';
import EnemyManager from '../services/EnemyManager.js';

export default class GameScene extends BaseScene {
    constructor() {
        super('GameScene');
    }

    create() {
        super.create();
        
        // Stop UI scene if it's running
        if (this.scene.isActive('UIScene')) {
            this.scene.stop('UIScene');
        }
        
        // Reset score when starting new game
        this.game.events.emit('resetScore');
        
        // Initialize managers
        this.roadManager = new RoadManager(this);
        this.enemyManager = new EnemyManager(this);
        
        // Create player
        this.player = new Player(this, this.screenCenter[0], 500);
        
        // Setup collisions
        this.setupCollisions();
        
        // Launch UI scene
        this.scene.launch('UIScene');
        
        // Start game loop
        this.startGameLoop();
    }

    setupCollisions() {
        this.physics.add.collider(
            this.player, 
            this.enemyManager.getEnemyGroup(),
            this.handleCollision,
            null,
            this
        );
    }

    handleCollision(player, enemy) {
        // Game over logic here
        this.scene.start('GameOverScene');
    }

    startGameLoop() {
        // Game loop logic
    }

    update(time, delta) {
        this.player.update();
        this.roadManager.update(delta);
        this.enemyManager.update(delta);
    }
} 