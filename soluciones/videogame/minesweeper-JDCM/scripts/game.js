import { GAME_CONFIGS, generateMines, calculateAdjacentMines, formatTime, initializeTheme } from './utils.js';

class Minesweeper {
    constructor() {
        this.gameBoard = document.getElementById('game-board');
        this.mineCounter = document.getElementById('mine-counter');
        this.timer = document.getElementById('timer');
        this.resetButton = document.getElementById('reset-button');
        this.difficultySelect = document.getElementById('difficulty');
        this.newGameButton = document.getElementById('new-game');
        this.themeToggle = document.getElementById('theme-toggle');
        this.modal = document.getElementById('message-modal');
        this.modalMessage = document.getElementById('modal-message');
        
        this.currentTheme = initializeTheme();
        this.cells = [];
        this.minePositions = new Set();
        this.flaggedCells = new Set();
        this.revealedCells = new Set();
        this.isGameOver = false;
        this.isFirstClick = true;
        this.timerInterval = null;
        this.timeElapsed = 0;
        
        this.bootstrapModal = new bootstrap.Modal(document.getElementById('message-modal'), {
            keyboard: false,
            backdrop: 'static'
        });
        
        this.initializeGame();
        this.setupEventListeners();
    }
    
    initializeGame() {
        this.cleanupGame();
        
        const config = GAME_CONFIGS[this.difficultySelect.value];
        this.rows = config.rows;
        this.cols = config.cols;
        this.totalMines = config.mines;
        
        this.cells = [];
        this.minePositions = new Set();
        this.flaggedCells = new Set();
        this.revealedCells = new Set();
        
        this.isGameOver = false;
        this.isFirstClick = true;
        
        this.createBoard();
        this.updateMineCounter();
        this.resetTimer();
        this.resetButton.textContent = '😊';
    }
    
    cleanupGame() {
        this.stopTimer();
        
        if (this.gameBoard) {
            const oldBoard = this.gameBoard;
            const newBoard = oldBoard.cloneNode(false);
            oldBoard.parentNode.replaceChild(newBoard, oldBoard);
            this.gameBoard = newBoard;
            
            this.gameBoard.addEventListener('click', (e) => this.handleCellClick(e));
            this.gameBoard.addEventListener('contextmenu', (e) => this.handleRightClick(e));
        }
        
        this.timeElapsed = 0;
        if (this.timer) this.timer.textContent = '000';
        if (this.mineCounter) this.mineCounter.textContent = '000';
    }
    
    createBoard() {
        this.gameBoard.innerHTML = '';
        const cellSize = window.innerWidth <= 576 ? 25 : 30;
        this.gameBoard.style.gridTemplateColumns = `repeat(${this.cols}, ${cellSize}px)`;
        this.cells = [];
        
        for (let row = 0; row < this.rows; row++) {
            this.cells[row] = [];
            for (let col = 0; col < this.cols; col++) {
                const cell = document.createElement('div');
                cell.className = 'cell';
                cell.dataset.row = row;
                cell.dataset.col = col;
                
                cell.style.backgroundColor = '';
                cell.textContent = '';
                
                this.cells[row][col] = cell;
                this.gameBoard.appendChild(cell);
            }
        }
    }
    
    setupEventListeners() {
        this.gameBoard.addEventListener('click', (e) => this.handleCellClick(e));
        this.gameBoard.addEventListener('contextmenu', (e) => this.handleRightClick(e));
        this.resetButton.addEventListener('click', () => this.initializeGame());
        this.newGameButton.addEventListener('click', () => this.initializeGame());
        this.difficultySelect.addEventListener('change', () => this.initializeGame());
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
    
    handleCellClick(e) {
        if (!e.target.classList.contains('cell') || this.isGameOver) return;
        
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        
        if (this.flaggedCells.has(`${row},${col}`)) return;
        
        if (this.isFirstClick) {
            this.startGame(row, col);
        }
        
        this.revealCell(row, col);
    }
    
    handleRightClick(e) {
        e.preventDefault();
        if (!e.target.classList.contains('cell') || this.isGameOver) return;
        
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        const position = `${row},${col}`;
        
        if (this.revealedCells.has(position)) return;
        
        if (this.flaggedCells.has(position)) {
            this.flaggedCells.delete(position);
            e.target.textContent = '';
            this.updateMineCounter();
        } else {
            if (this.flaggedCells.size >= this.totalMines) {
                this.showModal(`¡Límite alcanzado! Solo puedes colocar ${this.totalMines} banderas en total.`);
                return;
            }
            this.flaggedCells.add(position);
            e.target.textContent = '🚩';
            this.updateMineCounter();
        }
    }
    
    startGame(row, col) {
        this.isFirstClick = false;
        this.minePositions = generateMines(this.rows, this.cols, this.totalMines, `${row},${col}`);
        this.startTimer();
    }
    
    revealCell(row, col) {
        const position = `${row},${col}`;
        
        if (this.revealedCells.has(position)) return;
        
        const cell = this.cells[row][col];
        this.revealedCells.add(position);
        cell.classList.add('revealed');
        
        if (this.minePositions.has(position)) {
            this.gameOver(false);
            cell.textContent = '💣';
            cell.style.backgroundColor = 'red';
            return;
        }
        
        const adjacentMines = calculateAdjacentMines(row, col, this.minePositions, this.rows, this.cols);
        
        if (adjacentMines === 0) {
            this.revealAdjacentCells(row, col);
        } else {
            cell.textContent = adjacentMines;
            cell.dataset.number = adjacentMines;
        }
        
        this.checkWin();
    }
    
    revealAdjacentCells(row, col) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                
                const newRow = row + i;
                const newCol = col + j;
                
                if (newRow >= 0 && newRow < this.rows && 
                    newCol >= 0 && newCol < this.cols) {
                    this.revealCell(newRow, newCol);
                }
            }
        }
    }
    
    checkWin() {
        const totalCells = this.rows * this.cols;
        const shouldBeRevealed = totalCells - this.totalMines;
        
        if (this.revealedCells.size === shouldBeRevealed) {
            this.gameOver(true);
        }
    }
    
    gameOver(isWin) {
        this.isGameOver = true;
        this.stopTimer();
        this.resetButton.textContent = isWin ? '😎' : '😵';
        
        if (!isWin) {
            this.revealAllMines();
        }
    }
    
    revealAllMines() {
        this.minePositions.forEach(position => {
            const [row, col] = position.split(',').map(Number);
            const cell = this.cells[row][col];
            if (!this.flaggedCells.has(position)) {
                cell.textContent = '💣';
                cell.classList.add('revealed');
            }
        });
    }
    
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timeElapsed++;
            this.timer.textContent = formatTime(this.timeElapsed);
        }, 1000);
    }
    
    stopTimer() {
        clearInterval(this.timerInterval);
    }
    
    resetTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
        this.timeElapsed = 0;
        this.timer.textContent = '000';
    }
    
    updateMineCounter() {
        const remainingMines = this.totalMines - this.flaggedCells.size;
        this.mineCounter.textContent = formatTime(remainingMines);
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.themeToggle.textContent = this.currentTheme === 'light' ? '🌙' : '☀️';
        localStorage.setItem('minesweeper-theme', this.currentTheme);
    }
    
    showModal(message) {
        this.modalMessage.textContent = message;
        this.bootstrapModal.show();
    }
}

// Inicializar el juego
new Minesweeper(); 