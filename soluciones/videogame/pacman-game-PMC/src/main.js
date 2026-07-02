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
    this.load.image('pink-ghost', 'assets/pink-ghost.png');
    this.load.image('green-ghost', 'assets/green-ghost.png');
    
    // Load pellet sprite
    //this.load.image('pellet', 'assets/pellet.png');
    
    // Load tileset for the maze layout
    this.load.image('wall', 'assets/wall.png');
}

let tileSize; // Declare tileSize at a higher scope
let maze; // Declare maze at a higher scope

let ghostDirections = {
    blue: Phaser.Math.Between(0, 3),
    red: Phaser.Math.Between(0, 3),
    yellow: Phaser.Math.Between(0, 3),
    pink: Phaser.Math.Between(0, 3),
    green: Phaser.Math.Between(0, 3)
};

let pellets=[]; // Declare a variable to hold the pellets
let score = 0; // Initialize the score variable
let scoreLabel; // Declare a variable for the score label

function create() {
    tileSize = 50; // Initialize tileSize here

    // Define the maze layout using a 2D array
    maze = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
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
        { x: 1, y: 9 }, // Bottom-left corner (valid path)
        { x: 14, y: 1 }, // Top-right corner (valid path)
        { x: 14, y: 9 }  // Bottom-right corner (valid path)
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
    this.pinkGhost = this.physics.add.sprite(centerX, centerY, 'pink-ghost');
    this.greenGhost = this.physics.add.sprite(centerX, centerY, 'green-ghost');

    // Set display size and collision for ghosts
    [this.blueGhost, this.redGhost, this.yellowGhost, this.pinkGhost, this.greenGhost].forEach(ghost => {
        ghost.setDisplaySize(tileSize * 0.6, tileSize * 0.6);
        ghost.setCollideWorldBounds(true);
        this.physics.add.collider(ghost, this.walls);
    });
    this.greenGhost.canFollowPlayer = false; // Initially, the green ghost doesn't follow the player

    this.time.addEvent({
        delay: 5000, // 5000ms = 5 seconds
        callback: () => {
            console.log("cantfllow")
            this.greenGhost.setData('canFollowPlayer', true); // Enable the green ghost to follow the player
        },
        callbackScope: this
    });

    // Set collision between player and ghosts
    this.physics.add.collider(this.player, this.blueGhost, restartGame, null, this);
    this.physics.add.collider(this.player, this.redGhost, restartGame, null, this);
    this.physics.add.collider(this.player, this.yellowGhost, restartGame, null, this);
    this.physics.add.collider(this.player, this.pinkGhost, restartGame, null, this);
    this.physics.add.collider(this.player, this.greenGhost, restartGame, null, this);

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
    moveGhost.call(this, this.pinkGhost, ghostDirections.pink);
    moveGhost.call(this, this.greenGhost, ghostDirections.green);
}

function moveGhost(ghost, direction) {
    const speed = 100; // Speed of the ghost

    if (ghost === this.redGhost || (ghost === this.greenGhost && ghost.canFollowPlayer)) {
        const ghostTile = {
            x: Math.floor(ghost.x / tileSize),
            y: Math.floor(ghost.y / tileSize)
        };
        const playerTile = {
            x: Math.floor(this.player.x / tileSize),
            y: Math.floor(this.player.y / tileSize)
        };

        // Find the path to the player
        const path = findPath(ghostTile, playerTile, maze);

        if (path.length > 1) {
            // Get the next step in the path
            const nextStep = path[1];

            // Calculate the target position
            const targetX = nextStep.x * tileSize + tileSize / 2;
            const targetY = nextStep.y * tileSize + tileSize / 2;

            // Move the red ghost toward the target position
            const dx = targetX - ghost.x;
            const dy = targetY - ghost.y;
            const magnitude = Math.sqrt(dx * dx + dy * dy);

            // Normalize the velocity
            ghost.setVelocity((dx / magnitude) * 100, (dy / magnitude) * 100);
        } else {
            // Stop ghost movement if no path
            ghost.setVelocity(0, 0);
        }
    } else {
        // For other ghosts, retain random movement logic
        const ghostX = ghost.x;
        const ghostY = ghost.y;

        let newX = ghostX;
        let newY = ghostY;

        switch (direction) {
            case 0: // Move left
                newX -= speed * this.game.loop.delta / 1000; // Adjust speed based on frame time
                break;
            case 1: // Move right
                newX += speed * this.game.loop.delta / 1000;
                break;
            case 2: // Move up
                newY -= speed * this.game.loop.delta / 1000;
                break;
            case 3: // Move down
                newY += speed * this.game.loop.delta / 1000;
                break;
        }

        const tileX = Math.floor(newX / tileSize);
        const tileY = Math.floor(newY / tileSize);

        // Check if the new position is valid (not colliding with walls)
        if (maze[tileY] && maze[tileY][tileX] === 0) {
            ghost.setPosition(newX, newY);
        } else {
            direction = Phaser.Math.Between(0, 3);
        }

        // Randomly change direction every so often
        if (Phaser.Math.Between(0, 100) < 1) {
            direction = Phaser.Math.Between(0, 3);
        }

        // Update the ghost's direction in the ghostDirections object
        if (ghost === this.blueGhost) {
            ghostDirections.blue = direction;
        } else if (ghost === this.yellowGhost) {
            ghostDirections.yellow = direction;
        }else if (ghost === this.pinkGhost) {
            ghostDirections.pink = direction;
        }else if (ghost === this.greenGhost) {
            ghostDirections.green = direction;
        }
    }
}


function findPath(start, end, maze) {
    const cols = maze[0].length;
    const rows = maze.length;

    // Helper function to calculate heuristic (Manhattan distance)
    const heuristic = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);

    // Convert maze to a graph of nodes
    const createNode = (x, y, parent = null) => ({
        x, y, parent,
        f: 0, // Total cost (g + h)
        g: 0, // Cost from start
        h: 0  // Heuristic cost to end
    });

    // Check if a position is walkable
    const isWalkable = (x, y) => maze[y] && maze[y][x] === 0;

    // Initialize open and closed lists
    const openList = [];
    const closedList = [];

    // Start node
    const startNode = createNode(start.x, start.y);
    openList.push(startNode);

    // End node
    const endNode = createNode(end.x, end.y);

    // Loop until we find the path or exhaust options
    while (openList.length > 0) {
        // Get the node with the lowest f cost
        const currentNode = openList.reduce((a, b) => (a.f < b.f ? a : b));

        // Move the current node from open to closed list
        openList.splice(openList.indexOf(currentNode), 1);
        closedList.push(currentNode);

        // Check if we reached the end
        if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
            const path = [];
            let current = currentNode;

            // Reconstruct the path
            while (current) {
                path.push({ x: current.x, y: current.y });
                current = current.parent;
            }

            return path.reverse(); // Return the path from start to end
        }

        // Generate neighbors (up, down, left, right)
        const neighbors = [
            { x: currentNode.x - 1, y: currentNode.y }, // Left
            { x: currentNode.x + 1, y: currentNode.y }, // Right
            { x: currentNode.x, y: currentNode.y - 1 }, // Up
            { x: currentNode.x, y: currentNode.y + 1 }  // Down
        ];

        for (const neighbor of neighbors) {
            // Skip if not walkable or already closed
            if (!isWalkable(neighbor.x, neighbor.y) ||
                closedList.some(n => n.x === neighbor.x && n.y === neighbor.y)) {
                continue;
            }

            const g = currentNode.g + 1; // Cost to move to neighbor
            const h = heuristic(neighbor, endNode); // Heuristic to end
            const f = g + h;

            // Check if the neighbor is already in the open list with a lower f
            const existing = openList.find(n => n.x === neighbor.x && n.y === neighbor.y);
            if (existing && g >= existing.g) continue;

            // Add or update the neighbor in the open list
            openList.push(createNode(neighbor.x, neighbor.y, currentNode));
            openList[openList.length - 1].f = f;
            openList[openList.length - 1].g = g;
            openList[openList.length - 1].h = h;
        }
    }

    // Return an empty path if no solution found
    return [];
}
