const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 200;

// Declarar SPRITE globalmente
const SPRITE = new Image();

// Constantes del juego
const GROUND_HEIGHT = 16;
const DINO_WIDTH = 88;
const DINO_HEIGHT = 94;
const JUMP_FORCE = -6.656;
const GRAVITY = 0.32;
const PTERODACTYL_WIDTH = 92;
const PTERODACTYL_HEIGHT = 80;
const SPEED_INCREMENT = 0.003;
const INITIAL_GAME_SPEED = 6;
const MAX_GAME_SPEED = 13;
const SPAWN_INTERVAL = 20;
const SPAWN_CHANCE = 0.8;
const MIN_OBSTACLE_DISTANCE = canvas.width * 0.35;
const MIN_DOUBLE_OBSTACLE_DISTANCE = canvas.width * 0.15;
const DOUBLE_OBSTACLE_SCORE = 1000;
const CLOUD_FREQUENCY = 0.3;
const CLOUD_MIN_SPEED = 1;
const CLOUD_SPEED_MULTIPLIER = 0.2;
const DAY_CYCLE_DURATION = 30000; // 30 segundos por ciclo completo
const DAY_COLOR = { r: 0xf7, g: 0xf7, b: 0xf7 };
const NIGHT_COLOR = { r: 0x1d, g: 0x1d, b: 0x1d };
const NIGHT_TRANSITION_SCORE = 700; // Puntuación donde comienza a anochecer
const FULL_NIGHT_SCORE = 2000; // Puntuación donde es completamente de noche

// Variables globales
let dino;
let obstacles = [];
let clouds = [];
let gameSpeed = 6;
let spawnTimer = 0;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let gameOver = false;
let gameInitialized = false;
let groundX = 0;

// Sprite config
const SPRITE_CONFIG = {
    DINO_IDLE: { x: 1338, y: 2, width: 88, height: 94 },
    DINO_RUNNING: [
        { x: 1338, y: 2, width: 88, height: 94 },
        { x: 1514, y: 2, width: 88, height: 94 }
    ],
    DINO_DUCKING: [
        { x: 1866, y: 36, width: 118, height: 60 },
        { x: 1984, y: 36, width: 118, height: 60 }
    ],
    DINO_DEAD: { x: 1690, y: 2, width: 88, height: 94 },
    CACTUS_SMALL: [
        { x: 446, y: 2, width: 34, height: 70 },
        { x: 480, y: 2, width: 68, height: 70 },
        { x: 548, y: 2, width: 102, height: 70 }
    ],
    CACTUS_LARGE: [
        { x: 652, y: 2, width: 50, height: 100 },
        { x: 702, y: 2, width: 100, height: 100 },
        { x: 802, y: 2, width: 150, height: 100 }
    ],
    PTERODACTYL: [
        { x: 260, y: 2, width: 92, height: 80 },
        { x: 352, y: 2, width: 92, height: 80 }
    ],
    GROUND: { x: 2, y: 104, width: 2400, height: 24 },
    CLOUD: { x: 166, y: 2, width: 46, height: 14 }
};

// Definir las clases primero
class Dino {
    constructor(ctx) {
        this.ctx = ctx;
        this.x = 50;
        this.width = DINO_WIDTH/2;
        this.height = DINO_HEIGHT/2;
        this.baseY = canvas.height - this.height - GROUND_HEIGHT;
        this.y = this.baseY;
        this.velocityY = 0;
        this.jumping = false;
        this.ducking = false;
        this.runningFrame = 0;
        this.frameTime = 0;
        this.normalWidth = DINO_WIDTH/2;
        this.normalHeight = DINO_HEIGHT/2;
        this.duckWidth = SPRITE_CONFIG.DINO_DUCKING[0].width/2;
        this.duckHeight = SPRITE_CONFIG.DINO_DUCKING[0].height/2;
        this.hitboxOffset = {
            x: 5,
            y: 5,
            width: 10,
            height: 10
        };
    }

    jump() {
        if (!this.jumping) {
            this.velocityY = JUMP_FORCE;
            this.jumping = true;
        }
    }

    duck(isDucking) {
        if (this.jumping) return;
        
        if (this.ducking === isDucking) return;
        
        this.ducking = isDucking;
        if (isDucking) {
            this.width = this.duckWidth;
            this.height = this.duckHeight;
            this.y = canvas.height - this.height - GROUND_HEIGHT;
        } else {
            this.width = this.normalWidth;
            this.height = this.normalHeight;
            this.y = this.baseY;
        }
    }

    update() {
        if (this.jumping) {
            this.velocityY += GRAVITY;
            this.y += this.velocityY;

            if (this.y >= this.baseY) {
                this.y = this.baseY;
                this.jumping = false;
                this.velocityY = 0;
            }
        }
    }

    draw() {
        const sprite = this.getSprite();
        const currentTime = performance.now();
        
        if (currentTime - this.frameTime > 100) {
            this.runningFrame = (this.runningFrame + 1) % 2;
            this.frameTime = currentTime;
        }

        this.ctx.drawImage(
            SPRITE,
            sprite.x,
            sprite.y,
            sprite.width,
            sprite.height,
            Math.floor(this.x),
            Math.floor(this.y),
            sprite.width/2,
            sprite.height/2
        );
    }

    getSprite() {
        if (gameOver) {
            return SPRITE_CONFIG.DINO_DEAD;
        }
        if (this.jumping) {
            return SPRITE_CONFIG.DINO_IDLE;
        }
        if (this.ducking) {
            return SPRITE_CONFIG.DINO_DUCKING[this.runningFrame];
        }
        return SPRITE_CONFIG.DINO_RUNNING[this.runningFrame];
    }

    getHitbox() {
        return {
            x: this.x + this.hitboxOffset.x,
            y: this.y + this.hitboxOffset.y,
            width: this.width - this.hitboxOffset.width,
            height: this.height - this.hitboxOffset.height
        };
    }
}

class Obstacle {
    constructor(ctx, type) {
        this.ctx = ctx;
        this.type = type;
        this.x = canvas.width;
        this.frame = 0;
        this.frameTime = 0;

        if (type === 'cactus') {
            const variants = Math.random() > 0.5 ? SPRITE_CONFIG.CACTUS_LARGE : SPRITE_CONFIG.CACTUS_SMALL;
            const variantIndex = Math.floor(Math.random() * variants.length);
            this.sprite = variants[variantIndex];
            this.width = this.sprite.width/2;
            this.height = this.sprite.height/2;
            this.y = canvas.height - this.height - GROUND_HEIGHT;
        } else {
            this.sprite = SPRITE_CONFIG.PTERODACTYL[0];
            this.width = PTERODACTYL_WIDTH/2;
            this.height = PTERODACTYL_HEIGHT/2;
            const heights = [
                canvas.height - GROUND_HEIGHT - this.height - 40,
                canvas.height - GROUND_HEIGHT - this.height - 20,
                canvas.height - GROUND_HEIGHT - this.height
            ];
            this.y = heights[Math.floor(Math.random() * heights.length)];
        }
        this.hitboxOffset = {
            x: type === 'pterodactyl' ? 10 : 5,
            y: type === 'pterodactyl' ? 10 : 5,
            width: type === 'pterodactyl' ? 20 : 10,
            height: type === 'pterodactyl' ? 20 : 10
        };
    }

    update(speed) {
        this.x -= speed;
        if (this.type === 'pterodactyl') {
            this.frameCount++;
            if (this.frameCount % 15 === 0) {
                this.frame = (this.frame + 1) % 2;
            }
        }
    }

    draw() {
        const sprite = this.type === 'pterodactyl' 
            ? SPRITE_CONFIG.PTERODACTYL[this.frame] 
            : this.sprite;

        if (this.type === 'pterodactyl') {
            const currentTime = performance.now();
            if (currentTime - this.frameTime > 200) {
                this.frame = (this.frame + 1) % 2;
                this.frameTime = currentTime;
            }
        }

        this.ctx.drawImage(
            SPRITE,
            sprite.x,
            sprite.y,
            sprite.width,
            sprite.height,
            Math.floor(this.x),
            Math.floor(this.y),
            sprite.width/2,
            sprite.height/2
        );
    }

    getHitbox() {
        return {
            x: this.x + this.hitboxOffset.x,
            y: this.y + this.hitboxOffset.y,
            width: this.width - this.hitboxOffset.width,
            height: this.height - this.hitboxOffset.height
        };
    }
}

class Cloud {
    constructor(ctx) {
        this.ctx = ctx;
        this.sprite = SPRITE_CONFIG.CLOUD;
        this.width = this.sprite.width;
        this.height = this.sprite.height;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height/3);
        this.speed = CLOUD_MIN_SPEED + Math.random() * CLOUD_SPEED_MULTIPLIER;
    }

    update() {
        this.x -= this.speed;
    }

    draw() {
        this.ctx.drawImage(
            SPRITE,
            this.sprite.x,
            this.sprite.y,
            this.sprite.width,
            this.sprite.height,
            Math.floor(this.x),
            Math.floor(this.y),
            this.width,
            this.height
        );
    }
}

// Funciones del juego
function checkCollision(dino, obstacle) {
    const dinoHitbox = dino.getHitbox();
    const obstacleHitbox = obstacle.getHitbox();

    if (obstacle.type === 'pterodactyl') {
        if (dino.ducking) {
            dinoHitbox.height = dinoHitbox.height * 0.5;
        }
    }

    return !(dinoHitbox.x > obstacleHitbox.x + obstacleHitbox.width || 
             dinoHitbox.x + dinoHitbox.width < obstacleHitbox.x || 
             dinoHitbox.y > obstacleHitbox.y + obstacleHitbox.height ||
             dinoHitbox.y + dinoHitbox.height < obstacleHitbox.y);
}

function getDayNightCycle() {
    // Calcular la transición basada en la puntuación
    let transitionProgress = 0;
    
    if (score > NIGHT_TRANSITION_SCORE) {
        transitionProgress = Math.min(1, (score - NIGHT_TRANSITION_SCORE) / (FULL_NIGHT_SCORE - NIGHT_TRANSITION_SCORE));
    }
    
    // Interpolar entre los colores del día y la noche
    const r = Math.floor(lerp(DAY_COLOR.r, NIGHT_COLOR.r, transitionProgress));
    const g = Math.floor(lerp(DAY_COLOR.g, NIGHT_COLOR.g, transitionProgress));
    const b = Math.floor(lerp(DAY_COLOR.b, NIGHT_COLOR.b, transitionProgress));
    
    return `rgb(${r}, ${g}, ${b})`;
}

function lerp(start, end, amount) {
    return start + (end - start) * amount;
}

function draw() {
    // Actualizar solo el color de fondo del canvas
    const backgroundColor = getDayNightCycle();
    canvas.style.backgroundColor = backgroundColor;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dibujar nubes con transparencia
    ctx.globalAlpha = 0.7;
    clouds.forEach(cloud => cloud.draw());
    ctx.globalAlpha = 1.0;
    
    // Dibujar suelo
    const groundSprite = SPRITE_CONFIG.GROUND;
    groundX = (groundX - gameSpeed) % (groundSprite.width/2);
    
    ctx.drawImage(
        SPRITE,
        groundSprite.x,
        groundSprite.y,
        groundSprite.width,
        groundSprite.height,
        Math.floor(groundX),
        canvas.height - groundSprite.height/2,
        groundSprite.width/2,
        groundSprite.height/2
    );
    
    ctx.drawImage(
        SPRITE,
        groundSprite.x,
        groundSprite.y,
        groundSprite.width,
        groundSprite.height,
        Math.floor(groundX + groundSprite.width/2),
        canvas.height - groundSprite.height/2,
        groundSprite.width/2,
        groundSprite.height/2
    );

    // Ajustar el brillo basado en la transición día/noche
    if (score > NIGHT_TRANSITION_SCORE) {
        const nightProgress = Math.min(1, (score - NIGHT_TRANSITION_SCORE) / (FULL_NIGHT_SCORE - NIGHT_TRANSITION_SCORE));
        ctx.filter = `brightness(${lerp(1, 0.8, nightProgress)})`;
    }

    dino.draw();
    obstacles.forEach(obstacle => obstacle.draw());
    
    // Restaurar el filtro
    ctx.filter = 'none';
}

function update() {
    if (gameOver) return;

    score++;
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
    }
    
    document.getElementById('score').innerText = `Puntuación: ${score} - HI: ${highScore}`;

    dino.update();
    
    // Actualizar nubes
    if (Math.random() < CLOUD_FREQUENCY/100) {
        clouds.push(new Cloud(ctx));
    }
    
    clouds = clouds.filter(cloud => {
        cloud.update();
        return cloud.x > -cloud.width;
    });
    
    // Spawn de obstáculos
    spawnTimer++;
    if (spawnTimer > SPAWN_INTERVAL) {
        spawnTimer = 0;
        const lastObstacle = obstacles[obstacles.length - 1];
        
        // Verificar si podemos generar un nuevo obstáculo
        if (!lastObstacle || (canvas.width - lastObstacle.x) >= MIN_OBSTACLE_DISTANCE) {
            if (Math.random() < SPAWN_CHANCE) {
                // Aumentar la probabilidad de pterodáctilos
                const pterodactylChance = Math.min(0.3, (gameSpeed / MAX_GAME_SPEED) + (score / 1000));
                const obstacleType = Math.random() < pterodactylChance ? 'pterodactyl' : 'cactus';
                
                // Crear el nuevo obstáculo
                obstacles.push(new Obstacle(ctx, obstacleType));

                // Posibilidad de generar obstáculos dobles solo después de cierta puntuación
                // y solo si el primer obstáculo es un cactus
                if (score > DOUBLE_OBSTACLE_SCORE && 
                    obstacleType === 'cactus' && 
                    Math.random() < 0.2) { // Reducida la probabilidad de 0.3 a 0.2
                    
                    // Asegurarse de que el segundo obstáculo sea alcanzable
                    const secondObstacleDelay = 600; // Aumentado de 500 a 600ms
                    setTimeout(() => {
                        if (!gameOver) {
                            // El segundo obstáculo siempre será un cactus
                            const newObstacle = new Obstacle(ctx, 'cactus');
                            // Ajustar la posición X del nuevo obstáculo
                            newObstacle.x = canvas.width + MIN_DOUBLE_OBSTACLE_DISTANCE;
                            obstacles.push(newObstacle);
                        }
                    }, secondObstacleDelay);
                }
            }
        }
    }

    // Actualizar obstáculos
    obstacles = obstacles.filter(obstacle => {
        obstacle.update(gameSpeed);
        // Eliminar obstáculos que ya salieron de la pantalla
        return obstacle.x > -obstacle.width;
    });

    // Detectar colisiones
    obstacles.forEach(obstacle => {
        if (checkCollision(dino, obstacle)) {
            gameOver = true;
            document.getElementById('game-over').classList.remove('hidden');
        }
    });

    // Incremento de velocidad más agresivo
    if (score > 100) {
        const speedMultiplier = Math.min(score / 1000, 1); // Factor basado en la puntuación
        const baseIncrement = SPEED_INCREMENT * (1.2 - (gameSpeed / MAX_GAME_SPEED));
        const finalIncrement = baseIncrement * (1 + speedMultiplier);
        
        if (gameSpeed < MAX_GAME_SPEED) {
            gameSpeed += finalIncrement;
        }
    }
}

let lastTime = 0;
function gameLoop(timestamp) {
    if (gameOver) return;
    
    if (timestamp - lastTime >= 1000/60) {
        update();
        draw(timestamp);  // Pasar el timestamp a la función draw
        lastTime = timestamp;
    }
    
    requestAnimationFrame(gameLoop);
}

function startGame() {
    dino = new Dino(ctx);
    obstacles = [];
    clouds = []; // Limpiar las nubes
    gameSpeed = INITIAL_GAME_SPEED;
    score = 0;
    gameOver = false;
    document.getElementById('game-over').classList.add('hidden');
    gameLoop();
}

function initGame() {
    SPRITE.src = './assets/sprite.png';
    
    SPRITE.onload = () => {
        console.log('Sprite cargado correctamente');
        if (!gameInitialized) {
            gameInitialized = true;
            startGame();
        }
    };

    SPRITE.onerror = () => {
        console.error('Error al cargar el sprite');
    };
}

// Event Listeners
window.addEventListener('keydown', (event) => {
    if ((event.code === 'Space' || event.code === 'ArrowUp') && !gameOver) {
        event.preventDefault();
        dino.jump();
    } else if (event.code === 'ArrowDown' && !dino.jumping) {
        event.preventDefault();
        dino.duck(true);
    }
});

window.addEventListener('keyup', (event) => {
    if (event.code === 'ArrowDown' && !dino.jumping) {
        dino.duck(false);
    }
    if (event.code === 'Space' && gameOver) {
        startGame();
    }
});

canvas.addEventListener('touchstart', (event) => {
    event.preventDefault();
    if (!gameOver) {
        dino.jump();
    } else {
        startGame();
    }
});

// Iniciar el juego
window.onload = initGame;
