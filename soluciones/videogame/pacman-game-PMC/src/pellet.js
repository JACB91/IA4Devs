class Pellet {
    constructor(scene, x, y, isCorner = false) {
        this.pellet = scene.add.circle(x, y, scene.tileSize * (isCorner ? 0.2 : 0.1), 0xffff00);
        this.pellet.setName(isCorner ? 'cornerPellet' : 'pellet');
        scene.physics.add.existing(this.pellet);
        this.pellet.body.setCollideWorldBounds(true);
        this.pellet.body.immovable = true;
    }
}

export default Pellet; 