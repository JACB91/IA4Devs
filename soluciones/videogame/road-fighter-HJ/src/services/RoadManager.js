export default class RoadManager {
    constructor(scene) {
        this.scene = scene;
        this.baseSpeed = 5;
        this.speedMultiplier = 1;
        this.roadTiles = [];
        this.roadWidth = 256;
        this.tileHeight = 128;
        
        // Add slight overlap to prevent gaps
        this.tileOverlap = 1;
        
        this.setupRoad();

        // Listen for speed increase events
        this.scene.game.events.on('increaseSpeed', this.increaseSpeed, this);
    }

    increaseSpeed = () => {
        this.speedMultiplier += 0.2;
    }

    setupRoad() {
        const centerX = this.scene.game.config.width / 2;
        // Add extra tiles and account for overlap
        const tilesNeeded = Math.ceil(this.scene.game.config.height / (this.tileHeight - this.tileOverlap)) + 2;
        
        for (let i = 0; i < tilesNeeded; i++) {
            // Subtract overlap from positioning to create seamless effect
            this.createRoadSegment(centerX, i * (this.tileHeight - this.tileOverlap));
        }
    }

    createRoadSegment(x, y) {
        const roadTile = this.scene.add.tileSprite(
            x,
            y,
            this.roadWidth,
            this.tileHeight,
            'road'
        );
        this.roadTiles.push(roadTile);
    }

    update(delta) {
        const currentSpeed = this.baseSpeed * this.speedMultiplier;
        
        this.roadTiles.forEach(tile => {
            tile.y += currentSpeed;
            
            // Reset position when tile goes off screen
            if (tile.y >= this.scene.game.config.height + this.tileHeight/2) {
                // Find the topmost tile's position
                const topTile = this.getTopmostTile();
                // Place slightly overlapped with top tile
                tile.y = topTile.y - (this.tileHeight - this.tileOverlap) + 10;
            }
        });
    }

    getTopmostTile() {
        return this.roadTiles.reduce((top, tile) => {
            return (!top || tile.y < top.y) ? tile : top;
        }, null);
    }
} 