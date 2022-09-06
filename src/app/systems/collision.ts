import {Entity} from 'aframe';

export default AFRAME.registerSystem('collision', {
  init() {
    this.keys = [];
    this.walls = [];
    this.wallsWithCollision = [];
    this.player;
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
      console.log('collision with wall');
    }
  },
  detectCollisionWithKey() {
    this.keysWithCollision = this.keys.filter((key: Entity) => this.isCollide(key))

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

    return (x <= elMax.x && x >= elMin.x) &&
           (y <= elMax.y && y >= elMin.y) &&
           (z <= elMax.z && z >= elMin.z);
  },
  solveCollision() {

  },
  tick(time, timeDelta) {
    if (!this.player) return;
    this.detectCollisionWithWall();
    this.solveCollision(timeDelta);
  }
})
