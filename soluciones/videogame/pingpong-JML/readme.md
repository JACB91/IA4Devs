# Retro Ping Pong Game

A classic Ping Pong game built with a retro aesthetic, featuring customizable difficulty levels and game settings. This project uses Phaser 3 framework to create an engaging browser-based gaming experience.

## 🎮 Game Features

- Retro-styled UI with pixelated fonts and neon effects
- Three difficulty levels: Slow, Medium, and Fast
- Customizable match length (1, 3, 5, or 7 points)
- Responsive AI opponent with difficulty-based behavior
- Pause/Resume functionality
- Score tracking system
- Retro sound effects and visual feedback

## 🛠 Technologies Used

- **Phaser 3**: Game framework for rendering and physics
- **HTML5**: Structure and canvas rendering
- **CSS3**: Retro styling and animations
- **JavaScript**: Game logic and controls
- **Google Fonts**: "Press Start 2P" for retro typography

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (can be simple like Python's `http.server` or VS Code's Live Server)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/retro-ping-pong.git
    ```

2. Navigate to the project directory:
    ```bash
    cd retro-ping-pong
    ```

3. Start a local server:
    ```bash
    # Python 3
    python -m http.server 8000
    ```

4. Open your browser and navigate to:
    ```
    http://localhost:8000
    ```

## 🎯 How to Play

### Start Screen
1. Select your preferred settings:
    - Choose number of max goals (1-7)
    - Select difficulty level (Slow/Medium/Fast)
    - Click "Start Game" to begin

### Controls
- Move paddle left: `←` Left Arrow
- Move paddle right: `→` Right Arrow
- Pause game: `Pause` button
- Quit game: `Quit` button

### Gameplay Rules
- Prevent the ball from reaching your goal
- Score points by making the ball pass the opponent's paddle
- First player to reach the max goals wins

## 🎨 Game Design

### Visual Elements
- Green game table
- Yellow goals and paddles
- Retro-styled UI elements with pixel-perfect design
- Neon glow effects

### Game Mechanics
- Dynamic ball physics
- AI opponent with predictive movement
- Collision detection for walls and paddles
- Score tracking and win conditions

## 🔧 Configuration

### Difficulty Settings
```javascript
{
    slow: {
        aiSpeed: 3,
        ballSpeed: 250
    },
    medium: {
        aiSpeed: 4,
        ballSpeed: 350
    },
    fast: {
        aiSpeed: 5,
        ballSpeed: 450
    }
}
```

## 🙏 Acknowledgments

- Phaser.js community for the excellent game framework
- Classic Pong game for inspiration
- Retro gaming community for UI/UX inspiration
