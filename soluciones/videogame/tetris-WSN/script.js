document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const pauseButton = document.getElementById('pause-button');
    const resetButton = document.getElementById('reset-button');
    const board = document.getElementById('game-board');
    const scoreDisplay = document.getElementById('score');
    const levelDisplay = document.getElementById('level');
    const levelGoalDisplay = document.getElementById('level-goal');

    let gameInterval;
    let isPaused = false;
    let currentPiece;
    let score = 0;
    let pieceQueue = [];
    let currentLevel = 1;

    startButton.addEventListener('click', startGame);
    pauseButton.addEventListener('click', pauseGame);
    resetButton.addEventListener('click', resetGame);

    function startGame() {
        if (!gameInterval) {
            currentPiece = getRandomPiece();
            gameInterval = setInterval(moveDown, GAME_LEVELS[currentLevel].speed);
            drawPiece();
            
            // Ocultar botón de inicio
            startButton.classList.add('hidden');
            
            // Actualizar estados de botones
            startButton.disabled = true;
            startButton.classList.add('disabled');
            pauseButton.classList.add('active');
            resetButton.classList.add('active');
        }
    }

    function pauseGame() {
        if (isPaused) {
            let currentSpeed = GAME_LEVELS[currentLevel].speed;
            gameInterval = setInterval(moveDown, currentSpeed);
            pauseButton.textContent = 'Pausar';
            pauseButton.classList.remove('continue');
            pauseButton.classList.add('active');  // Vuelve a rojo
        } else {
            clearInterval(gameInterval);
            pauseButton.textContent = 'Continuar';
            pauseButton.classList.remove('active');
            pauseButton.classList.add('continue');  // Cambia a verde
        }
        isPaused = !isPaused;
    }

    function resetGame() {
        clearInterval(gameInterval);
        gameInterval = null;
        board.innerHTML = '';
        currentPiece = null;
        isPaused = false;
        score = 0;
        currentLevel = 1;
        scoreDisplay.textContent = '0';
        levelDisplay.textContent = '1';
        levelGoalDisplay.textContent = GAME_LEVELS[1].goal;
        pieceQueue = [];
        boardState = Array.from({ length: 20 }, () => Array(10).fill(null));
        
        // Mostrar botón de inicio y restablecer estados
        startButton.classList.remove('hidden');
        startButton.disabled = false;
        startButton.classList.remove('disabled');
        pauseButton.classList.remove('active');
        pauseButton.classList.remove('continue');  // Asegurarse de remover la clase continue
        resetButton.classList.remove('active');
        pauseButton.textContent = 'Pausar';
        
        for (let i = 1; i <= 3; i++) {
            document.getElementById(`next-${i}`).innerHTML = '';
        }
        
        // Restaurar color de fondo inicial
        updateBackgroundColor(1);
    }

    function moveDown() {
        if (!checkCollision({ x: currentPiece.position.x, y: currentPiece.position.y + 1 }, currentPiece.shape)) {
            currentPiece.position.y += 1;
            drawPiece();
        } else {
            // Fijar la pieza en el tablero
            currentPiece.shape.forEach(([x, y]) => {
                const boardX = currentPiece.position.x + x;
                const boardY = currentPiece.position.y + y;
                boardState[boardY][boardX] = currentPiece.type;
            });

            // Verificar y eliminar líneas completas
            checkLines();

            // Generar una nueva pieza
            currentPiece = getRandomPiece();
            drawPiece();

            // Verificar si el juego ha terminado
            if (checkCollision(currentPiece.position, currentPiece.shape)) {
                alert('Game Over');
                resetGame();
                return;
            }
        }
    }

    function drawPiece() {
        board.innerHTML = ''; // Limpiar el tablero antes de dibujar
        
        // Dibujar las piezas fijadas
        boardState.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value) {
                    const block = document.createElement('div');
                    block.style.gridRowStart = y + 1;
                    block.style.gridColumnStart = x + 1;
                    block.classList.add('block');
                    block.style.backgroundColor = pieceColors[value];
                    board.appendChild(block);
                }
            });
        });

        // Dibujar la pieza actual
        currentPiece.shape.forEach(([x, y]) => {
            const block = document.createElement('div');
            block.style.gridRowStart = currentPiece.position.y + y + 1;
            block.style.gridColumnStart = currentPiece.position.x + x + 1;
            block.classList.add('block');
            block.style.backgroundColor = pieceColors[currentPiece.type];
            board.appendChild(block);
        });
    }

    // Definición de las formas de las piezas
    const pieces = {
        I: [
            [0, 1], [1, 1], [2, 1], [3, 1]
        ],
        J: [
            [0, 0], [0, 1], [1, 1], [2, 1]
        ],
        L: [
            [2, 0], [0, 1], [1, 1], [2, 1]
        ],
        O: [
            [1, 0], [2, 0], [1, 1], [2, 1]
        ],
        S: [
            [1, 0], [2, 0], [0, 1], [1, 1]
        ],
        T: [
            [1, 0], [0, 1], [1, 1], [2, 1]
        ],
        Z: [
            [0, 0], [1, 0], [1, 1], [2, 1]
        ]
    };

    // Agregar después de la definición de pieces
    const pieceColors = {
        I: '#00f0f0', // Cyan
        J: '#0000f0', // Azul
        L: '#f0a000', // Naranja
        O: '#f0f000', // Amarillo
        S: '#00f000', // Verde
        T: '#a000f0', // Púrpura
        Z: '#f00000'  // Rojo
    };

    // Función para obtener una pieza aleatoria
    function getRandomPiece() {
        if (pieceQueue.length < 4) {
            const pieceTypes = Object.keys(pieces);
            for (let i = 0; i < 4; i++) {
                const randomType = pieceTypes[Math.floor(Math.random() * pieceTypes.length)];
                pieceQueue.push({
                    type: randomType,
                    shape: pieces[randomType],
                    position: { x: 3, y: 0 }
                });
            }
        }
        const nextPiece = pieceQueue.shift();
        updateNextPiecesDisplay();
        return nextPiece;
    }

    function updateNextPiecesDisplay() {
        for (let i = 0; i < 3; i++) {
            const preview = document.getElementById(`next-${i + 1}`);
            preview.innerHTML = '';
            
            if (pieceQueue[i]) {
                pieceQueue[i].shape.forEach(([x, y]) => {
                    const block = document.createElement('div');
                    block.style.gridRowStart = y + 2;
                    block.style.gridColumnStart = x + 2;
                    block.classList.add('block');
                    block.style.backgroundColor = pieceColors[pieceQueue[i].type];
                    preview.appendChild(block);
                });
            }
        }
    }

    // Estado del tablero para verificar colisiones con otras piezas
    let boardState = Array.from({ length: 20 }, () => Array(10).fill(null));

    function checkCollision(position, shape) {
        return shape.some(([x, y]) => {
            const newX = position.x + x;
            const newY = position.y + y;
            return (
                newX < 0 || // Colisión con el borde izquierdo
                newX >= 10 || // Colisión con el borde derecho
                newY >= 20 || // Colisión con el fondo
                (boardState[newY] && boardState[newY][newX]) // Colisión con otras piezas
            );
        });
    }

    document.addEventListener('keydown', handleKeyPress);

    function handleKeyPress(event) {
        if (!currentPiece || isPaused) return;

        switch (event.key) {
            case 'ArrowLeft':
                movePiece(-1, 0);
                break;
            case 'ArrowRight':
                movePiece(1, 0);
                break;
            case 'ArrowDown':
                movePiece(0, 1);
                break;
            case 'ArrowUp':
                rotatePiece();
                break;
        }
    }

    function movePiece(dx, dy) {
        const newPosition = {
            x: currentPiece.position.x + dx,
            y: currentPiece.position.y + dy
        };

        if (!checkCollision(newPosition, currentPiece.shape)) {
            currentPiece.position = newPosition;
            drawPiece();
        }
    }

    function rotatePiece() {
        const rotatedShape = currentPiece.shape.map(([x, y]) => [-y, x]);
        
        if (!checkCollision(currentPiece.position, rotatedShape)) {
            currentPiece.shape = rotatedShape;
            drawPiece();
        }
    }

    function checkLines() {
        let linesCleared = 0;
        
        for (let y = boardState.length - 1; y >= 0; y--) {
            if (boardState[y].every(cell => cell !== null)) {
                boardState.splice(y, 1);
                boardState.unshift(Array(10).fill(null));
                linesCleared++;
                y++;
            }
        }
        
        if (linesCleared > 0) {
            // Puntos base por cada línea
            const basePoints = {
                1: 100,
                2: 100,
                3: 100,
                4: 100
            };
            
            let totalPoints = 0;
            
            // Calcular puntos con bonus
            for (let i = 1; i <= linesCleared; i++) {
                if (i === 1) {
                    totalPoints += basePoints[i];
                } else {
                    // Cada línea adicional recibe un 10% extra
                    let bonusMultiplier = 1 + ((i - 1) * 0.1);
                    totalPoints += Math.floor(basePoints[i] * bonusMultiplier);
                }
            }
            
            score += totalPoints;
            scoreDisplay.textContent = score;
            
            updateLevel();
            updateGameSpeed();
        }
    }

    // Agregar después de la declaración de variables globales
    const GAME_LEVELS = {
        1: { goal: 500, speed: 1000 },    // Nivel inicial
        2: { goal: 1000, speed: 900 },
        3: { goal: 1500, speed: 800 },
        4: { goal: 2000, speed: 700 },
        5: { goal: 2500, speed: 600 },
        6: { goal: 3000, speed: 500 },
        7: { goal: 3500, speed: 400 },
        8: { goal: 4000, speed: 300 },
        9: { goal: 4500, speed: 200 },
        10: { goal: 5000, speed: 100 }    // Nivel final
    };

    // Agregar después de la declaración de GAME_LEVELS
    const LEVEL_COLORS = {
        1: { start: '#1a1a2e', end: '#16213e' },  // Azul oscuro
        2: { start: '#162432', end: '#1b3a4b' },  // Azul medio
        3: { start: '#123524', end: '#1b4f35' },  // Azul verdoso
        4: { start: '#0f4d2e', end: '#166b41' },  // Verde oscuro
        5: { start: '#1a5f2c', end: '#2d7a3d' },  // Verde medio
        6: { start: '#4d6c15', end: '#698f1f' },  // Verde amarillento
        7: { start: '#6b6b14', end: '#8f8f1f' },  // Amarillo verdoso
        8: { start: '#8f6f14', end: '#b38b1a' },  // Amarillo
        9: { start: '#8f4f14', end: '#b36a1a' },  // Naranja
        10: { start: '#8f2414', end: '#b32d1a' }  // Rojo
    };

    function updateBackgroundColor(level) {
        const colors = LEVEL_COLORS[level];
        document.body.style.background = `linear-gradient(135deg, ${colors.start} 0%, ${colors.end} 100%)`;
        
        // Añadir una transición suave
        document.body.style.transition = 'background 1s ease-in-out';
    }

    // Función para actualizar la velocidad del juego
    function updateGameSpeed() {
        const currentSpeed = GAME_LEVELS[currentLevel].speed;
        clearInterval(gameInterval);
        gameInterval = setInterval(moveDown, currentSpeed);
    }

    function updateLevel() {
        const nextLevel = currentLevel + 1;
        if (GAME_LEVELS[nextLevel] && score >= GAME_LEVELS[currentLevel].goal) {
            currentLevel = nextLevel;
            levelDisplay.textContent = currentLevel;
            
            // Actualizar el color de fondo
            updateBackgroundColor(currentLevel);
            
            // Actualizar el objetivo del siguiente nivel
            if (GAME_LEVELS[nextLevel + 1]) {
                levelGoalDisplay.textContent = GAME_LEVELS[nextLevel].goal;
            } else {
                levelGoalDisplay.textContent = 'MAX';
            }
            
            // Mostrar mensaje de nivel completado con el puntaje acumulado
            if (currentLevel === 10) {
                alert(`¡Felicitaciones! ¡Has completado todos los niveles con ${score} puntos!`);
                resetGame();
                return;
            } else {
                alert(`¡Felicitaciones! Has alcanzado el nivel ${currentLevel} con ${score} puntos`);
                resetBoardForNextLevel();
            }
            
            updateGameSpeed();
        }
    }

    function resetBoardForNextLevel() {
        clearInterval(gameInterval);
        gameInterval = null;
        board.innerHTML = '';
        currentPiece = null;
        isPaused = false;
        pieceQueue = [];
        boardState = Array.from({ length: 20 }, () => Array(10).fill(null));
        
        // Limpiar las previsualizaciones
        for (let i = 1; i <= 3; i++) {
            document.getElementById(`next-${i}`).innerHTML = '';
        }
        
        // Reiniciar el juego con la nueva velocidad
        startGame();
    }

    // Asegurar que el color inicial se establezca al cargar el juego
    updateBackgroundColor(1);
});
