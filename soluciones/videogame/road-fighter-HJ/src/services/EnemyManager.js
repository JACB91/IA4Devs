import Enemy from '../entities/Enemy.js';

export default class EnemyManager {
    constructor(scene) {
        this.scene = scene;
        this.enemies = this.scene.add.group();
        this.spawnTimer = 0;
        this.spawnInterval = 2000; // 2 seconds
        this.baseSpeed = 200;      // Base enemy speed
        this.speedMultiplier = 1;  // Speed multiplier
        
        // Define road boundaries
        this.roadWidth = 256;
        this.centerX = scene.game.config.width / 2;
        this.leftBoundary = this.centerX - this.roadWidth/2;
        this.rightBoundary = this.centerX + this.roadWidth/2;

        // Listen for speed increase events
        this.scene.game.events.on('increaseSpeed', this.increaseSpeed, this);
    }

    increaseSpeed = () => {
        this.speedMultiplier += 0.2;  // Increase speed by 20%
        this.spawnInterval = Math.max(500, this.spawnInterval - 200); // Decrease spawn interval
    }

    getEnemyGroup() {
        return this.enemies;
    }

    spawnEnemy() {
        const x = Phaser.Math.Between(
            this.leftBoundary + 32,
            this.rightBoundary - 32
        );
        const enemy = new Enemy(this.scene, x, -50);
        enemy.speed = this.baseSpeed * this.speedMultiplier; // Apply current speed
        this.enemies.add(enemy);
    }

    update(delta) {
        this.spawnTimer += delta;
        
        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnEnemy();
            this.spawnTimer = 0;
        }

        this.enemies.children.each(enemy => {
            if (enemy.active) {
                enemy.update();
            } else {
                this.enemies.remove(enemy, true, true);
            }
        });
    }
} 