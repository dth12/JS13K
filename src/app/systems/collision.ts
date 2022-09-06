import {Entity} from 'aframe';

export default AFRAME.registerSystem('collision', {
  init() {
    this.keys = [];
    this.walls = [];
    this.wallsWithCollision = [];
    this.player;
    this.playerOldPosition = undefined;
  },
  registerPlayer(player: Entity) {
    this.player = player;
  },
  registerKey(key: Entity) {
    this.keys.push(key);
  },
  registerWall(wall: Entity) {
    this.walls.push(wall);
  },
  detectCollisionWithWall() {
    this.wallsWithCollision = this.walls.filter((wall: Entity) => this.isCollide(wall))

    if (this.wallsWithCollision.length > 0) {
      // console.log('collision with wall');
    }
  },
  detectCollisionWithKey() {
    this.keysWithCollision = this.keys.filter((key: Entity) => this.isCollide(key));

    if (this.keysWithCollision.length > 0) {
      console.log('collision with key');
    }
  },
  isCollide(el: Entity) {
    const {x, y, z} = this.player.object3D.position;

    // @ts-ignore
    const boundingBox = new THREE.Box3();
    const mesh = el.getObject3D('mesh');
    boundingBox.setFromObject(mesh);
    const elMin = boundingBox.min;
    const elMax = boundingBox.max;

    return (x <= elMax.x + 1 && x >= elMin.x - 1) &&
           (y <= elMax.y + 1 && y >= elMin.y - 1) &&
           (z <= elMax.z + 1 && z >= elMin.z - 1);
  },
  solveCollisionWithWall() {
    if (this.playerOldPosition === undefined || this.wallsWithCollision.length === 0) return;
    const [x, y, z] = this.playerOldPosition;
    this.player.object3D.position.x = x;
    this.player.object3D.position.y = y;
    this.player.object3D.position.z = z;
  },
  updatePlayerOldPosition() {
    const {x, y, z} = this.player.object3D.position;
    this.playerOldPosition = [x, y, z];
  },
  tick() {
    if (!this.player || !this.player.is('started')) return;
    this.detectCollisionWithWall();
    this.detectCollisionWithKey();
    this.solveCollisionWithWall();
    this.updatePlayerOldPosition();
  }
})
