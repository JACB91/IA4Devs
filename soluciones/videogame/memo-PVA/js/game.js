class MemoGame {
    constructor() {
        this.selectedLevel = null;
        this.timeLimit = 0;
        this.timer = null;
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.isPlaying = false;
        this.canFlip = false;

        // Array de imágenes
        this.images = [
            'lion', 'bear', 'monkey',
            'koala', 'dog', 'tiger'
        ];

        // Añadir la precarga de imágenes
        this.preloadImages();

        this.initializeElements();
        this.setupEventListeners();
    }

    // Añadir este nuevo método para precargar imágenes
    preloadImages() {
        const imagePromises = this.images.map(imageName => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = `img/${imageName}.png`;
            });
        });

        Promise.all(imagePromises)
            .then(() => {
                console.log('Todas las imágenes precargadas');
                // Habilitar el selector de niveles una vez cargadas las imágenes
                this.levelButtons.forEach(btn => btn.disabled = false);
            })
            .catch(error => console.error('Error al cargar imágenes:', error));
    }

    initializeElements() {
        this.boardElement = document.getElementById('game-board');
        this.timerElement = document.getElementById('timer');
        this.startButton = document.getElementById('start-game');
        this.levelButtons = document.querySelectorAll('.level-btn');
        this.modal = document.getElementById('result-modal');
        this.resultMessage = document.getElementById('result-message');
        this.playAgainButton = document.getElementById('play-again');

        // Deshabilitar los botones de nivel hasta que se carguen las imágenes
        this.levelButtons.forEach(btn => btn.disabled = true);
    }

    setupEventListeners() {
        this.levelButtons.forEach(button => {
            button.addEventListener('click', () => this.selectLevel(button.dataset.level));
        });

        this.startButton.addEventListener('click', () => this.startGame());
        this.playAgainButton.addEventListener('click', () => this.resetGame());
    }

    selectLevel(level) {
        this.selectedLevel = parseInt(level);
        this.timeLimit = this.getLevelTime(level);
        
        this.levelButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.level === level);
        });
        
        this.startButton.disabled = false;
        this.timerElement.textContent = this.timeLimit;
    }

    getLevelTime(level) {
        const times = {
            1: 40,
            2: 30,
            3: 20
        };
        return times[level] || 40;
    }

    createCards() {
        this.boardElement.innerHTML = '';
        this.cards = [];
        
        // Crear pares de cartas
        const cardPairs = [...this.images, ...this.images];
        this.shuffleArray(cardPairs);

        cardPairs.forEach((image, index) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.dataset.cardId = index;
            card.dataset.image = image;

            card.innerHTML = `
                <div class="card-front">
                    <img src="img/${image}.png" alt="${image}">
                </div>
                <div class="card-back"></div>
            `;

            card.addEventListener('click', () => this.flipCard(card));
            this.boardElement.appendChild(card);
            this.cards.push(card);
        });
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    startGame() {
        if (!this.selectedLevel) return;
        
        this.isPlaying = true;
        this.matchedPairs = 0;
        this.createCards();
        this.startButton.disabled = true;
        this.levelButtons.forEach(btn => btn.disabled = true);

        // Mostrar preview inicial
        this.cards.forEach(card => card.classList.add('preview'));
        
        setTimeout(() => {
            this.cards.forEach(card => card.classList.remove('preview'));
            this.canFlip = true;
            this.startTimer();
        }, 5000);
    }

    flipCard(card) {
        if (!this.canFlip || this.flippedCards.length >= 2 || 
            card.classList.contains('flipped') || 
            card.classList.contains('matched')) {
            return;
        }

        card.classList.add('flipped');
        this.flippedCards.push(card);

        if (this.flippedCards.length === 2) {
            this.checkMatch();
        }
    }

    checkMatch() {
        const [card1, card2] = this.flippedCards;
        const match = card1.dataset.image === card2.dataset.image;

        if (match) {
            this.matchedPairs++;
            card1.classList.add('matched');
            card2.classList.add('matched');
            this.checkWin();
        } else {
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
            }, 1000);
        }

        this.flippedCards = [];
    }

    startTimer() {
        let timeLeft = this.timeLimit;
        this.timerElement.textContent = timeLeft;

        this.timer = setInterval(() => {
            timeLeft--;
            this.timerElement.textContent = timeLeft;

            if (timeLeft <= 0) {
                this.gameOver();
            }
        }, 1000);
    }

    checkWin() {
        if (this.matchedPairs === this.images.length) {
            clearInterval(this.timer);
            this.showResult('¡Felicitaciones! ¡Has ganado!');
        }
    }

    gameOver() {
        clearInterval(this.timer);
        this.showResult('¡Tiempo agotado! Inténtalo de nuevo');
    }

    showResult(message) {
        this.resultMessage.textContent = message;
        this.modal.classList.remove('hidden');
    }

    resetGame() {
        clearInterval(this.timer);
        this.modal.classList.add('hidden');
        this.selectedLevel = null;
        this.timeLimit = 0;
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.isPlaying = false;
        this.canFlip = false;
        this.boardElement.innerHTML = '';
        this.timerElement.textContent = '--';
        this.startButton.disabled = true;
        this.levelButtons.forEach(btn => {
            btn.disabled = false;
            btn.classList.remove('active');
        });
    }
}

// Inicializar el juego
const game = new MemoGame(); 