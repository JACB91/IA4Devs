// Configuraciones del juego según dificultad
export const GAME_CONFIGS = {
    beginner: {
        rows: 9,
        cols: 9,
        mines: 10
    },
    intermediate: {
        rows: 16,
        cols: 16,
        mines: 40
    },
    expert: {
        rows: 30,
        cols: 16,
        mines: 99
    }
};

// Genera posiciones aleatorias para las minas
export function generateMines(rows, cols, mines, firstClick) {
    const minePositions = new Set();
    
    // Asegurarse de que la primera celda clickeada y sus alrededores estén seguros
    const safeZone = getSafeZone(firstClick, rows, cols);
    
    while (minePositions.size < mines) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        const position = `${row},${col}`;
        
        if (!safeZone.has(position) && !minePositions.has(position)) {
            minePositions.add(position);
        }
    }
    
    return minePositions;
}

// Obtiene las celdas seguras alrededor del primer clic
function getSafeZone(firstClick, rows, cols) {
    const safeZone = new Set();
    const [row, col] = firstClick.split(',').map(Number);
    
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                safeZone.add(`${newRow},${newCol}`);
            }
        }
    }
    
    return safeZone;
}

// Calcula el número de minas adyacentes para una celda
export function calculateAdjacentMines(row, col, minePositions, rows, cols) {
    let count = 0;
    
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            
            const newRow = row + i;
            const newCol = col + j;
            
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                if (minePositions.has(`${newRow},${newCol}`)) {
                    count++;
                }
            }
        }
    }
    
    return count;
}

// Formatea el tiempo para el display
export function formatTime(seconds) {
    return seconds.toString().padStart(3, '0');
}

// Gestiona el tema (claro/oscuro)
export function initializeTheme() {
    const theme = localStorage.getItem('minesweeper-theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    return theme;
} 