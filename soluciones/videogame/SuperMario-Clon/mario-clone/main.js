const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let player;
let cursors;
let platforms;
let enemies;
let stars;
let score = 0;
let scoreText;
let gameOver = false;
let currentLevel = 1;
let totalStarsInLevel = 0;
let starsCollected = 0;

// Ajustar la fuerza de salto en las constantes del juego
const JUMP_VELOCITY = -400;  // Más fuerza de salto
const MAX_PLATFORM_HEIGHT_DIFF = 150;  // Máxima diferencia de altura entre plataformas

function preload() {
    // Cargar assets
    this.load.image('mario', 'assets/images/mario.png');
    this.load.image('enemy', 'assets/images/enemy.png');
    this.load.image('star', 'assets/images/star.png');
}

function createPlatform(scene, x, y, width, height) {
    const platform = scene.add.rectangle(x, y, width, height, 0x006400); // Verde oscuro
    scene.physics.add.existing(platform, true);
    return platform;
}

function createStar(scene, x, y) {
    const star = stars.create(x, y, 'star');
    star.setBounceY(0.2);
    star.setScale(0.5);
    return star;
}

function createEnemy(scene, x, y) {
    const enemy = scene.physics.add.sprite(x, y, 'enemy');
    enemy.setBounce(0);
    enemy.setCollideWorldBounds(true);
    enemy.direction = 1;
    enemy.moveSpeed = 100;
    enemy.setScale(1);
    enemy.body.setSize(20, 20);
    return enemy;
}

function collectStar(player, star) {
    star.disableBody(true, true);
    starsCollected++;
    score += 10;
    scoreText.setText('Score: ' + score);
    
    checkLevelComplete.call(this);
}

function generatePlatformConfigs() {
    const configs = [];
    const minPlatforms = 4 + Math.floor(currentLevel/2);
    const maxPlatforms = 6 + Math.floor(currentLevel/2);
    const numPlatforms = Phaser.Math.Between(minPlatforms, maxPlatforms);

    // Plataforma base siempre presente
    configs.push({ x: 400, y: 568, width: 800, height: 64 });

    // Generar plataformas flotantes de manera escalonada
    let lastY = 500; // Altura inicial para plataformas
    let lastX = 100; // Posición X inicial

    for (let i = 0; i < numPlatforms; i++) {
        const width = Phaser.Math.Between(100, 200);
        
        // Calcular nueva posición Y (altura) asegurando que sea alcanzable
        const minY = Math.max(150, lastY - MAX_PLATFORM_HEIGHT_DIFF);
        const maxY = lastY - 60; // Asegurar que cada plataforma esté más alta que la anterior
        const y = Phaser.Math.Between(minY, maxY);

        // Calcular posición X alternando lados y asegurando que sea alcanzable
        const minX = Math.max(width/2, lastX - 200);
        const maxX = Math.min(800 - width/2, lastX + 200);
        const x = i % 2 === 0 ? 
            Phaser.Math.Between(minX, lastX) :
            Phaser.Math.Between(lastX, maxX);

        configs.push({ x, y, width, height: 20 });
        
        lastY = y;
        lastX = x;
    }

    return configs;
}

function generateEnemyPositions(platformConfigs) {
    const positions = [];
    const numEnemies = Math.min(3 + Math.floor(currentLevel/2), 8); // Más enemigos por nivel

    // Excluir la plataforma base (índice 0)
    for (let i = 0; i < numEnemies; i++) {
        const platform = platformConfigs[Phaser.Math.Between(1, platformConfigs.length - 1)];
        const x = Phaser.Math.Between(
            platform.x - platform.width/2 + 20,
            platform.x + platform.width/2 - 20
        );
        positions.push({ x, y: platform.y - 20 });
    }

    return positions;
}

function checkLevelComplete() {
    if (starsCollected >= totalStarsInLevel) {
        currentLevel++;
        startNewLevel.call(this);
    }
}

function startNewLevel() {
    // Limpiar elementos existentes
    platforms.clear(true, true);
    stars.clear(true, true);
    enemies.clear(true, true);
    starsCollected = 0;

    // Generar nuevo nivel con validación
    let platformConfigs;
    let attempts = 0;
    const maxAttempts = 5;

    do {
        platformConfigs = generatePlatformConfigs();
        attempts++;
    } while (!validatePlatformLayout(platformConfigs) && attempts < maxAttempts);

    // Crear plataformas
    platformConfigs.forEach(config => {
        const platform = createPlatform(this, config.x, config.y, config.width, config.height);
        platforms.add(platform);
    });

    // Crear estrellas
    platformConfigs.forEach(platform => {
        const numStars = Phaser.Math.Between(2, 4);
        for (let i = 0; i < numStars; i++) {
            const x = platform.x - platform.width/2 + (platform.width/(numStars-1)) * i;
            createStar(this, x, platform.y - 50);
        }
    });

    // Actualizar total de estrellas
    totalStarsInLevel = stars.countActive();

    // Crear enemigos
    const enemyPositions = generateEnemyPositions(platformConfigs);
    enemyPositions.forEach(pos => {
        const enemy = createEnemy(this, pos.x, pos.y);
        enemies.add(enemy);
    });

    // Actualizar texto de nivel con mejor estilo y posición
    if (this.levelText) this.levelText.destroy();
    this.levelText = this.add.text(650, 16, `Nivel: ${currentLevel}`, {
        fontSize: '28px',
        fill: '#FFF',
        fontFamily: 'Arial',
        backgroundColor: '#000033',
        padding: { x: 10, y: 5 },
        borderRadius: 5
    }).setScrollFactor(0);

    // Reposicionar jugador
    player.setPosition(100, 450);
    player.setVelocity(0, 0);
    player.clearTint();
}

// Añadir función de validación de layout
function validatePlatformLayout(configs) {
    for (let i = 1; i < configs.length; i++) {
        const current = configs[i];
        const previous = configs[i-1];
        
        // Verificar que la distancia horizontal es alcanzable
        const horizontalDist = Math.abs(current.x - previous.x);
        const verticalDist = previous.y - current.y;
        
        // Fórmula simple para verificar si el salto es posible
        const maxJumpDistance = 200; // Distancia máxima de salto horizontal
        const maxJumpHeight = 150;   // Altura máxima de salto
        
        if (horizontalDist > maxJumpDistance || verticalDist > maxJumpHeight) {
            return false;
        }
    }
    return true;
}

function create() {
    // Crear fondo nocturno
    this.add.rectangle(400, 300, 800, 600, 0x000033); // Azul muy oscuro
    
    // Añadir estrellas decorativas (no coleccionables) al fondo
    for (let i = 0; i < 50; i++) {
        const x = Phaser.Math.Between(0, 800);
        const y = Phaser.Math.Between(0, 400);
        const star = this.add.circle(x, y, 1, 0xFFFFFF);
        star.setAlpha(Phaser.Math.FloatBetween(0.2, 1));
    }

    // Crear degradado en la parte inferior
    const gradient = this.add.graphics();
    gradient.fillGradientStyle(0x0000FF, 0x0000FF, 0x000033, 0x000033, 1);
    gradient.fillRect(0, 400, 800, 200);

    // Inicializar grupos
    platforms = this.physics.add.staticGroup();
    stars = this.physics.add.group();
    enemies = this.physics.add.group();

    // Crear jugador
    player = this.physics.add.sprite(100, 450, 'mario');
    player.setBounce(0.1);
    player.setCollideWorldBounds(true);
    player.body.setSize(20, 30);
    player.setScale(1.5);

    // Añadir score con estilo mejorado
    scoreText = this.add.text(16, 16, 'Score: 0', { 
        fontSize: '28px',
        fill: '#FFF',
        fontFamily: 'Arial',
        backgroundColor: '#000033',
        padding: { x: 10, y: 5 },
        borderRadius: 5
    }).setScrollFactor(0);

    // Configurar colisiones
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(enemies, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(player, enemies, handlePlayerEnemyCollision, null, this);
    this.physics.add.overlap(player, stars, collectStar, null, this);

    // Configurar controles
    cursors = this.input.keyboard.createCursorKeys();

    // Iniciar primer nivel
    startNewLevel.call(this);
}

function update() {
    if (gameOver) {
        return;
    }

    const onGround = player.body.touching.down;

    // Movimiento horizontal del jugador
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.setFlipX(true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.setFlipX(false);
    } else {
        player.setVelocityX(0);
    }

    // Sistema de salto mejorado
    if (cursors.up.isDown) {
        if (onGround) {
            player.setVelocityY(JUMP_VELOCITY);
        } else if (player.body.velocity.y > -50) {
            // Permite un poco más de altura si se mantiene presionado
            player.setVelocityY(player.body.velocity.y * 0.95);
        }
    }

    // Caída más rápida cuando se suelta el botón de salto
    if (!cursors.up.isDown && player.body.velocity.y < 0) {
        player.setVelocityY(player.body.velocity.y * 0.8);
    }

    // Actualizar movimiento de enemigos
    enemies.children.iterate(function (enemy) {
        if (enemy.body.blocked.right) {
            enemy.direction = -1;
            enemy.setFlipX(true);
        } else if (enemy.body.blocked.left) {
            enemy.direction = 1;
            enemy.setFlipX(false);
        }
        enemy.body.setVelocityX(enemy.moveSpeed * enemy.direction);
    });
}

function handlePlayerEnemyCollision(player, enemy) {
    if (!gameOver) {
        gameOver = true;
        player.setTint(0xff0000);
        player.setTexture('mario');
        player.setVelocity(0, 0);
        
        this.add.text(400, 300, 'Game Over\nClick para reiniciar', {
            fontSize: '32px',
            fill: '#fff',
            align: 'center'
        }).setOrigin(0.5);

        this.input.on('pointerdown', () => {
            gameOver = false;
            this.scene.restart();
        });
    }
}