import {Entity} from 'aframe';
import {getRandomRange} from '../../utils/util';
import {Level} from '../entities/Level';

AFRAME.registerSystem('collision', {
  init() {
    this.keys = [];
    this.walls = [];
    this.wallsWithCollision = [];
    this.keyWithCollision;
    this.player;
    this.playerOldPosition;
    this.mapWidth = 500;
    this.mapHeight = 500;
    this.isAllKeyPositionRight = false;
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
  generateKeyPosition(key: Entity) {
    const isCollideWithWall = this.walls.some((wall: Entity) => this.isCollide(key, wall, 0.5));

    if (!isCollideWithWall) return;

    key.object3D.position.x = getRandomRange(this.mapWidth / 2);
    key.object3D.position.z = getRandomRange(this.mapHeight / 2);

    return this.generateKeyPosition(key);
  },
  detectCollisionWithWall() {
    this.wallsWithCollision = this.walls.filter((wall: Entity) => this.isCollide(this.player, wall, 0.1));
  },
  detectCollisionWithKey() {
    this.keyWithCollision = this.keys.find((key: Entity) => this.isCollide(this.player, key, 1.5));
  },
  isCollide(p: Entity,el: Entity, dist: number) {
    const {x, y, z} = p.object3D.position;

    // @ts-ignore
    const boundingBox = new THREE.Box3();
    const mesh = el.getObject3D('mesh');
    boundingBox.setFromObject(mesh);
    const elMin = boundingBox.min;
    const elMax = boundingBox.max;

    return (x <= elMax.x + dist && x >= elMin.x - dist) &&
           (y <= elMax.y + dist && y >= elMin.y - dist) &&
           (z <= elMax.z + dist && z >= elMin.z - dist);
  },
  solveCollisionWithWall() {
    if (this.playerOldPosition === undefined || this.wallsWithCollision.length === 0) return;

    const [ox, oy, oz] = this.playerOldPosition;
    const {x, y, z} = this.player.object3D.position;
    this.player.object3D.position.x += (ox - x) * 3.3;
    this.player.object3D.position.y += (oy - y) * 3.3;
    this.player.object3D.position.z += (oz - z) * 3.3;
  },
  solveCollisionWithKey() {
    if (this.keyWithCollision === undefined) return;

    this.keyWithCollision.emit('find-key');
    Level.removeKey(this.keyWithCollision);
  },
  solveCollisionWithKeyAndWall() {
    this.keys.forEach((key:Entity) => {
      this.generateKeyPosition(key);
    })
  },
  updatePlayerOldPosition() {
    const {x, y, z} = this.player.object3D.position;
    this.playerOldPosition = [x, y, z];
  },
  tick() {
    if (this.player === undefined) return;

    this.detectCollisionWithWall();
    this.detectCollisionWithKey();
    this.solveCollisionWithWall();
    this.solveCollisionWithKey();
    this.solveCollisionWithKeyAndWall();
    this.updatePlayerOldPosition();
  }
})
