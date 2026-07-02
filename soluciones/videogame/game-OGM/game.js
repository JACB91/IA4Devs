const TILE_SIZE = 100;

const config = {
    type: Phaser.AUTO,
    width: TILE_SIZE * 8,
    height: TILE_SIZE * 6 + 100,
    parent: 'game-container',
    backgroundColor: '#ecf0f1',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let levelsData;
let vehicles = [];
let selectedVehicle = null;
let highlightTiles = [];
let startTime;
let completedLevels = 0;
let currentLevel = 1;
let currentHue = 0;
const hueStep = 137.5;
let popupVisible = false;
let instructionsVisible = true;
let timerText;
let resetButton;
let menuVisible = false;
let timerRunning = false;
let movesCounter;
let moves = 0;

function preload() {
    this.load.json('levels', 'levels.json');
}

function create() {
    levelsData = this.cache.json.get('levels');

    this.add.graphics()
        .fillStyle(0x34495e, 1)
        .fillRoundedRect(0, 0, config.width, TILE_SIZE * 6, 20)
        .setDepth(0);

    createMenu.call(this);
    showInstructions.call(this);

    this.input.on('pointerdown', (pointer) => {
        if (instructionsVisible) {
            hideInstructions.call(this);
            loadLevel.call(this, currentLevel);
            return;
        }
        if (popupVisible) return;

        const x = Math.floor(pointer.x / TILE_SIZE);
        const y = Math.floor(pointer.y / TILE_SIZE);
        const clickedVehicle = findVehicle(x, y);
        if (clickedVehicle) {
            selectedVehicle = clickedVehicle;
            highlightAvailablePositions.call(this, selectedVehicle);
        } else {
            moveVehicle.call(this, x, y);
            selectedVehicle = null;
            clearHighlights.call(this);
        }
    });
}

function createMenu() {
    const menuY = TILE_SIZE * 6;

    timerText = this.add.text(20, menuY + 20, 'Time: 0.00', { fontSize: '20px', fill: '#34495e' }).setDepth(1).setVisible(false);

    movesCounter = this.add.text(200, menuY + 20, 'Moves: 0', { fontSize: '20px', fill: '#34495e' }).setDepth(1).setVisible(false);

    resetButton = this.add.text(config.width - 150, menuY + 20, 'Reset Level', { fontSize: '20px', fill: '#ffffff', backgroundColor: '#3498db', padding: { x: 10, y: 5 }, borderRadius: 5 })
        .setDepth(1)
        .setInteractive()
        .setVisible(false)
        .on('pointerdown', () => {
            loadLevel.call(this, currentLevel);
        });
}

function showMenu() {
    timerText.setVisible(true);
    movesCounter.setVisible(true);
    resetButton.setVisible(true);
    menuVisible = true;
}

function hideMenu() {
    timerText.setVisible(false);
    movesCounter.setVisible(false);
    resetButton.setVisible(false);
    menuVisible = false;
}

function showInstructions() {
    const margin = 80;
    const popupWidth = 600;
    const popupHeight = 400;
    const popupX = (config.width - popupWidth) / 2;
    const popupY = (config.height - popupHeight) / 2 - 50;

    const instructionsPopup = this.add.graphics().setDepth(3);
    instructionsPopup.fillStyle(0xecf0f1, 0.9);
    instructionsPopup.fillRoundedRect(popupX, popupY, popupWidth, popupHeight, 20);

    const titleText = this.add.text(config.width / 2, popupY + margin, 'Rush Hour!',
        { fontSize: '40px', fill: '#34495e', align: 'center' })
        .setOrigin(0.5)
        .setDepth(3);

    const instructionsText = this.add.text(config.width / 2, popupY + (popupHeight + margin) / 2,
        'Reach the exit with the highlighted car to complete the level!\n\nClick on any vehicle to move it.\n\n\n\nClick anywhere to start!',
        { fontSize: '20px', fill: '#34495e', align: 'center', wordWrap: { width: popupWidth - 2 * margin } })
        .setOrigin(0.5)
        .setDepth(3);

    this.instructionsPopup = instructionsPopup;
    this.instructionsText = instructionsText;
    this.titleText = titleText;
}

function hideInstructions() {
    this.instructionsPopup.destroy();
    this.instructionsText.destroy();
    this.titleText.destroy();
    instructionsVisible = false;
}

function loadLevel(levelNumber) {
    const level = levelsData[levelNumber - 1];
    vehicles.forEach(vehicle => vehicle.graphics.destroy());
    vehicles = [];
    selectedVehicle = null;
    clearHighlights.call(this);
    currentHue = 0;
    if (this.exit) {
        this.exit.destroy();
    }

    const sizes = {
        car: { width: TILE_SIZE, height: TILE_SIZE * 2 },
        truck: { width: TILE_SIZE, height: TILE_SIZE * 3 }
    };

    level.vehicles.forEach(vehicleData => {
        const color = vehicleData.isTarget ? 0xffff00 : getRandomColor();
        let size = sizes[vehicleData.type];
        let x = vehicleData.x;
        let y = vehicleData.y;

        if (vehicleData.orientation === 'horizontal') {
            size = { width: size.height, height: size.width };
        }

        const vehicle = {
            graphics: this.add.graphics().setDepth(2),
            bounds: new Phaser.Geom.Rectangle(0, 0, size.width, size.height),
            color: color,
            orientation: vehicleData.orientation,
            isTarget: vehicleData.isTarget,
        };
        updateVehiclePosition(vehicle, x, y, size, color);
        vehicles.push(vehicle);
    });

    this.exit = this.add.graphics({ fillStyle: { color: 0xe74c3c } }).setDepth(1);
    this.exit.fillRoundedRect(level.exit.x * TILE_SIZE, level.exit.y * TILE_SIZE, TILE_SIZE, TILE_SIZE, 20);
    this.exitBounds = new Phaser.Geom.Rectangle(level.exit.x * TILE_SIZE, level.exit.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);

    startTime = Date.now();
    timerRunning = true;
    moves = 0;
    movesCounter.setText('Moves: 0');
    showMenu();
}

function getRandomColor() {
    currentHue = (currentHue + hueStep) % 360;
    return Phaser.Display.Color.HSVColorWheel()[Math.floor(currentHue)].color;
}

function update() {
    if (menuVisible && timerRunning) {
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        timerText.setText(`Time: ${elapsedTime}`);
    }
}

function findVehicle(x, y) {
    return vehicles.find(vehicle => vehicle.bounds.contains((x + 0.5) * TILE_SIZE, (y + 0.5) * TILE_SIZE));
}

function highlightAvailablePositions(vehicle) {
    clearHighlights.call(this);

    const positions = calculateAvailablePositions(vehicle);
    positions.forEach(pos => {
        const graphics = this.add.rectangle(pos.x * TILE_SIZE + TILE_SIZE / 2, pos.y * TILE_SIZE + TILE_SIZE / 2, TILE_SIZE, TILE_SIZE, 0x00ff00, 0.5);
        const bounds = new Phaser.Geom.Rectangle(pos.x * TILE_SIZE, pos.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        highlightTiles.push({ graphics, bounds });

        // Add blinking effect
        this.tweens.add({
            targets: graphics,
            alpha: 0,
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
    });
}

function clearHighlights() {
    highlightTiles.forEach(tile => tile.graphics.destroy());
    highlightTiles = [];
}

function calculateAvailablePositions(vehicle) {
    const positions = [];
    const bounds = vehicle.bounds;
    const gridWidth = 8;
    const gridHeight = 6;

    if (vehicle.orientation === 'horizontal') {
        for (let x = bounds.x / TILE_SIZE - 1; x >= 0; x--) {
            if (isPositionOccupied(x, bounds.y / TILE_SIZE)) break;
            positions.push({ x, y: bounds.y / TILE_SIZE });
        }
        for (let x = bounds.right / TILE_SIZE; x < gridWidth; x++) {
            if (isPositionOccupied(x, bounds.y / TILE_SIZE)) break;
            positions.push({ x, y: bounds.y / TILE_SIZE });
        }
    } else {
        for (let y = bounds.y / TILE_SIZE - 1; y >= 0; y--) {
            if (isPositionOccupied(bounds.x / TILE_SIZE, y)) break;
            positions.push({ x: bounds.x / TILE_SIZE, y });
        }
        for (let y = bounds.bottom / TILE_SIZE; y < gridHeight; y++) {
            if (isPositionOccupied(bounds.x / TILE_SIZE, y)) break;
            positions.push({ x: bounds.x / TILE_SIZE, y });
        }
    }

    return positions;
}

function isPositionOccupied(x, y) {
    return vehicles.some(vehicle => vehicle.bounds.contains((x + 0.5) * TILE_SIZE, (y + 0.5) * TILE_SIZE));
}

function moveVehicle(x, y) {
    const validPosition = highlightTiles.find(tile => tile.bounds.contains((x + 0.5) * TILE_SIZE, (y + 0.5) * TILE_SIZE));

    if (validPosition) {
        moves++;
        movesCounter.setText(`Moves: ${moves}`);
        const bounds = selectedVehicle.bounds;
        let newX = bounds.x;
        let newY = bounds.y;

        if (selectedVehicle.orientation === 'horizontal') {
            if (x < bounds.x / TILE_SIZE) {
                newX = x * TILE_SIZE;
            } else {
                newX = x * TILE_SIZE - bounds.width + TILE_SIZE;
            }
        } else {
            if (y < bounds.y / TILE_SIZE) {
                newY = y * TILE_SIZE;
            } else {
                newY = y * TILE_SIZE - bounds.height + TILE_SIZE;
            }
        }

        let vehicle = selectedVehicle
        this.tweens.add({
            targets: bounds,
            x: newX,
            y: newY,
            duration: 500,
            onUpdate: () => {
                updateVehiclePosition(vehicle, bounds.x / TILE_SIZE, bounds.y / TILE_SIZE, { width: bounds.width, height: bounds.height });
            },
            onComplete: () => {
                clearHighlights.call(this);
                checkForCompletion.call(this, vehicle);
                selectedVehicle = null;
            }
        });
    }
}

function updateVehiclePosition(vehicle, x, y, size) {
    const margin = 10;
    vehicle.graphics.clear();
    if (vehicle.isTarget) {
        // Add a border and a different fill pattern for the target vehicle
        vehicle.graphics.lineStyle(10, 0xe74c3c, 1);
        vehicle.graphics.strokeRoundedRect(x * TILE_SIZE + margin, y * TILE_SIZE + margin, size.width - 2 * margin, size.height - 2 * margin, 20);
        vehicle.graphics.fillStyle(0xffff00, 1);
        vehicle.graphics.fillRoundedRect(x * TILE_SIZE + margin, y * TILE_SIZE + margin, size.width - 2 * margin, size.height - 2 * margin, 20);
    } else {
        vehicle.graphics.lineStyle(5, 0x000000, 1);
        vehicle.graphics.strokeRoundedRect(x * TILE_SIZE + margin, y * TILE_SIZE + margin, size.width - 2 * margin, size.height - 2 * margin, 20);
        vehicle.graphics.fillStyle(vehicle.color, 1);
        vehicle.graphics.fillRoundedRect(x * TILE_SIZE + margin, y * TILE_SIZE + margin, size.width - 2 * margin, size.height - 2 * margin, 20);
    }
    vehicle.bounds.setPosition(x * TILE_SIZE, y * TILE_SIZE);
}

function checkForCompletion(vehicle) {
    if (vehicle.isTarget) {
        const vehicleBounds = vehicle.bounds;
        if (Phaser.Geom.Intersects.RectangleToRectangle(vehicleBounds, this.exitBounds) &&
            Phaser.Geom.Rectangle.Overlaps(vehicleBounds, this.exitBounds)) {
            const endTime = Date.now();
            const completionTime = ((endTime - startTime) / 1000).toFixed(2);
            completedLevels++;
            timerRunning = false; // Stop the timer
            showSuccessPopup.call(this, completionTime);
        }
    }
}

function showSuccessPopup(completionTime) {
    popupVisible = true;
    const margin = 20;
    const popupWidth = 400;
    const popupHeight = 200;
    const popupX = (config.width - popupWidth) / 2;
    const popupY = (config.height - popupHeight) / 2;

    const popup = this.add.graphics().setDepth(3);
    popup.fillStyle(0xecf0f1, 0.9); // Use a lighter background color
    popup.fillRoundedRect(popupX, popupY, popupWidth, popupHeight, 20);

    const text = this.add.text(config.width / 2, popupY + popupHeight / 2 - margin, `Level completed!\n\n Time: ${completionTime}s\nMoves: ${moves}\nLevel streak: ${completedLevels}`, { fontSize: '20px', fill: '#34495e', align: 'center' }).setOrigin(0.5).setDepth(3);

    const buttonGraphics = this.add.graphics().setDepth(3);
    buttonGraphics.fillStyle(0x3498db, 1); // Change button color to blue
    buttonGraphics.fillRoundedRect(config.width / 2 - 75, popupY + popupHeight - margin - 30, 150, 40, 10);

    const buttonText = this.add.text(config.width / 2, popupY + popupHeight - margin - 10, 'Next level', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5).setDepth(3).setInteractive();

    buttonText.on('pointerdown', () => {
        popup.destroy();
        text.destroy();
        buttonGraphics.destroy();
        buttonText.destroy();
        currentLevel = (currentLevel % levelsData.length) + 1;
        loadLevel.call(this, currentLevel);
        startTime = Date.now();
        this.time.delayedCall(100, () => {
            popupVisible = false;
        });
    });
}
