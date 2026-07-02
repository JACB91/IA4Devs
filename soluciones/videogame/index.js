    // ============= Configuración del Juego =============
    const CONFIG = {
        canvas: {
            WIDTH: 400,
            HEIGHT: 600
        },
        physics: {
            GRAVITY: 0.5,
            JUMP_FORCE: -12,
            MOVE_SPEED: 5
        },
        entities: {
            PLATFORM: {
                WIDTH: 80,
                HEIGHT: 15,
                GAP: 100
            },
            PLAYER: {
                WIDTH: 28,
                HEIGHT: 28
            },
            ENEMY: {
                WIDTH: 25,
                HEIGHT: 25,
                BASE_SPEED: 2,
                INCREASED_SPEED: 4,
                TOTAL: 15,
                VERTICAL_SPACING: 90
            }
        },
        game: {
            SPEED_INCREASE_SCORE: 10,
            FINAL_SCORE: 15,
            FALL_LIMIT: 10
        }
    };

    // ============= Clases del Juego =============
    class Player {
        constructor() {
            this.x = 100;
            this.y = CONFIG.canvas.HEIGHT - 0;
            this.velocityX = 0;
            this.velocityY = 0;
            this.isJumping = false;
            this.width = CONFIG.entities.PLAYER.WIDTH;
            this.height = CONFIG.entities.PLAYER.HEIGHT;
        }

        update(keys) {
            // Lógica de movimiento del jugador
            this.handleMovement(keys);
            this.applyGravity();
            this.updatePosition();
        }

        handleMovement(keys) {
            if (keys.ArrowLeft) {
                this.velocityX = -CONFIG.physics.MOVE_SPEED;
            } else if (keys.ArrowRight) {
                this.velocityX = CONFIG.physics.MOVE_SPEED;
            } else {
                this.velocityX = 0;
            }
        }

        applyGravity() {
            this.velocityY += this.velocityY > 0 ? 
                CONFIG.physics.GRAVITY * 1.2 : 
                CONFIG.physics.GRAVITY;
        }

        updatePosition() {
            this.x += this.velocityX;
            this.y += this.velocityY;
            
            // Límites de pantalla
            if (this.x < 0) this.x = 0;
            if (this.x + this.width > CONFIG.canvas.WIDTH) {
                this.x = CONFIG.canvas.WIDTH - this.width;
            }
        }

        draw(ctx) {
            ctx.fillStyle = '#E74C3C';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    class Platform {
        constructor(x, y, width = CONFIG.entities.PLATFORM.WIDTH, height = CONFIG.entities.PLATFORM.HEIGHT) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.touched = false;
        }

        draw(ctx) {
            ctx.fillStyle = '#8B4513';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    class Enemy {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.width = CONFIG.entities.ENEMY.WIDTH;
            this.height = CONFIG.entities.ENEMY.HEIGHT;
            this.velocityX = (Math.random() > 0.5 ? 1 : -1) * CONFIG.entities.ENEMY.BASE_SPEED;
        }

        update(score) {
            const currentSpeed = score >= CONFIG.game.SPEED_INCREASE_SCORE ? 
                CONFIG.entities.ENEMY.INCREASED_SPEED : 
                CONFIG.entities.ENEMY.BASE_SPEED;
            
            const direction = this.velocityX > 0 ? 1 : -1;
            this.velocityX = direction * currentSpeed;
            this.x += this.velocityX;

            if (this.x <= 0 || this.x + this.width >= CONFIG.canvas.WIDTH) {
                this.velocityX *= -1;
            }
        }

        draw(ctx) {
            ctx.fillStyle = '#2ECC71';
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    class CollisionManager {
        static checkCollision(rect1, rect2) {
            return rect1.x < rect2.x + rect2.width &&
                   rect1.x + rect1.width > rect2.x &&
                   rect1.y < rect2.y + rect2.height &&
                   rect1.y + rect1.height > rect2.y;
        }

        static handleCollisions(gameManager) {
            // Colisiones con plataformas
            gameManager.platforms.forEach(platform => {
                if (CollisionManager.checkCollision(gameManager.player, platform) && 
                    gameManager.player.velocityY > 0) {
                    gameManager.player.y = platform.y - gameManager.player.height;
                    gameManager.player.velocityY = 0;
                    gameManager.player.isJumping = false;
                }
            });

            // Colisiones con enemigos
            gameManager.enemies.forEach(enemy => {
                if (CollisionManager.checkCollision(gameManager.player, enemy)) {
                    gameManager.gameOver(false);
                }
            });
        }
    }

    class GameManager {
        constructor() {
            this.canvas = document.getElementById('gameCanvas');
            this.ctx = this.canvas.getContext('2d');
            this.setupCanvas();
            
            this.initializeGame();
            this.setupEventListeners();
            
            // Inicializar la posición más alta del jugador
            this.highestPlayerY = this.player.y;
        }

        setupCanvas() {
            this.canvas.width = CONFIG.canvas.WIDTH;
            this.canvas.height = CONFIG.canvas.HEIGHT;
        }

        initializeGame() {
            this.player = new Player();
            this.platforms = [];
            this.enemies = [];
            this.score = 0;
            this.cameraPosY = 0;
            this.isGameOver = false;
            this.keys = {};
            this.animationFrameId = null;

            this.createInitialPlatforms();
            this.createEnemies();
            this.updateScore(0);
            document.getElementById('gameOver').style.display = 'none';

            // Reiniciar la posición más alta al iniciar el juego
            this.highestPlayerY = this.player.y;
        }

        createInitialPlatforms() {
            // Plataforma base
            this.platforms.push(new Platform(0, CONFIG.canvas.HEIGHT, CONFIG.canvas.WIDTH));

            // Plataformas adicionales
            for (let i = 0; i < 25; i++) {
                this.platforms.push(new Platform(
                    Math.random() * (CONFIG.canvas.WIDTH - CONFIG.entities.PLATFORM.WIDTH),
                    CONFIG.canvas.HEIGHT - (i * CONFIG.entities.PLATFORM.GAP) - 100
                ));
            }
        }

        createEnemies() {
            for (let i = 0; i < CONFIG.entities.ENEMY.TOTAL; i++) {
                const enemyY = CONFIG.canvas.HEIGHT - (i * CONFIG.entities.ENEMY.VERTICAL_SPACING) - 100;
                this.enemies.push(new Enemy(
                    Math.random() * (CONFIG.canvas.WIDTH - CONFIG.entities.ENEMY.WIDTH),
                    enemyY
                ));
            }
        }

        update() {
            if (this.isGameOver) return;

            this.player.update(this.keys);
            this.updateCamera();
            this.updatePlatforms();
            this.updateEnemies();
            CollisionManager.handleCollisions(this);
            this.verifyFall();
            // Verificar victoria o derrota
            if (this.score >= CONFIG.game.FINAL_SCORE) {
                this.gameOver(true);
            }

            

        }

        updateCamera() {
            if (this.player.y < CONFIG.canvas.HEIGHT / 2) {
                const diff = CONFIG.canvas.HEIGHT / 2 - this.player.y;
                this.cameraPosY += diff;
                this.player.y += diff;

                this.platforms.forEach(platform => platform.y += diff);
                this.enemies.forEach(enemy => enemy.y += diff);

                this.updateScore(Math.floor(this.cameraPosY / 100));
            }
        }

        updatePlatforms() {
            // Generar nuevas plataformas
            while (this.platforms[this.platforms.length - 1].y > this.cameraPosY) {
                this.platforms.push(new Platform(
                    Math.random() * (CONFIG.canvas.WIDTH - CONFIG.entities.PLATFORM.WIDTH),
                    this.platforms[this.platforms.length - 1].y - CONFIG.entities.PLATFORM.GAP
                ));
            }

            // Eliminar plataformas fuera de vista
            this.platforms = this.platforms.filter(
                platform => platform.y < this.cameraPosY + CONFIG.canvas.HEIGHT + 100
            );
        }

        updateEnemies() {
            this.enemies.forEach(enemy => {
                enemy.update(this.score);
                
                if (enemy.y > this.cameraPosY + CONFIG.canvas.HEIGHT + 100) {
                    enemy.y = this.cameraPosY - CONFIG.entities.ENEMY.VERTICAL_SPACING;
                    enemy.x = Math.random() * (CONFIG.canvas.WIDTH - CONFIG.entities.ENEMY.WIDTH);
                }
            });
        }

        verifyFall() {
            // Actualizar la posición más alta si el jugador ha subido más
            if (this.player.y < this.highestPlayerY) {
                this.highestPlayerY = this.player.y;
            }

            // Calcular la diferencia entre la posición actual y la más alta
            const diferencia = this.player.y - this.highestPlayerY;

            // Verificar si la diferencia excede la mitad de la altura del canvas
            if (diferencia > CONFIG.canvas.HEIGHT / 2) {
                console.log('El jugador ha caído al vacío. Game Over.');
                this.gameOver(false);
            }
        }

        render() {
            // Limpiar canvas
            this.ctx.fillStyle = '#87CEEB';
            this.ctx.fillRect(0, 0, CONFIG.canvas.WIDTH, CONFIG.canvas.HEIGHT);

            // Dibujar elementos
            this.platforms.forEach(platform => platform.draw(this.ctx));
            this.enemies.forEach(enemy => enemy.draw(this.ctx));
            this.player.draw(this.ctx);

            // Dibujar mensaje de estado
            if (this.isGameOver) {
                this.renderGameOverMessage();
            }
        }

        renderGameOverMessage() {
            this.ctx.fillStyle = 'white';
            this.ctx.font = '30px Arial';
            this.ctx.textAlign = 'center';
            const message = this.score >= CONFIG.game.FINAL_SCORE ? '¡Victoria!' : 'Game Over';
            this.ctx.fillText(message, CONFIG.canvas.WIDTH/2, CONFIG.canvas.HEIGHT/2);
        }

        gameLoop() {
            if (!this.isGameOver) {
                this.update();
                this.render();
                this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
            } else {
                if (this.animationFrameId) {
                    cancelAnimationFrame(this.animationFrameId);
                    this.animationFrameId = null;
                }
            }
        }

        updateScore(newScore) {
            this.score = newScore;
            document.getElementById('score').textContent = `Score: ${this.score}`;
        }

        gameOver(isVictory) {
            if (this.isGameOver) return;
            
            this.isGameOver = true;
            this.keys = {};

            if (this.animationFrameId) {
                cancelAnimationFrame(this.animationFrameId);
                this.animationFrameId = null;
            }
            
            const message = isVictory ? 
                "¡Felicitaciones! ¡Has ganado!" : 
                "¡Game Over! Caíste al vacío";
            
            setTimeout(() => {
                if (confirm(message + "\n¿Quieres jugar de nuevo?")) {
                    this.initializeGame();
                    this.isGameOver = false;
                    this.gameLoop();
                }
            }, 100);
        }

        setupEventListeners() {
            document.addEventListener('keydown', (e) => {
                this.keys[e.code] = true;
                if (e.code === 'Space' && !this.player.isJumping) {
                    this.player.velocityY = CONFIG.physics.JUMP_FORCE;
                    this.player.isJumping = true;
                }
            });

            document.addEventListener('keyup', (e) => {
                this.keys[e.code] = false;
            });

            document.getElementById('restartButton').addEventListener('click', () => {
                if (this.animationFrameId) {
                    cancelAnimationFrame(this.animationFrameId);
                }
                this.initializeGame();
                this.isGameOver = false;
                this.gameLoop();
            });
        }

        start() {
            this.gameLoop();
        }
    }

    // ============= Inicialización del Juego =============
    const game = new GameManager();
    game.start();