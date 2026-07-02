class Maze {
    constructor(scene, mazeData) {
        this.scene = scene;
        this.mazeData = mazeData;
        this.tileSize = 50; // Set the tile size
        this.walls = scene.physics.add.staticGroup(); // Group for walls
        this.createMaze();
    }

    createMaze() {
        for (let y = 0; y < this.mazeData.length; y++) {
            for (let x = 0; x < this.mazeData[y].length; x++) {
                if (this.mazeData[y][x] === 1) {
                    const wall = this.scene.add.rectangle(
                        x * this.tileSize + this.tileSize / 2,
                        y * this.tileSize + this.tileSize / 2,
                        this.tileSize,
                        this.tileSize,
                        0x0000ff
                    );
                    this.scene.physics.add.existing(wall, true);
                    this.walls.add(wall);
                }
            }
        }
    }

    isPath(x, y) {
        return this.mazeData[y] && this.mazeData[y][x] === 0;
    }
}

export default Maze; 