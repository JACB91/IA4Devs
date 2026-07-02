# **Prompt 1**

We are going to develop a Pacman game with Phaser.

Set up the initial Phaser project to begin development.

# **Result 1**

To set up an initial Phaser project for developing a Pacman game, follow these steps:

### Step 1: Create Project Directory

1. Create a new directory for your project:
    
    ```bash
    mkdir pacman-game
    cd pacman-game
    
    ```
    

### Step 2: Initialize npm

1. Initialize a new npm project:
    
    ```bash
    npm init -y
    
    ```
    

### Step 3: Install Phaser

1. Install Phaser using npm:
    
    ```bash
    npm install phaser
    
    ```
    

### Step 4: Create Project Structure

1. Create the following directory structure:
    
    ```bash
    mkdir src
    touch src/index.html src/main.js
    
    ```
    

### Step 5: Set Up HTML File

1. Open `src/index.html` and add the following code:
    
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pacman Game</title>
        <script src="<https://cdnjs.cloudflare.com/ajax/libs/phaser/3.55.2/phaser.min.js>"></script>
        <script src="main.js" defer></script>
    </head>
    <body>
    </body>
    </html>
    
    ```
    

### Step 6: Set Up Main JavaScript File

1. Open `src/main.js` and add the following code to set up a basic Phaser game:
    
    ```jsx
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
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
    
    function preload() {
        // Load assets here
    }
    
    function create() {
        // Initialize game objects here
    }
    
    function update() {
        // Game loop logic here
    }
    
    ```
    

### Step 7: Run the Project

1. To run the project, you can use a simple HTTP server. If you have Python installed, you can run:
Then, open your browser and navigate to `http://localhost:8000/src`.
    
    ```bash
    python -m http.server
    
    ```
    

### Summary

You now have a basic setup for a Pacman game using Phaser. You can start adding assets and game logic in the `preload`, `create`, and `update` functions.

# **Prompt 2**

You are an expert game developer. Create a simple Phaser game configuration.

# **Result 2**

Here's a simple Phaser game configuration that sets up a basic game with a player sprite that can move around the screen. This example includes a simple scene with basic physics and keyboard controls.

### Game Configuration Example

```jsx
// src/main.js

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // No gravity
            debug: false // Set to true for debugging
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

function preload() {
    // Load player sprite
    this.load.image('player', 'path/to/player-sprite.png'); // Update with your sprite path
}

function create() {
    // Create the player sprite
    player = this.physics.add.sprite(400, 300, 'player');

    // Set player properties
    player.setBounce(0.2); // Bounce off the walls
    player.setCollideWorldBounds(true); // Prevent going out of bounds

    // Create cursors for keyboard input
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Handle player movement
    if (cursors.left.isDown) {
        player.setVelocityX(-160); // Move left
    } else if (cursors.right.isDown) {
        player.setVelocityX(160); // Move right
    } else {
        player.setVelocityX(0); // Stop moving
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-160); // Move up
    } else if (cursors.down.isDown) {
        player.setVelocityY(160); // Move down
    } else {
        player.setVelocityY(0); // Stop moving
    }
}

```

### Explanation

1. **Game Configuration**:
    - The game is set to use `Phaser.AUTO`, which automatically chooses the best rendering method.
    - The game dimensions are set to 800x600 pixels.
    - Arcade physics is enabled with no gravity.
2. **Preload Function**:
    - The `preload` function loads the player sprite image. Make sure to replace `'path/to/player-sprite.png'` with the actual path to your sprite image.
3. **Create Function**:
    - The `create` function initializes the player sprite at the center of the screen (400, 300).
    - The player is given bounce and collision properties to keep it within the game bounds.
    - Keyboard cursors are created for player movement.
4. **Update Function**:
    - The `update` function checks for keyboard input and sets the player's velocity accordingly, allowing the player to move in all four directions.

### Summary

This configuration sets up a simple Phaser game where a player can move around the screen using the arrow keys. You can expand upon this by adding more features, such as obstacles, collectibles, or enemies, as you develop your Pacman game.

# **Prompt 3**

load images for Pacman and ghosts into my Phaser game

# **Result 3**

To load images for Pacman and ghosts into your Phaser game, you will need to follow these steps:

### Step 1: Prepare Your Images

1. **Download or create your images** for Pacman and the ghosts. Ensure you have the following images:
    - `pacman.png` (for Pacman)
    - `ghost1.png` (for the first ghost)
    - `ghost2.png` (for the second ghost)
    - (You can add more ghosts if needed)
2. **Place the images** in the `src/assets/images` directory. If you haven't created this directory yet, follow these commands:
    
    ```bash
    mkdir -p src/assets/images
    
    ```
    
    Then, copy your images into this directory. You can do this manually or use the command line.
    

### Step 2: Update Your `main.js` File

1. **Modify the `preload` function** in your `main.js` file to load the images. Here’s how you can do it:

```jsx
function preload() {
    // Load player sprite (Pacman)
    this.load.image('pacman', 'assets/images/pacman.png'); // Update with your Pacman sprite path

    // Load ghost sprites
    this.load.image('ghost1', 'assets/images/ghost1.png'); // Update with your first ghost sprite path
    this.load.image('ghost2', 'assets/images/ghost2.png'); // Update with your second ghost sprite path
}

```

### Step 3: Create the Sprites in the `create` Function

1. **Add the sprites to the game** in the `create` function. Here’s an example of how to create the Pacman and ghost sprites:

```jsx
function create() {
    // Create Pacman sprite
    player = this.physics.add.sprite(400, 300, 'pacman');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // Create ghost sprites
    const ghost1 = this.physics.add.sprite(200, 200, 'ghost1');
    ghost1.setBounce(0.2);
    ghost1.setCollideWorldBounds(true);

    const ghost2 = this.physics.add.sprite(600, 200, 'ghost2');
    ghost2.setBounce(0.2);
    ghost2.setCollideWorldBounds(true);

    // Create cursors for keyboard input
    cursors = this.input.keyboard.createCursorKeys();
}

```

### Step 4: Update Your Game Logic

1. **Implement movement or behavior** for the ghosts if needed. You can add simple AI or movement patterns in the `update` function.

### Example of the Updated `main.js`

Here’s how your `main.js` file might look after these changes:

```jsx
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
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

function preload() {
    // Load player sprite (Pacman)
    this.load.image('pacman', 'assets/images/pacman.png'); // Update with your Pacman sprite path

    // Load ghost sprites
    this.load.image('ghost1', 'assets/images/ghost1.png'); // Update with your first ghost sprite path
    this.load.image('ghost2', 'assets/images/ghost2.png'); // Update with your second ghost sprite path
}

function create() {
    // Create Pacman sprite
    player = this.physics.add.sprite(400, 300, 'pacman');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // Create ghost sprites
    const ghost1 = this.physics.add.sprite(200, 200, 'ghost1');
    ghost1.setBounce(0.2);
    ghost1.setCollideWorldBounds(true);

    const ghost2 = this.physics.add.sprite(600, 200, 'ghost2');
    ghost2.setBounce(0.2);
    ghost2.setCollideWorldBounds(true);

    // Create cursors for keyboard input
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Handle player movement
    if (cursors.left.isDown) {
        player.setVelocityX(-160); // Move left
    } else if (cursors.right.isDown) {
        player.setVelocityX(160); // Move right
    } else {
        player.setVelocityX(0); // Stop moving
    }

    if (cursors.up.isDown) {
        player.setVelocityY(-160); // Move up
    } else if (cursors.down.isDown) {
        player.setVelocityY(160); // Move down
    } else {
        player.setVelocityY(0); // Stop moving
    }
}

```

### Summary

By following these steps, you will have successfully loaded images for Pacman and ghosts into your Phaser game. Make sure to test the game to ensure that the sprites are displayed correctly and that the paths to the images are accurate. If you encounter any issues, check the console for errors related to loading the images.

# **Prompt 1 A**

### Develop a Pacman-inspired game using Phaser, JavaScript, and HTML. The game should closely mimic the gameplay and aesthetics of the classic Pacman while utilizing modern development practices. The deliverable must include modular and reusable code for customization and scalability.

#### **Game Overview:**

- The player controls a character navigating a maze built from repeating tiles.
- The maze contains walls, pathways, pellets, and power-ups.
- The objective is to collect all pellets while avoiding enemies (ghosts) that patrol the maze.

#### **Technical Requirements:**

1. Use Phaser 3 as the game development framework.

2. Build the maze using a repeating tile-based design for modularity and visual consistency.

3. Write clean and modular JavaScript for game logic.

4. Integrate the game within an HTML file with appropriate `<script>` tags for JavaScript and CSS for minimal styling outside Phaser.

5. Ensure the game is compatible with modern browsers (Chrome, Firefox, Safari).

#### **Game Components:**

1. **Player Character:**

- A controllable character that moves within the maze using keyboard input (arrow keys).

- Movement constrained to pathways (tile-based grid).

- Interacts with pellets, power-ups, and enemies.

2. **Maze:**

- Constructed using a single tile texture, repeated to simulate walls and pathways.

- A tilemap system defines walls (non-walkable) and paths (walkable).

- Ensure maze design allows clear paths for enemies and the player to move.

3. **Enemies:**

- AI-controlled enemies (ghosts) that follow predefined movement patterns and patrol the maze.

- Transition to a vulnerable state when the player collects power-ups.

- Respawn in a designated area after being eaten by the player.

4. **Items:**

- **Pellets:** Collectible items placed along the pathways that increase the player's score.

- **Power-ups:** Special items granting temporary abilities, such as defeating enemies or enhanced speed.

5. **UI Elements:**

- A score counter updates dynamically as pellets are collected.

- A "lives" indicator tracks the player’s remaining chances.

- "Game Over" and "You Win" messages appear based on game outcomes.

#### **Functionality:**

1. **Player Controls:**

- Arrow keys enable directional movement.

- Movement transitions smoothly along grid paths.

2. **Enemy AI:**

- Enemies navigate the maze using tile-based logic, optionally targeting the player as difficulty increases.

- Enemies scatter when the player collects power-ups.

3. **Game Mechanics:**

- Collision with enemies in their normal state reduces lives.

- Collect all pellets to win.

4. **Maze Design with Tilemap:**

- Use Phaser's *tilemap* system to define the maze layout.

- Each tile's properties (e.g., wall vs. path) determine movement behavior.

- Load the tilemap from a JSON file or define it directly in code.

#### **Styling and Design:**

1. Use retro-inspired visuals, with simple, bold colors for walls, pathways, and characters.

2. Create a clear distinction between different elements (player, enemies, pellets, and power-ups).

3. Add sound effects for actions such as eating pellets, losing a life, or defeating enemies.

#### **Optimization & Testing:**

1. Code should be modular and include comments explaining each section.

2. Ensure consistent performance across various screen sizes and devices.

3. Test in multiple browsers to confirm functionality.

- --
- *Deliverable:**

A playable Pacman-inspired game built using Phaser, with the maze implemented as a tilemap. Include all game assets and clear instructions for customization or further development.

# **Result 1 A**

Here's a basic structure for a Pacman-inspired game using Phaser 3, JavaScript, and HTML. This code is modular and reusable, allowing for customization and scalability. Below is a simplified version of the game setup, including the player, maze, enemies, and items.

### HTML File

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pacman Inspired Game</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <script src="<https://cdnjs.cloudflare.com/ajax/libs/phaser/3.55.2/phaser.min.js>"></script>
    <script src="game.js"></script>
</body>
</html>

```

### JavaScript File (game.js)

```jsx
// game.js
const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: 0,
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

function preload() {
    // Load assets
    this.load.image('tiles', 'assets/tiles.png'); // Tilemap image
    this.load.tilemapTiledJSON('map', 'assets/map.json'); // Tilemap JSON
    this.load.image('player', 'assets/player.png'); // Player sprite
    this.load.image('ghost', 'assets/ghost.png'); // Ghost sprite
    this.load.image('pellet', 'assets/pellet.png'); // Pellet sprite
    this.load.image('powerup', 'assets/powerup.png'); // Power-up sprite
}

function create() {
    // Create the tilemap
    const map = this.make.tilemap({ key: 'map' });
    const tileset = map.addTilesetImage('tilesetName', 'tiles');
    const layer = map.createLayer('Tile Layer 1', tileset, 0, 0);

    // Create player
    this.player = this.physics.add.sprite(50, 50, 'player');
    this.physics.add.collider(this.player, layer);

    // Create ghosts
    this.ghosts = this.physics.add.group();
    createGhosts.call(this);

    // Create pellets
    this.pellets = this.physics.add.group();
    createPellets.call(this);

    // Create power-ups
    this.powerups = this.physics.add.group();
    createPowerUps.call(this);

    // Score and lives
    this.score = 0;
    this.lives = 3;
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
    this.livesText = this.add.text(16, 50, 'Lives: 3', { fontSize: '32px', fill: '#fff' });

    // Input handling
    this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Player movement
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(160);
    } else {
        this.player.setVelocityX(0);
    }

    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-160);
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(160);
    } else {
        this.player.setVelocityY(0);
    }

    // Update score and lives
    this.scoreText.setText('Score: ' + this.score);
    this.livesText.setText('Lives: ' + this.lives);
}

function createGhosts() {
    // Create ghosts with basic AI
    for (let i = 0; i < 4; i++) {
        const ghost = this.ghosts.create(100 + i * 50, 100, 'ghost');
        ghost.setCollideWorldBounds(true);
        // Add ghost movement logic here
    }
}

function createPellets() {
    // Create pellets in the maze
    const pelletPositions = [[100, 100], [150, 100], [200, 100]]; // Example positions
    pelletPositions.forEach(pos => {
        const pellet = this.pellets.create(pos[0], pos[1], 'pellet');
    });
}

function createPowerUps() {
    // Create power-ups in the maze
    const powerUp = this.powerups.create(300, 300, 'powerup');
}

```

### Explanation of the Code

- **HTML Structure**: The HTML file includes the Phaser library and links to the JavaScript file.
- **Game Configuration**: The `config` object sets up the game dimensions, physics, and scene methods.
- **Preload Function**: Loads all necessary assets, including images and tilemaps.
- **Create Function**: Initializes the game elements, including the player, ghosts, pellets, and power-ups.
- **Update Function**: Handles player movement and updates the score and lives display.
- **Modular Functions**: Functions like `createGhosts`, `createPellets`, and `createPowerUps` are defined to keep the code organized and modular.

### Next Steps

- Implement ghost AI for movement and collision detection.
- Add collision handling for collecting pellets and power-ups.
- Create a game over and win condition.
- Style the game with CSS and add sound effects.

This structure provides a solid foundation for your Pacman-inspired game, allowing for further development and customization.

# **Prompt 2 A**

Pacman is larger than the maze. Reduce its size to fit within the paths of the maze.

this.load.image('pacman', 'assets/pacman2.png');"

# **Result 2 A**

To reduce the size of Pacman so that it fits within the paths of the maze, you can set the display size of the Pacman sprite in the `create` function. Here’s the updated code with the necessary changes highlighted:

```
// ... existing code ...
function create() {
    const tileSize = 40; // Size of each rectangle (tile)

    // ... existing code ...

    // Create the player (Pacman)
    this.player = this.physics.add.sprite(50, 50, 'pacman');

    // Set player size to fit within the maze paths
    this.player.setDisplaySize(tileSize * 0.8, tileSize * 0.8); // Adjust size to 80% of tile size
    this.player.setTint(0xffff00); // Set color to yellow (Pacman)

    // ... existing code ...
}
// ... existing code ...

```

### Explanation of Changes:

- Added `this.player.setDisplaySize(tileSize * 0.8, tileSize * 0.8);` to set the size of Pacman to 80% of the tile size, ensuring it fits within the maze paths.

# **Prompt 3 A**

You are an expert game developer. Now, use the sprite blue ghost, add the sprite and implement random movement within the maze, ensuring it respects the same colliders as the player.

# **Result 3 A**

To implement random movement for the blue ghost sprite within the maze while ensuring it respects the same colliders as the player, you can follow these steps:

1. Load the blue ghost sprite in the `preload` function.
2. Create the ghost in the `create` function.
3. Implement random movement logic in the `update` function.

Here's how you can modify your existing code:

```jsx
function preload() {
    // Load Pacman sprite
    this.load.image('pacman', 'assets/pacman.png');

    // Load ghost sprites
    this.load.image('blue-ghost', 'assets/blue-ghost.png');
    this.load.image('red-ghost', 'assets/red-ghost.png');
    this.load.image('yellow-ghost', 'assets/yellow-ghost.png');

    // Load pellet sprite
    //this.load.image('pellet', 'assets/pellet.png');

    // Load tileset for the maze layout
    this.load.image('wall', 'assets/wall.png');

    // Load the tilemap JSON file (assuming you have a JSON file for the tilemap)
    //this.load.tilemapTiledJSON('maze', 'assets/maze.json'); // Adjust the path as necessary
}

function create() {
    const tileSize = 50; // Size of each rectangle (tile)

    // Define the maze layout using a 2D array
    const maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    // Create a static group for walls
    this.walls = this.physics.add.staticGroup();

    // Loop through the maze array to draw rectangles as walls
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 1) {
                // Add a rectangle at this grid position
                const wall = this.add.rectangle(
                    x * tileSize + tileSize / 2, // x position (centered in grid)
                    y * tileSize + tileSize / 2, // y position (centered in grid)
                    tileSize,                   // width
                    tileSize,                   // height
                    0x0000ff                    // color: blue
                );

                // Enable physics for the wall
                this.physics.add.existing(wall, true); // Static physics body
                this.walls.add(wall); // Add wall to the group
            }
        }
    }

    // Create the player (Pacman)
    this.player = this.physics.add.sprite(80, 80, 'pacman');
    this.player.setDisplaySize(tileSize * 0.6, tileSize * 0.6); // Adjust size to 80% of tile size
    this.player.setTint(0xffff00); // Set color to yellow (Pacman)
    this.player.body.setCollideWorldBounds(true);

    // Set collision between player and walls
    this.physics.add.collider(this.player, this.walls);

    // Create the blue ghost
    this.blueGhost = this.physics.add.sprite(100, 80, 'blue-ghost');
    this.blueGhost.setDisplaySize(tileSize * 0.6, tileSize * 0.6); // Adjust size to 80% of tile size
    this.blueGhost.setCollideWorldBounds(true);
    this.blueGhost.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.blueGhost, this.walls);

    // Add controls
    this.cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    // Reset player velocity
    this.player.setVelocity(0);

    // Check for arrow key presses and move accordingly
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-150);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(150);
    }

    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-150);
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(150);
    }

    // Random movement for the blue ghost
    const randomDirection = Phaser.Math.Between(0, 3);
    const speed = 50; // Speed of the ghost

    switch (randomDirection) {
        case 0: // Move left
            this.blueGhost.setVelocityX(-speed);
            this.blueGhost.setVelocityY(0);
            break;
        case 1: // Move right
            this.blueGhost.setVelocityX(speed);
            this.blueGhost.setVelocityY(0);
            break;
        case 2: // Move up
            this.blueGhost.setVelocityX(0);
            this.blueGhost.setVelocityY(-speed);
            break;
        case 3: // Move down
            this.blueGhost.setVelocityX(0);
            this.blueGhost.setVelocityY(speed);
            break;
    }
}

```

### Explanation:

- The blue ghost is created in the `create` function and added to the physics system with colliders.
- In the `update` function, the ghost's movement is randomized every frame. The ghost will move in one of four directions (left, right, up, down) based on a random number generated.
- The ghost's movement respects the same colliders as the player, ensuring it cannot pass through walls.

You may want to adjust the speed and the frequency of direction changes to make the ghost's movement more interesting.

# **Prompt 4 A**

It seems to be moving in the same spot instead of along the paths of the maze.

# **Result 4 A**

To ensure that the blue ghost moves along the paths of the maze instead of staying in the same spot, you need to implement a more sophisticated movement logic that checks for valid movement directions based on the maze layout.

Here's how you can modify the `update` function to allow the blue ghost to move randomly along the paths of the maze:

```jsx
function update() {
    // Reset player velocity
    this.player.setVelocity(0);

    // Check for arrow key presses and move accordingly
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-150);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(150);
    }

    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-150);
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(150);
    }

    // Random movement for the blue ghost
    const randomDirection = Phaser.Math.Between(0, 3);
    const speed = 50; // Speed of the ghost

    // Store the ghost's current position
    const ghostX = this.blueGhost.x;
    const ghostY = this.blueGhost.y;

    // Calculate potential new positions
    let newX = ghostX;
    let newY = ghostY;

    switch (randomDirection) {
        case 0: // Move left
            newX -= speed;
            break;
        case 1: // Move right
            newX += speed;
            break;
        case 2: // Move up
            newY -= speed;
            break;
        case 3: // Move down
            newY += speed;
            break;
    }

    // Check if the new position is valid (not colliding with walls)
    const tileX = Math.floor(newX / tileSize);
    const tileY = Math.floor(newY / tileSize);

    // Assuming maze is a 2D array where 0 is a path and 1 is a wall
    if (maze[tileY] && maze[tileY][tileX] === 0) {
        // Update ghost position if the new position is valid
        this.blueGhost.setPosition(newX, newY);
    }
}

```

### Explanation:

- The ghost's movement is now based on calculating potential new positions (`newX` and `newY`) based on the random direction chosen.
- Before moving the ghost, the code checks if the new position corresponds to a valid path in the maze (where `maze[tileY][tileX] === 0`).
- If the new position is valid, the ghost's position is updated using `this.blueGhost.setPosition(newX, newY);`.

This logic ensures that the blue ghost moves randomly along the paths of the maze while avoiding walls. Adjust the speed and frequency of direction changes as needed to create the desired ghost behavior.

# **Prompt 5 A**

main.js:148 Uncaught ReferenceError: maze is not defined

at initialize.update (main.js:148:5)

at initialize.step (phaser.min.js:1:225442)

at initialize.update (phaser.min.js:1:490723)

at initialize.step (phaser.min.js:1:793006)

at initialize.step (phaser.min.js:1:433503)

at t (phaser.min.js:1:434427)

# **Result 5 A**

The error `ReferenceError: maze is not defined` indicates that the `maze` variable is not accessible in the `update` function. To fix this, you need to define the `maze` variable in a scope that is accessible to both the `create` and `update` functions.

Here's how you can modify your code to ensure that the `maze` variable is defined correctly:

```jsx
let tileSize; // Declare tileSize at a higher scope
let maze; // Declare maze at a higher scope

function create() {
    tileSize = 50; // Initialize tileSize here

    // Define the maze layout using a 2D array
    maze = [ // Initialize maze here
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    // Create a static group for walls
    this.walls = this.physics.add.staticGroup();

    // Loop through the maze array to draw rectangles as walls
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 1) {
                // Add a rectangle at this grid position
                const wall = this.add.rectangle(
                    x * tileSize + tileSize / 2, // x position (centered in grid)
                    y * tileSize + tileSize / 2, // y position (centered in grid)
                    tileSize,                   // width
                    tileSize,                   // height
                    0x0000ff                    // color: blue
                );

                // Enable physics for the wall
                this.physics.add.existing(wall, true); // Static physics body
                this.walls.add(wall); // Add wall to the group
            }
        }
    }

    // Create the player (Pacman)
    this.player = this.physics.add.sprite(80, 80, 'pacman');
    this.player.setDisplaySize(tileSize * 0.6, tileSize * 0.6); // Adjust size to 80% of tile size
    this.player.setTint(0xffff00); // Set color to yellow (Pacman)
    this.player.body.setCollideWorldBounds(true);

    // Set collision between player and walls
    this.physics.add.collider(this.player, this.walls);

    // Create the blue ghost at a position within the maze
    this.blueGhost = this.physics.add.sprite(100, 80, 'blue-ghost');
    this.blueGhost.setDisplaySize(tileSize * 0.6, tileSize * 0.6); // Adjust size to 80% of tile size
    this.blueGhost.setCollideWorldBounds(true);
    this.blueGhost.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.blueGhost, this.walls);
}

function update() {
    // Reset player velocity
    this.player.setVelocity(0);

    // Check for arrow key presses and move accordingly
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-150);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(150);
    }

    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-150);
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(150);
    }

    // Random movement for the blue ghost
    const randomDirection = Phaser.Math.Between(0, 3);
    const speed = 50; // Speed of the ghost

    // Store the ghost's current position
    const ghostX = this.blueGhost.x;
    const ghostY = this.blueGhost.y;

    // Calculate potential new positions
    let newX = ghostX;
    let newY = ghostY;

    switch (randomDirection) {
        case 0: // Move left
            newX -= speed;
            break;
        case 1: // Move right
            newX += speed;
            break;
        case 2: // Move up
            newY -= speed;
            break;
        case 3: // Move down
            newY += speed;
            break;
    }

    // Check if the new position is valid (not colliding with walls)
    const tileX = Math.floor(newX / tileSize);
    const tileY = Math.floor(newY / tileSize);

    // Check if the new position is valid (not colliding with walls)
    if (maze[tileY] && maze[tileY][tileX] === 0) {
        // Update ghost position if the new position is valid
        this.blueGhost.setPosition(newX, newY);
    }
}

```

### Explanation:

- The `maze` variable is now declared at a higher scope (outside of the `create` function) so that it can be accessed in both the `create` and `update` functions.
- The `maze` is initialized in the `create` function, ensuring it has a value when used in the `update` function.

This should resolve the `ReferenceError` and allow the ghost to move correctly along the paths of the maze.

# **Prompt 6 A**

The ghost is moving erratically, and its movement is too fast. Additionally, it doesn’t respect the walls and moves through them.

# **Result 6 A**

To address the issues with the ghost's movement being erratic, too fast, and not respecting the walls, we can implement a more controlled movement system. Here are the steps to improve the ghost's behavior:

1. **Movement Speed**: Reduce the speed of the ghost to make it more manageable.
2. **Movement Logic**: Instead of moving the ghost every frame, we can set a timer to change its direction at regular intervals.
3. **Collision Detection**: Ensure that the ghost only moves to valid positions that are not walls.

Here's how you can modify your code:

```jsx
let tileSize; // Declare tileSize at a higher scope
let maze; // Declare maze at a higher scope

function create() {
    tileSize = 50; // Initialize tileSize here

    // Define the maze layout using a 2D array
    maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    // Create a static group for walls
    this.walls = this.physics.add.staticGroup();

    // Loop through the maze array to draw rectangles as walls
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 1) {
                // Add a rectangle at this grid position
                const wall = this.add.rectangle(
                    x * tileSize + tileSize / 2, // x position (centered in grid)
                    y * tileSize + tileSize / 2, // y position (centered in grid)
                    tileSize,                   // width
                    tileSize,                   // height
                    0x0000ff                    // color: blue
                );

                // Enable physics for the wall
                this.physics.add.existing(wall, true); // Static physics body
                this.walls.add(wall); // Add wall to the group
            }
        }
    }

    // Create the player (Pacman)
    this.player = this.physics.add.sprite(80, 80, 'pacman');
    this.player.setDisplaySize(tileSize * 0.6, tileSize * 0.6); // Adjust size to 80% of tile size
    this.player.setTint(0xffff00); // Set color to yellow (Pacman)
    this.player.body.setCollideWorldBounds(true);

    // Set collision between player and walls
    this.physics.add.collider(this.player, this.walls);

    // Create the blue ghost at a position within the maze
    this.blueGhost = this.physics.add.sprite(100, 80, 'blue-ghost');
    this.blueGhost.setDisplaySize(tileSize * 0.6, tileSize * 0.6); // Adjust size to 80% of tile size
    this.blueGhost.setCollideWorldBounds(true);
    this.blueGhost.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.blueGhost, this.walls);

    // Set a timer for the ghost to change direction every second
    this.time.addEvent({
        delay: 1000, // Change direction every second
        callback: changeGhostDirection,
        callbackScope: this,
        loop: true
    });

    this.ghostDirection = Phaser.Math.Between(0, 3); // Initial random direction
}

function changeGhostDirection() {
    const speed = 50; // Speed of the ghost
    const ghostX = this.blueGhost.x;
    const ghostY = this.blueGhost.y;

    // Calculate potential new positions
    let newX = ghostX;
    let newY = ghostY;

    switch (this.ghostDirection) {
        case 0: // Move left
            newX -= speed;
            break;
        case 1: // Move right
            newX += speed;
            break;
        case 2: // Move up
            newY -= speed;
            break;
        case 3: // Move down
            newY += speed;
            break;
    }

    // Check if the new position is valid (not colliding with walls)
    const tileX = Math.floor(newX / tileSize);
    const tileY = Math.floor(newY / tileSize);

    // Check if the new position is valid (not colliding with walls)
    if (maze[tileY] && maze[tileY][tileX] === 0) {
        // Update ghost position if the new position is valid
        this.blueGhost.setPosition(newX, newY);
    } else {
        // If the new position is invalid, change direction
        this.ghostDirection = Phaser.Math.Between(0, 3);
    }
}

function update() {
    // Reset player velocity
    this.player.setVelocity(0);

    // Check for arrow key presses and move accordingly
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-150);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(150);
    }

    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-150);
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(150);
    }
}

```

### Explanation:

1. **Movement Speed**: The speed of the ghost is set to `50`, which is more manageable.
2. **Controlled Movement**: A timer is set up using `this.time.addEvent` to change the ghost's direction every second. This prevents the ghost from moving every frame, which was causing erratic behavior.
3. **Collision Detection**: Before moving the ghost, the code checks if the new position is valid (not colliding with walls). If the new position is invalid, the ghost changes its direction randomly.

This should result in smoother and more controlled movement for the ghost, while also ensuring it respects the walls of the maze. Adjust the speed and timer delay as needed to achieve the desired behavior.

# **Prompt 7 A**

main.js:150 Uncaught TypeError: Cannot read properties of undefined (reading 'left')

at initialize.update (main.js:150:22)

at initialize.step (phaser.min.js:1:225442)

at initialize.update (phaser.min.js:1:490723)

at initialize.step (phaser.min.js:1:793006)

at initialize.step (phaser.min.js:1:433503)

at t (phaser.min.js:1:434427)

# **Result 7 A**

The error `TypeError: Cannot read properties of undefined (reading 'left')` indicates that the `this.cursors` object is not defined in the `update` function. This typically happens if the `cursors` variable is not initialized properly in the `create` function.

To fix this, ensure that you create the cursor keys in the `create` function. Here’s how you can modify your code:

```jsx
let tileSize; // Declare tileSize at a higher scope
let maze; // Declare maze at a higher scope

function create() {
    tileSize = 50; // Initialize tileSize here

    // Define the maze layout using a 2D array
    maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    // Create a static group for walls
    this.walls = this.physics.add.staticGroup();

    // Loop through the maze array to draw rectangles as walls
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 1) {
                // Add a rectangle at this grid position
                const wall = this.add.rectangle(
                    x * tileSize + tileSize / 2, // x position (centered in grid)
                    y * tileSize + tileSize / 2, // y position (centered in grid)
                    tileSize,                   // width
                    tileSize,                   // height
                    0x0000ff                    // color: blue
                );

                // Enable physics for the wall
                this.physics.add.existing(wall, true); // Static physics body
                this.walls.add(wall); // Add wall to the group
            }
        }
    }

    // Create the player (Pacman)
    this.player = this.physics.add.sprite(80, 80, 'pacman');
    this.player.setDisplaySize(tileSize * 0.6, tileSize * 0.6); // Adjust size to 80% of tile size
    this.player.setTint(0xffff00); // Set color to yellow (Pacman)
    this.player.body.setCollideWorldBounds(true);

    // Set collision between player and walls
    this.physics.add.collider(this.player, this.walls);

    // Create the blue ghost at a position within the maze
    this.blueGhost = this.physics.add.sprite(100, 80, 'blue-ghost');
    this.blueGhost.setDisplaySize(tileSize * 0.6, tileSize * 0.6); // Adjust size to 80% of tile size
    this.blueGhost.setCollideWorldBounds(true);
    this.blueGhost.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.blueGhost, this.walls);

    // Create cursor keys for player movement
    this.cursors = this.input.keyboard.createCursorKeys(); // Initialize cursors

    // Set a timer for the ghost to change direction every second
    this.time.addEvent({
        delay: 1000, // Change direction every second
        callback: changeGhostDirection,
        callbackScope: this,
        loop: true
    });

    this.ghostDirection = Phaser.Math.Between(0, 3); // Initial random direction
}

function changeGhostDirection() {
    const speed = 50; // Speed of the ghost
    const ghostX = this.blueGhost.x;
    const ghostY = this.blueGhost.y;

    // Calculate potential new positions
    let newX = ghostX;
    let newY = ghostY;

    switch (this.ghostDirection) {
        case 0: // Move left
            newX -= speed;
            break;
        case 1: // Move right
            newX += speed;
            break;
        case 2: // Move up
            newY -= speed;
            break;
        case 3: // Move down
            newY += speed;
            break;
    }

    // Check if the new position is valid (not colliding with walls)
    const tileX = Math.floor(newX / tileSize);
    const tileY = Math.floor(newY / tileSize);

    // Check if the new position is valid (not colliding with walls)
    if (maze[tileY] && maze[tileY][tileX] === 0) {
        // Update ghost position if the new position is valid
        this.blueGhost.setPosition(newX, newY);
    } else {
        // If the new position is invalid, change direction
        this.ghostDirection = Phaser.Math.Between(0, 3);
    }
}

function update() {
    // Reset player velocity
    this.player.setVelocity(0);

    // Check for arrow key presses and move accordingly
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-150);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(150);
    }

    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-150);
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(150);
    }
}

```

### Explanation:

- The line `this.cursors = this.input.keyboard.createCursorKeys();` has been added to the `create` function to initialize the cursor keys for player movement.
- This ensures that `this.cursors` is defined and accessible in the `update` function, preventing the `TypeError`.

With this change, the player should be able to move using the arrow keys without encountering the error.

# **Prompt 8 A**

The ghost's movement feels paused, and I don’t want that. I want the ghost’s movement to be smooth and slightly slower than the player's @main.js 

# **Result 8 A**

To achieve smooth movement for the ghost while ensuring it moves slightly slower than the player, you can modify the ghost's movement logic to update its position continuously rather than only at set intervals. This can be done by using a velocity-based approach instead of setting its position directly.

Here’s how you can adjust your code:

1. **Use Velocity for Movement**: Instead of setting the ghost's position directly, set its velocity based on the current direction.
2. **Adjust Speed**: Set the ghost's speed to be slightly less than the player's speed.

Here's the updated code:

```jsx
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: 0,
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

function preload() {
    // Load Pacman sprite
    this.load.image('pacman', 'assets/pacman.png');

    // Load ghost sprites
    this.load.image('blue-ghost', 'assets/blue-ghost.png');
    this.load.image('red-ghost', 'assets/red-ghost.png');
    this.load.image('yellow-ghost', 'assets/yellow-ghost.png');

    // Load pellet sprite
    //this.load.image('pellet', 'assets/pellet.png');

    // Load tileset for the maze layout
    this.load.image('wall', 'assets/wall.png');
}

let tileSize; // Declare tileSize at a higher scope
let maze; // Declare maze at a higher scope

function create() {
    tileSize = 50; // Initialize tileSize here

    // Define the maze layout using a 2D array
    maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    // Create a static group for walls
    this.walls = this.physics.add.staticGroup();

    // Loop through the maze array to draw rectangles as walls
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 1) {
                // Add a rectangle at this grid position
                const wall = this.add.rectangle(
                    x * tileSize + tileSize / 2, // x position (centered in grid)
                    y * tileSize + tileSize / 2, // y position (centered in grid)
                    tileSize,                   // width
                    tileSize,                   // height
                    0x0000ff                    // color: blue
                );

                // Enable physics for the wall
                this.physics.add.existing(wall, true); // Static physics body
                this.walls.add(wall); // Add wall to the group
            }
        }
    }

    // Create the player (Pacman)
    this.player = this.physics.add.sprite(80, 80, 'pacman');
    this.player.setDisplaySize(tileSize * 0.6, tileSize * 0.6); // Adjust size to 80% of tile size
    this.player.setTint(0xffff00); // Set color to yellow (Pacman)
    this.player.body.setCollideWorldBounds(true);

    // Set collision between player and walls
    this.physics.add.collider(this.player, this.walls);

    // Create the blue ghost at a position within the maze
    this.blueGhost = this.physics.add.sprite(100, 80, 'blue-ghost');
    this.blueGhost.setDisplaySize(tileSize * 0.6, tileSize * 0.6); // Adjust size to 80% of tile size
    this.blueGhost.setCollideWorldBounds(true);
    this.blueGhost.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.blueGhost, this.walls);

    // Create cursor keys for player movement
    this.cursors = this.input.keyboard.createCursorKeys(); // Initialize cursors

    // Set initial ghost direction
    this.ghostDirection = Phaser.Math.Between(0, 3); // Initial random direction
}

function update() {
    // Reset player velocity
    this.player.setVelocity(0);

    // Check for arrow key presses and move accordingly
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-150);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(150);
    }

    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-150);
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(150);
    }

    // Smooth movement for the ghost
    moveGhost.call(this);
}

function moveGhost() {
    const speed = 100; // Speed of the ghost (slightly slower than player)
    const ghostX = this.blueGhost.x;
    const ghostY = this.blueGhost.y;

    // Calculate potential new positions
    let newX = ghostX;
    let newY = ghostY;

    switch (this.ghostDirection) {
        case 0: // Move left
            newX -= speed * this.game.loop.delta / 1000; // Adjust speed based on frame time
            break;
        case 1: // Move right
            newX += speed * this.game.loop.delta / 1000; // Adjust speed based on frame time
            break;
        case 2: // Move up
            newY -= speed * this.game.loop.delta / 1000; // Adjust speed based on frame time
            break;
        case 3: // Move down
            newY += speed * this.game.loop.delta / 1000; // Adjust speed based on frame time
            break;
    }

    // Check if the new position is valid (not colliding with walls)
    const tileX = Math.floor(newX / tileSize);
    const tileY = Math.floor(newY / tileSize);

    // Check if the new position is valid (not colliding with walls)
    if (maze[tileY] && maze[tileY][tileX] === 0) {
        // Update ghost position if the new position is valid
        this.blueGhost.setPosition(newX, newY);
    } else {
        // If the new position is invalid, change direction
        this.ghostDirection = Phaser.Math.Between(0, 3);
    }

    // Change direction randomly every few seconds
    if (Phaser.Math.Between(0, 100) < 1) { // 1% chance to change direction
        this.ghostDirection = Phaser.Math.Between(0, 3);
    }
}

```

### Explanation:

1. **Smooth Movement**: The ghost's movement is now handled in the `moveGhost` function, which is called every frame in the `update` function. The ghost's position is updated based on its velocity and the time elapsed since the last frame (`this.game.loop.delta`).
2. **Speed Adjustment**: The ghost's speed is set to `100`, which is slightly slower than the player's speed of `150`.
3. **Random Direction Change**: The ghost will change direction randomly with a small chance every frame, making its movement less predictable and more dynamic.

This should result in smoother and more natural movement for the ghost while keeping it slightly slower than the player. Adjust the speed and the random direction change probability as needed to achieve the desired behavior.

# **Prompt 9 A**

As we add blue-ghost, now add red-ghost and yellow-ghost 

# **Result 9 A**

To add the red and yellow ghosts to your game, you can follow the same approach used for the blue ghost. Below is the modified code for the `create` function, where we will create instances for both the red and yellow ghosts, similar to how the blue ghost was created.

Here's the updated code snippet:

```jsx
function create() {
    tileSize = 50; // Initialize tileSize here

    // Define the maze layout using a 2D array
    maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    // Create a static group for walls
    this.walls = this.physics.add.staticGroup();

    // Loop through the maze array to draw rectangles as walls
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 1) {
                // Add a rectangle at this grid position
                const wall = this.add.rectangle(
                    x * tileSize + tileSize / 2, // x position (centered in grid)
                    y * tileSize + tileSize / 2, // y position (centered in grid)
                    tileSize,                   // width
                    tileSize,                   // height
                    0x0000ff                    // color: blue
                );

                // Enable physics for the wall
                this.physics.add.existing(wall, true); // Static physics body
                this.walls.add(wall); // Add wall to the group
            }
        }
    }

    // Create the player (Pacman)
    this.player = this.physics.add.sprite(80, 80, 'pacman');
    this.player.setDisplaySize(tileSize * 0.6, tileSize * 0.6); // Adjust size to 80% of tile size
    this.player.setTint(0xffff00); // Set color to yellow (Pacman)
    this.player.body.setCollideWorldBounds(true);

    // Set collision between player and walls
    this.physics.add.collider(this.player, this.walls);

    // Create the blue ghost at a position within the maze
    this.blueGhost = this.physics.add.sprite(100, 80, 'blue-ghost');
    this.blueGhost.setDisplaySize(tileSize * 0.6, tileSize * 0.6); // Adjust size to 80% of tile size
    this.blueGhost.setCollideWorldBounds(true);
    this.blueGhost.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.blueGhost, this.walls);

    // Create the red ghost at a position within the maze
    this.redGhost = this.physics.add.sprite(120, 80, 'red-ghost');
    this.redGhost.setDisplaySize(tileSize * 0.6, tileSize * 0.6); // Adjust size to 80% of tile size
    this.redGhost.setCollideWorldBounds(true);
    this.redGhost.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.redGhost, this.walls);

    // Create the yellow ghost at a position within the maze
    this.yellowGhost = this.physics.add.sprite(140, 80, 'yellow-ghost');
    this.yellowGhost.setDisplaySize(tileSize * 0.6, tileSize * 0.6); // Adjust size to 80% of tile size
    this.yellowGhost.setCollideWorldBounds(true);
    this.yellowGhost.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.yellowGhost, this.walls);

    // Create cursor keys for player movement
    this.cursors = this.input.keyboard.createCursorKeys(); // Initialize cursors

    // Set initial ghost direction
    this.ghostDirection = Phaser.Math.Between(0, 3); // Initial random direction
}

```

### Summary of Changes:

- Added the creation of `redGhost` and `yellowGhost` similar to `blueGhost`.
- Set their initial positions and properties, including collision handling.

Make sure to adjust the ghost movement logic in the `update` function if you want them to move similarly to the blue ghost.

# **Prompt 10 A**

Now add the movement for  red-ghost and yellow-ghost 

# **Result 10 A**

To add movement for the red and yellow ghosts similar to the blue ghost, you can modify the `update` function to include movement logic for all three ghosts. Below is the updated code snippet that includes movement for the red and yellow ghosts.

Here's the modified code:

```jsx
function update() {
    // Reset player velocity
    this.player.setVelocity(0);

    // Check for arrow key presses and move accordingly
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-150);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(150);
    }

    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-150);
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(150);
    }

    // Smooth movement for the ghosts
    moveGhost.call(this, this.blueGhost);
    moveGhost.call(this, this.redGhost);
    moveGhost.call(this, this.yellowGhost);
}

function moveGhost(ghost) {
    const speed = 100; // Speed of the ghost (slightly slower than player)
    const ghostX = ghost.x;
    const ghostY = ghost.y;

    // Calculate potential new positions
    let newX = ghostX;
    let newY = ghostY;

    switch (this.ghostDirection) {
        case 0: // Move left
            newX -= speed * this.game.loop.delta / 1000; // Adjust speed based on frame time
            break;
        case 1: // Move right
            newX += speed * this.game.loop.delta / 1000; // Adjust speed based on frame time
            break;
        case 2: // Move up
            newY -= speed * this.game.loop.delta / 1000; // Adjust speed based on frame time
            break;
        case 3: // Move down
            newY += speed * this.game.loop.delta / 1000; // Adjust speed based on frame time
            break;
    }

    // Check if the new position is valid (not colliding with walls)
    const tileX = Math.floor(newX / tileSize);
    const tileY = Math.floor(newY / tileSize);

    // Check if the new position is valid (not colliding with walls)
    if (maze[tileY] && maze[tileY][tileX] === 0) {
        // Update ghost position if the new position is valid
        ghost.setPosition(newX, newY);
    } else {
        // If the new position is invalid, change direction
        this.ghostDirection = Phaser.Math.Between(0, 3);
    }

    // Change direction randomly every few seconds
    if (Phaser.Math.Between(0, 100) < 1) { // 1% chance to change direction
        this.ghostDirection = Phaser.Math.Between(0, 3);
    }
}

```

### Summary of Changes:

- Updated the `update` function to call `moveGhost` for `redGhost` and `yellowGhost`, in addition to `blueGhost`.
- Modified the `moveGhost` function to accept a `ghost` parameter, allowing it to handle movement for any ghost passed to it.

This will ensure that all three ghosts move according to the same logic, providing a consistent behavior across them. You may want to implement different movement patterns or speeds for each ghost later for added complexity.

# **Prompt 11 A**

The ghosts are moving together. I want them to move separately.

# **Result 11 A**

To make the ghosts move separately, you need to assign each ghost its own direction and update their movement logic accordingly. This involves creating a separate direction for each ghost and updating their positions independently in the `update` function.

Here's how you can modify the code to achieve this:

### Updated Code Snippet

```jsx
let ghostDirections = {
    blue: Phaser.Math.Between(0, 3),
    red: Phaser.Math.Between(0, 3),
    yellow: Phaser.Math.Between(0, 3)
};

function create() {
    // ... existing code ...

    // Set initial ghost directions
    ghostDirections.blue = Phaser.Math.Between(0, 3);
    ghostDirections.red = Phaser.Math.Between(0, 3);
    ghostDirections.yellow = Phaser.Math.Between(0, 3);
}

function update() {
    // Reset player velocity
    this.player.setVelocity(0);

    // Check for arrow key presses and move accordingly
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-150);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(150);
    }

    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-150);
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(150);
    }

    // Smooth movement for the ghosts
    moveGhost.call(this, this.blueGhost, ghostDirections.blue);
    moveGhost.call(this, this.redGhost, ghostDirections.red);
    moveGhost.call(this, this.yellowGhost, ghostDirections.yellow);
}

function moveGhost(ghost, direction) {
    const speed = 100; // Speed of the ghost (slightly slower than player)
    const ghostX = ghost.x;
    const ghostY = ghost.y;

    // Calculate potential new positions
    let newX = ghostX;
    let newY = ghostY;

    switch (direction) {
        case 0: // Move left
            newX -= speed * this.game.loop.delta / 1000; // Adjust speed based on frame time
            break;
        case 1: // Move right
            newX += speed * this.game.loop.delta / 1000; // Adjust speed based on frame time
            break;
        case 2: // Move up
            newY -= speed * this.game.loop.delta / 1000; // Adjust speed based on frame time
            break;
        case 3: // Move down
            newY += speed * this.game.loop.delta / 1000; // Adjust speed based on frame time
            break;
    }

    // Check if the new position is valid (not colliding with walls)
    const tileX = Math.floor(newX / tileSize);
    const tileY = Math.floor(newY / tileSize);

    // Check if the new position is valid (not colliding with walls)
    if (maze[tileY] && maze[tileY][tileX] === 0) {
        // Update ghost position if the new position is valid
        ghost.setPosition(newX, newY);
    } else {
        // If the new position is invalid, change direction
        direction = Phaser.Math.Between(0, 3);
    }

    // Change direction randomly every few seconds
    if (Phaser.Math.Between(0, 100) < 1) { // 1% chance to change direction
        direction = Phaser.Math.Between(0, 3);
    }

    // Update the ghost's direction in the ghostDirections object
    if (ghost === this.blueGhost) {
        ghostDirections.blue = direction;
    } else if (ghost === this.redGhost) {
        ghostDirections.red = direction;
    } else if (ghost === this.yellowGhost) {
        ghostDirections.yellow = direction;
    }
}

```

### Summary of Changes:

- Introduced a `ghostDirections` object to store the current direction for each ghost.
- Updated the `create` function to initialize the directions for each ghost.
- Modified the `update` function to pass the specific ghost's direction to the `moveGhost` function.
- Updated the `moveGhost` function to accept a `direction` parameter, allowing each ghost to move independently based on its own direction.
- Each ghost's direction is updated separately, ensuring they can change direction independently.

With these changes, each ghost will now move separately and can change direction independently of the others.

# **Prompt 12 A**

Now make the ghosts start from the middle of the maze.

# **Result 12 A**

To make the ghosts start from the middle of the maze, you need to calculate the center position based on the maze dimensions and set the initial positions of the ghosts accordingly.

Assuming the maze is defined as a 2D array, you can find the center by using the dimensions of the maze. Here's how you can modify the `create` function to position the ghosts in the middle of the maze:

### Updated Code Snippet

```jsx
function create() {
    tileSize = 50; // Initialize tileSize here

    // Define the maze layout using a 2D array
    maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    // Create a static group for walls
    this.walls = this.physics.add.staticGroup();

    // Loop through the maze array to draw rectangles as walls
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 1) {
                // Add a rectangle at this grid position
                const wall = this.add.rectangle(
                    x * tileSize + tileSize / 2, // x position (centered in grid)
                    y * tileSize + tileSize / 2, // y position (centered in grid)
                    tileSize,                   // width
                    tileSize,                   // height
                    0x0000ff                    // color: blue
                );

                // Enable physics for the wall
                this.physics.add.existing(wall, true); // Static physics body
                this.walls.add(wall); // Add wall to the group
            }
        }
    }

    // Create the player (Pacman)
    this.player = this.physics.add.sprite(80, 80, 'pacman');
    this.player.setDisplaySize(tileSize * 0.6, tileSize * 0.6); // Adjust size to 80% of tile size
    this.player.setTint(0xffff00); // Set color to yellow (Pacman)
    this.player.body.setCollideWorldBounds(true);

    // Set collision between player and walls
    this.physics.add.collider(this.player, this.walls);

    // Calculate the center position of the maze
    const centerX = Math.floor(maze[0].length / 2) * tileSize + tileSize / 2;
    const centerY = Math.floor(maze.length / 2) * tileSize + tileSize / 2;

    // Create the blue ghost at the center of the maze
    this.blueGhost = this.physics.add.sprite(centerX, centerY, 'blue-ghost');
    this.blueGhost.setDisplaySize(tileSize * 0.6, tileSize * 0.6); // Adjust size to 80% of tile size
    this.blueGhost.setCollideWorldBounds(true);
    this.blueGhost.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.blueGhost, this.walls);

    // Create the red ghost at the center of the maze
    this.redGhost = this.physics.add.sprite(centerX, centerY, 'red-ghost');
    this.redGhost.setDisplaySize(tileSize * 0.6, tileSize * 0.6); // Adjust size to 80% of tile size
    this.redGhost.setCollideWorldBounds(true);
    this.redGhost.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.redGhost, this.walls);

    // Create the yellow ghost at the center of the maze
    this.yellowGhost = this.physics.add.sprite(centerX, centerY, 'yellow-ghost');
    this.yellowGhost.setDisplaySize(tileSize * 0.6, tileSize * 0.6); // Adjust size to 80% of tile size
    this.yellowGhost.setCollideWorldBounds(true);
    this.yellowGhost.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.yellowGhost, this.walls);

    // Create cursor keys for player movement
    this.cursors = this.input.keyboard.createCursorKeys(); // Initialize cursors

    // Set initial ghost directions
    ghostDirections.blue = Phaser.Math.Between(0, 3);
    ghostDirections.red = Phaser.Math.Between(0, 3);
    ghostDirections.yellow = Phaser.Math.Between(0, 3);
}

```

### Summary of Changes:

- Calculated the center position of the maze using the dimensions of the maze array.
- Set the initial positions of the blue, red, and yellow ghosts to the calculated center position.

With these changes, all three ghosts will now start from the center of the maze. You may want to adjust their initial directions to ensure they move away from the center when the game starts.

# **Prompt 13 A**

Now implement functionality so that when the player collides with any ghost, the game restarts.

# Result **13 A**

If the game is not restarting upon collision with the ghosts, there may be a few reasons for this. Let's ensure that the collision detection is set up correctly and that the `restartGame` function is being called as expected.

Here’s a step-by-step approach to troubleshoot and implement the functionality correctly:

### 1. Ensure Collision Detection is Set Up Correctly

Make sure that the ghosts and the player have physics bodies and that the collision detection is properly configured. The ghosts should be added to the physics world, and the player should also have a physics body.

### 2. Check the `restartGame` Function

Make sure the `restartGame` function is defined correctly and is being called when a collision occurs.

### 3. Updated Code Snippet

Here’s the complete code with the necessary checks and adjustments:

```jsx
function create() {
    tileSize = 50; // Initialize tileSize here

    // Define the maze layout using a 2D array
    maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    // Create a static group for walls
    this.walls = this.physics.add.staticGroup();

    // Loop through the maze array to draw rectangles as walls
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 1) {
                const wall = this.add.rectangle(
                    x * tileSize + tileSize / 2,
                    y * tileSize + tileSize / 2,
                    tileSize,
                    tileSize,
                    0x0000ff
                );

                this.physics.add.existing(wall, true);
                this.walls.add(wall);
            }
        }
    }

    // Create the player (Pacman)
    this.player = this.physics.add.sprite(80, 80, 'pacman');
    this.player.setDisplaySize(tileSize * 0.6, tileSize * 0.6);
    this.player.setTint(0xffff00);
    this.player.body.setCollideWorldBounds(true);

    // Set collision between player and walls
    this.physics.add.collider(this.player, this.walls);

    // Create ghosts at the center of the maze
    const centerX = Math.floor(maze[0].length / 2) * tileSize + tileSize / 2;
    const centerY = Math.floor(maze.length / 2) * tileSize + tileSize / 2;

    this.blueGhost = this.physics.add.sprite(centerX, centerY, 'blue-ghost');
    this.redGhost = this.physics.add.sprite(centerX, centerY, 'red-ghost');
    this.yellowGhost = this.physics.add.sprite(centerX, centerY, 'yellow-ghost');

    // Set display size and collision for ghosts
    [this.blueGhost, this.redGhost, this.yellowGhost].forEach(ghost => {
        ghost.setDisplaySize(tileSize * 0.6, tileSize * 0.6);
        ghost.setCollideWorldBounds(true);
        this.physics.add.collider(ghost, this.walls);
    });

    // Set collision between player and ghosts
    this.physics.add.collider(this.player, this.blueGhost, restartGame, null, this);
    this.physics.add.collider(this.player, this.redGhost, restartGame, null, this);
    this.physics.add.collider(this.player, this.yellowGhost, restartGame, null, this);

    // Create cursor keys for player movement
    this.cursors = this.input.keyboard.createCursorKeys();
}

function restartGame() {
    console.log("Game Restarted"); // Debugging line to check if the function is called
    this.scene.restart();
}

function update() {
    // Reset player velocity
    this.player.setVelocity(0);

    // Check for arrow key presses and move accordingly
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-150);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(150);
    }

    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-150);
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(150);
    }

    // Smooth movement for the ghosts
    moveGhost.call(this, this.blueGhost, ghostDirections.blue);
    moveGhost.call(this, this.redGhost, ghostDirections.red);
    moveGhost.call(this, this.yellowGhost, ghostDirections.yellow);
}

// Existing moveGhost function...

```

### Key Points to Check:

1. **Collision Setup**: Ensure that the player and ghosts have physics bodies and that the collision detection is set up correctly.
2. **Debugging**: I've added a `console.log("Game Restarted");` line in the `restartGame` function. Check the console in your browser's developer tools to see if this message appears when the player collides with a ghost. If it does not appear, the collision detection is not working as expected.
3. **Scene Restart**: The `this.scene.restart();` method should reset the game state. If the game is still not restarting, ensure that there are no errors in the console that might be preventing the function from executing.

With these adjustments, the game should restart when the player collides with any ghost. If you continue to experience issues, please check for any console errors or additional logic that might be interfering with the collision detection.

# **Prompt 14 A**

Now create pellets placed along the paths, and when the player collides with each one, remove the pellet from the scene, as if the player is eating them.

# **Result14 A**

To reduce the size of the pellets, you can adjust the radius of the circle used to create the pellets. In the previous code, the size of the pellets was set to `tileSize * 0.2`. You can decrease this value to make the pellets smaller.

### Updated Code Snippet

Here’s the modified code with a smaller pellet size:

```jsx
let pellets; // Declare a variable to hold the pellets

function create() {
    tileSize = 50; // Initialize tileSize here

    // Define the maze layout using a 2D array
    maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    // Create a static group for walls
    this.walls = this.physics.add.staticGroup();

    // Create a group for pellets
    pellets = this.physics.add.group(); // Initialize the pellets group

    // Loop through the maze array to draw rectangles as walls and create pellets
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 1) {
                const wall = this.add.rectangle(
                    x * tileSize + tileSize / 2,
                    y * tileSize + tileSize / 2,
                    tileSize,
                    tileSize,
                    0x0000ff
                );

                this.physics.add.existing(wall, true);
                this.walls.add(wall);
            } else if (maze[y][x] === 0) {
                // Create smaller pellets along the paths
                const pellet = this.add.circle(
                    x * tileSize + tileSize / 2,
                    y * tileSize + tileSize / 2,
                    tileSize * 0.1, // Reduced pellet size
                    0xffff00 // Color: yellow
                );
                pellet.setName('pellet'); // Set a name for easy identification
                this.physics.add.existing(pellet); // Add physics to the pellet
                pellet.body.setCollideWorldBounds(true); // Ensure it doesn't go out of bounds
                pellet.body.immovable = true; // Make it immovable

                // Add the pellet to the pellets group
                pellets.add(pellet);
            }
        }
    }

    // Create the player (Pacman)
    this.player = this.physics.add.sprite(80, 80, 'pacman');
    this.player.setDisplaySize(tileSize * 0.6, tileSize * 0.6);
    this.player.setTint(0xffff00);
    this.player.body.setCollideWorldBounds(true);

    // Set collision between player and walls
    this.physics.add.collider(this.player, this.walls);

    // Create ghosts at the center of the maze
    const centerX = Math.floor(maze[0].length / 2) * tileSize + tileSize / 2;
    const centerY = Math.floor(maze.length / 2) * tileSize + tileSize / 2;

    this.blueGhost = this.physics.add.sprite(centerX, centerY, 'blue-ghost');
    this.redGhost = this.physics.add.sprite(centerX, centerY, 'red-ghost');
    this.yellowGhost = this.physics.add.sprite(centerX, centerY, 'yellow-ghost');

    // Set display size and collision for ghosts
    [this.blueGhost, this.redGhost, this.yellowGhost].forEach(ghost => {
        ghost.setDisplaySize(tileSize * 0.6, tileSize * 0.6);
        ghost.setCollideWorldBounds(true);
        this.physics.add.collider(ghost, this.walls);
    });

    // Set collision between player and ghosts
    this.physics.add.collider(this.player, this.blueGhost, restartGame, null, this);
    this.physics.add.collider(this.player, this.redGhost, restartGame, null, this);
    this.physics.add.collider(this.player, this.yellowGhost, restartGame, null, this);

    // Set collision between player and pellets
    this.physics.add.overlap(this.player, pellets, collectPellet, null, this);

    // Create cursor keys for player movement
    this.cursors = this.input.keyboard.createCursorKeys();
}

function collectPellet(player, pellet) {
    pellet.destroy(); // Remove the pellet from the scene
}

function restartGame() {
    console.log("Game Restarted"); // Debugging line to check if the function is called
    this.scene.restart();
}

function update() {
    // Reset player velocity
    this.player.setVelocity(0);

    // Check for arrow key presses and move accordingly
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-150);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(150);
    }

    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-150);
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(150);
    }

    // Smooth movement for the ghosts
    moveGhost.call(this, this.blueGhost, ghostDirections.blue);
    moveGhost.call(this, this.redGhost, ghostDirections.red);
    moveGhost.call(this, this.yellowGhost, ghostDirections.yellow);
}

```

### Summary of Changes:

- **Reduced Pellet Size**: Changed the pellet size from `tileSize * 0.2` to `tileSize * 0.1` to make the pellets smaller.

### Explanation:

- By reducing the size of the pellets, they will now appear smaller on the screen, making them easier to collect and visually more appropriate for the game.

With this change, the pellets should now be smaller and fit better within the game environment. You can adjust the size further if needed by changing the multiplier used for the pellet radius.

# **Prompt 15 A**

In the corners of the paths in the maze, we need to add a pellet that is bigger than the others., there need to be inside the paths not the walls

# **Result15 A**

To ensure that the larger pellets are placed inside the paths of the maze and not on the walls, we need to adjust the positions where the larger pellets are created. The larger pellets should be placed at valid path coordinates (where the maze value is `0`).

### Updated Code Snippet

Here’s how you can modify the code to correctly place the larger pellets within the paths of the maze:

```jsx
let pellets; // Declare a variable to hold the pellets

function create() {
    tileSize = 50; // Initialize tileSize here

    // Define the maze layout using a 2D array
    maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    // Create a static group for walls
    this.walls = this.physics.add.staticGroup();

    // Create a group for pellets
    pellets = this.physics.add.group(); // Initialize the pellets group

    // Loop through the maze array to draw rectangles as walls and create pellets
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 1) {
                const wall = this.add.rectangle(
                    x * tileSize + tileSize / 2,
                    y * tileSize + tileSize / 2,
                    tileSize,
                    tileSize,
                    0x0000ff
                );

                this.physics.add.existing(wall, true);
                this.walls.add(wall);
            } else if (maze[y][x] === 0) {
                // Create smaller pellets along the paths
                const pellet = this.add.circle(
                    x * tileSize + tileSize / 2,
                    y * tileSize + tileSize / 2,
                    tileSize * 0.1, // Normal pellet size
                    0xffff00 // Color: yellow
                );
                pellet.setName('pellet'); // Set a name for easy identification
                this.physics.add.existing(pellet); // Add physics to the pellet
                pellet.body.setCollideWorldBounds(true); // Ensure it doesn't go out of bounds
                pellet.body.immovable = true; // Make it immovable

                // Add the pellet to the pellets group
                pellets.add(pellet);
            }
        }
    }

    // Create larger pellets in the corners of the paths
    const cornerPelletSize = tileSize * 0.2; // Size for corner pellets
    const cornerPositions = [
        { x: 1, y: 1 }, // Top-left corner (valid path)
        { x: 1, y: 5 }, // Bottom-left corner (valid path)
        { x: 6, y: 1 }, // Top-right corner (valid path)
        { x: 6, y: 5 }  // Bottom-right corner (valid path)
    ];

    cornerPositions.forEach(pos => {
        const cornerPellet = this.add.circle(
            pos.x * tileSize + tileSize / 2,
            pos.y * tileSize + tileSize / 2,
            cornerPelletSize, // Larger size for corner pellets
            0xffff00 // Color: yellow
        );
        cornerPellet.setName('cornerPellet'); // Set a name for easy identification
        this.physics.add.existing(cornerPellet); // Add physics to the corner pellet
        cornerPellet.body.setCollideWorldBounds(true); // Ensure it doesn't go out of bounds
        cornerPellet.body.immovable = true; // Make it immovable

        // Add the corner pellet to the pellets group
        pellets.add(cornerPellet);
    });

    // Create the player (Pacman)
    this.player = this.physics.add.sprite(80, 80, 'pacman');
    this.player.setDisplaySize(tileSize * 0.6, tileSize * 0.6);
    this.player.setTint(0xffff00);
    this.player.body.setCollideWorldBounds(true);

    // Set collision between player and walls
    this.physics.add.collider(this.player, this.walls);

    // Create ghosts at the center of the maze
    const centerX = Math.floor(maze[0].length / 2) * tileSize + tileSize / 2;
    const centerY = Math.floor(maze.length / 2) * tileSize + tileSize / 2;

    this.blueGhost = this.physics.add.sprite(centerX, centerY, 'blue-ghost');
    this.redGhost = this.physics.add.sprite(centerX, centerY, 'red-ghost');
    this.yellowGhost = this.physics.add.sprite(centerX, centerY, 'yellow-ghost');

    // Set display size and collision for ghosts
    [this.blueGhost, this.redGhost, this.yellowGhost].forEach(ghost => {
        ghost.setDisplaySize(tileSize * 0.6, tileSize * 0.6);
        ghost.setCollideWorldBounds(true);
        this.physics.add.collider(ghost, this.walls);
    });

    // Set collision between player and ghosts
    this.physics.add.collider(this.player, this.blueGhost, restartGame, null, this);
    this.physics.add.collider(this.player, this.redGhost, restartGame, null, this);
    this.physics.add.collider(this.player, this.yellowGhost, restartGame, null, this);

    // Set collision between player and pellets
    this.physics.add.overlap(this.player, pellets, collectPellet, null, this);

    // Create cursor keys for player movement
    this.cursors = this.input.keyboard.createCursorKeys();
}

function collectPellet(player, pellet) {
    pellet.destroy(); // Remove the pellet from the scene
}

function restartGame() {
    console.log("Game Restarted"); // Debugging line to check if the function is called
    this.scene.restart();
}

function update() {
    // Reset player velocity
    this.player.setVelocity(0);

    // Check for arrow key presses and move accordingly
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-150);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(150);
    }

    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-150);
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(150);
    }

    // Smooth movement for the ghosts
    moveGhost.call(this, this.blueGhost, ghostDirections.blue);
    moveGhost.call(this, this.redGhost, ghostDirections.red);
    moveGhost.call(this, this.yellowGhost, ghostDirections.yellow);
}

```

### Summary of Changes:

1. **Corner Pellet Positions**: Updated the `cornerPositions` array to use valid path coordinates (where the maze value is `0`).
    - The new positions are `{ x: 1, y: 1 }`, `{ x: 1, y: 5 }`, `{ x: 6, y: 1 }`, and `{ x: 6, y: 5 }`, which correspond to valid path locations in the maze.
2. **Larger Pellets**: The larger pellets are created at these valid positions, ensuring they are placed within the paths of the maze.

### Explanation:

- By placing the larger pellets at valid path coordinates, they will now appear correctly within the maze's walkable areas, enhancing the gameplay experience.

With these changes, the larger pellets should now be correctly positioned within the paths of the maze.

# **Prompt 16 A**

Add a score label that increases when the player eats a pellet. For a normal pellet, increase the score by one point, and for the bigger pellets, increase it by five points. The score should start at 0 when the game begins.

When the game is restarted, the score needs to be reset as well.

# **Result 16 A**

To ensure that the score resets when the game is restarted, you need to reset the `score` variable to `0` in the `restartGame` function. Additionally, you should also update the score label to reflect this reset.

### Updated Code Snippet

Here’s how you can modify the `restartGame` function to reset the score:

```jsx
let pellets; // Declare a variable to hold the pellets
let score = 0; // Initialize the score variable
let scoreLabel; // Declare a variable for the score label

function create() {
    tileSize = 50; // Initialize tileSize here

    // Define the maze layout using a 2D array
    maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ];

    // Create a static group for walls
    this.walls = this.physics.add.staticGroup();

    // Create a group for pellets
    pellets = this.physics.add.group(); // Initialize the pellets group

    // Loop through the maze array to draw rectangles as walls and create pellets
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            if (maze[y][x] === 1) {
                const wall = this.add.rectangle(
                    x * tileSize + tileSize / 2,
                    y * tileSize + tileSize / 2,
                    tileSize,
                    tileSize,
                    0x0000ff
                );

                this.physics.add.existing(wall, true);
                this.walls.add(wall);
            } else if (maze[y][x] === 0) {
                // Create smaller pellets along the paths
                const pellet = this.add.circle(
                    x * tileSize + tileSize / 2,
                    y * tileSize + tileSize / 2,
                    tileSize * 0.1, // Normal pellet size
                    0xffff00 // Color: yellow
                );
                pellet.setName('pellet'); // Set a name for easy identification
                this.physics.add.existing(pellet); // Add physics to the pellet
                pellet.body.setCollideWorldBounds(true); // Ensure it doesn't go out of bounds
                pellet.body.immovable = true; // Make it immovable

                // Add the pellet to the pellets group
                pellets.add(pellet);
            }
        }
    }

    // Create larger pellets in the corners of the paths
    const cornerPelletSize = tileSize * 0.2; // Size for corner pellets
    const cornerPositions = [
        { x: 1, y: 1 }, // Top-left corner (valid path)
        { x: 1, y: 5 }, // Bottom-left corner (valid path)
        { x: 6, y: 1 }, // Top-right corner (valid path)
        { x: 6, y: 5 }  // Bottom-right corner (valid path)
    ];

    cornerPositions.forEach(pos => {
        const cornerPellet = this.add.circle(
            pos.x * tileSize + tileSize / 2,
            pos.y * tileSize + tileSize / 2,
            cornerPelletSize, // Larger size for corner pellets
            0xffff00 // Color: yellow
        );
        cornerPellet.setName('cornerPellet'); // Set a name for easy identification
        this.physics.add.existing(cornerPellet); // Add physics to the corner pellet
        cornerPellet.body.setCollideWorldBounds(true); // Ensure it doesn't go out of bounds
        cornerPellet.body.immovable = true; // Make it immovable

        // Add the corner pellet to the pellets group
        pellets.add(cornerPellet);
    });

    // Create the player (Pacman)
    this.player = this.physics.add.sprite(80, 80, 'pacman');
    this.player.setDisplaySize(tileSize * 0.6, tileSize * 0.6);
    this.player.setTint(0xffff00);
    this.player.body.setCollideWorldBounds(true);

    // Set collision between player and walls
    this.physics.add.collider(this.player, this.walls);

    // Create ghosts at the center of the maze
    const centerX = Math.floor(maze[0].length / 2) * tileSize + tileSize / 2;
    const centerY = Math.floor(maze.length / 2) * tileSize + tileSize / 2;

    this.blueGhost = this.physics.add.sprite(centerX, centerY, 'blue-ghost');
    this.redGhost = this.physics.add.sprite(centerX, centerY, 'red-ghost');
    this.yellowGhost = this.physics.add.sprite(centerX, centerY, 'yellow-ghost');

    // Set display size and collision for ghosts
    [this.blueGhost, this.redGhost, this.yellowGhost].forEach(ghost => {
        ghost.setDisplaySize(tileSize * 0.6, tileSize * 0.6);
        ghost.setCollideWorldBounds(true);
        this.physics.add.collider(ghost, this.walls);
    });

    // Set collision between player and ghosts
    this.physics.add.collider(this.player, this.blueGhost, restartGame, null, this);
    this.physics.add.collider(this.player, this.redGhost, restartGame, null, this);
    this.physics.add.collider(this.player, this.yellowGhost, restartGame, null, this);

    // Set collision between player and pellets
    this.physics.add.overlap(this.player, pellets, collectPellet, null, this);

    // Create cursor keys for player movement
    this.cursors = this.input.keyboard.createCursorKeys();

    // Create score label
    scoreLabel = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
}

function collectPellet(player, pellet) {
    // Check if the pellet is a corner pellet or a normal pellet
    if (pellet.name === 'cornerPellet') {
        score += 5; // Increase score by 5 for larger pellets
    } else {
        score += 1; // Increase score by 1 for normal pellets
    }
    pellet.destroy(); // Remove the pellet from the scene
    scoreLabel.setText('Score: ' + score); // Update the score label
}

function restartGame() {
    console.log("Game Restarted"); // Debugging line to check if the function is called
    score = 0; // Reset the score to 0
    scoreLabel.setText('Score: ' + score); // Update the score label to reflect the reset
    this.scene.restart(); // Restart the game scene
}

function update() {
    // Reset player velocity
    this.player.setVelocity(0);

    // Check for arrow key presses and move accordingly
    if (this.cursors.left.isDown) {
        this.player.setVelocityX(-150);
    } else if (this.cursors.right.isDown) {
        this.player.setVelocityX(150);
    }

    if (this.cursors.up.isDown) {
        this.player.setVelocityY(-150);
    } else if (this.cursors.down.isDown) {
        this.player.setVelocityY(150);
    }

    // Smooth movement for the ghosts
    moveGhost.call(this, this.blueGhost, ghostDirections.blue);
    moveGhost.call(this, this.redGhost, ghostDirections.red);
    moveGhost.call(this, this.yellowGhost, ghostDirections.yellow);
}

```

### Summary of Changes:

1. **Reset Score on Restart**: In the `restartGame` function, the `score` variable is reset to `0`.
2. **Update Score Label**: The score label is updated to reflect the reset score when the game restarts.

### Explanation:

- When the game is restarted, the score is set back to `0`, and the score label is updated to show this change. This ensures that the player starts fresh with a score of `0` each time the game restarts.

With these changes, the score will now reset correctly when the game is restarted.