import {Entity} from 'aframe';
import {getRandomIndex, getRandomRange} from '../../utils/util';
// @ts-ignore
import monsterImage from '../public/monster.webp';
import {state} from '../systems/state';
import {Key} from './Key';
import {Monster} from './Monster';

export class Level {
  private static $gameScene = document.querySelector('#gameScene');
  private static $sky: Entity = undefined;
  private static $ground: Entity = undefined;
  private static $walls: Entity[] = [];
  private static $keys: Key[] = [];
  private static $monsters: Monster[] = [];

  private static get roomDepth() {
    return state.level.mapWidth / 4;
  }

  private static getDoorWidth(row: number) {
    return state.level.mapHeight / row;
  }

  private static createWall(customOption: any) {
    const $wall = document.createElement('a-box');
    const option = {
      material: {roughness: 0.9},
      height: 30,
      depth: 10,
      color: '#390904',
      collision: '',
      ...customOption,
    };

    Object.keys(option).forEach((key) => {
      $wall.setAttribute(key, option[key]);
    });

    $wall.className = 'wall';
    this.$walls.push($wall);

    return $wall;
  }

  private static addKeys(count: number) {
    for (let i = 0; i < count; i++) {
      this.$keys.push(
        new Key(i, getRandomRange(state.level.mapWidth / 2), 1.5, getRandomRange(state.level.mapHeight / 2))
      );
    }
  }

  private static generateRooms($frag: DocumentFragment) {
    const {level} = state;
    const row = Math.max(level.roomRowCount, 3);
    const doorZPositions = [
      level.mapHeight / 2 - this.getDoorWidth(row) * 0.5,
      level.mapHeight / 2 - this.getDoorWidth(row) * 0.25 + 5,
      level.mapHeight / 2 - this.getDoorWidth(row) * 0.75 - 5,
    ];

    // horizontal wall
    for (let idx = 1; idx < row; idx++) {
      $frag.append(
        this.createWall({
          width: this.roomDepth + (idx % 2) * this.roomDepth * 1.25,
          position: `${-(level.mapWidth / 2 - this.roomDepth * 0.5 - (idx % 2) * (this.roomDepth * 1.25 * 0.75))} 15 ${
            level.mapHeight / 2 - (level.mapHeight / row) * idx
          }`,
          rotation: '0 0 0',
        }),
        this.createWall({
          width: this.roomDepth + ((idx + 1) % 2) * this.roomDepth * 1.25,
          position: `${
            level.mapWidth / 2 - this.roomDepth * 0.5 - ((idx + 1) % 2) * (this.roomDepth * 1.25 * 0.75)
          } 15 ${level.mapHeight / 2 - (level.mapHeight / row) * idx}`,
          rotation: '0 0 0',
        })
      );
    }

    // vertical wall
    for (let idx = 0; idx < row; idx++) {
      $frag.append(
        this.createWall({
          width: this.getDoorWidth(row) * 0.5,
          position: `-${this.roomDepth} 15 ${doorZPositions[getRandomIndex(3)] - this.getDoorWidth(row) * idx}`,
          rotation: '0 90 0',
        }),
        this.createWall({
          width: this.getDoorWidth(row) * 0.5,
          position: `${this.roomDepth} 15 ${doorZPositions[getRandomIndex(3)] - this.getDoorWidth(row) * idx}`,
          rotation: '0 90 0',
        })
      );
    }
  }

  private static generateWorld() {
    const $frag = document.createDocumentFragment();

    this.$sky = document.createElement('a-sky');
    this.$sky.setAttribute('color', '#171101');
    this.$sky.setAttribute('radius', (Math.max(state.level.mapHeight, state.level.mapWidth) / 2) * 1.5);

    this.$ground = document.createElement('a-plane');
    this.$ground.setAttribute('position', '0 0 0');
    this.$ground.setAttribute('rotation', '-90 0 0');
    this.$ground.setAttribute('width', state.level.mapWidth);
    this.$ground.setAttribute('height', state.level.mapHeight);
    this.$ground.setAttribute('material', {color: '#071e38', roughness: 0.9});

    const $edgeWalls = [
      this.createWall({
        position: `-${state.level.mapWidth / 2} 15 0`,
        width: state.level.mapHeight,
        rotation: '0 90 0',
      }),
      this.createWall({
        position: `${state.level.mapWidth / 2} 15 0`,
        width: state.level.mapHeight,
        rotation: '0 90 0',
      }),
      this.createWall({
        position: `0 15 -${state.level.mapHeight / 2}`,
        width: state.level.mapWidth,
        rotation: '0 0 0',
      }),
      this.createWall({
        position: `0 15 ${state.level.mapHeight / 2}`,
        width: state.level.mapWidth,
        rotation: '0 0 0',
      }),
    ];

    $frag.append(this.$sky, this.$ground, ...$edgeWalls);
    this.generateRooms($frag);
    this.$gameScene.appendChild($frag);
  }

  private static spawnMonster(count: number) {
    const playerOffset = 200;
    Array.from({length: count}).forEach((_, idx) => {
      const position = {
        x: (Math.random() * (state.level.mapWidth / 2 - playerOffset) + playerOffset) * (Math.random() < 0.5 ? 1 : -1),
        y: 5,
        z: (Math.random() * (state.level.mapHeight / 2 - playerOffset) + playerOffset) * (Math.random() < 0.5 ? 1 : -1),
      };

      this.$monsters.push(
        new Monster({
          position,
          width: 5,
          height: 5,
          depth: 5,
          material: {roughness: 0.9, src: monsterImage},
        })
      );
    });
  }

  private static removeEntity(entity: any) {
    /*
    entityEl.object3D.position.y = 1000;
    entityEl.object3D.visible = false;
    entityEl.pause();
    */
    const entityEl = entity.$el ? entity.$el : entity;
    entityEl.parentNode.removeChild(entityEl);
  }

  private static removeEntities(entities: any[]) {
    while (entities.length > 0) {
      this.removeEntity(entities.pop());
    }
  }

  static stopMonsters() {
    this.$monsters.forEach((monster) => {
      monster.setDidFindPlayer(true);
    });
  }

  static removeKey(keyWithCollision: any) {
    this.$keys = this.$keys.filter((key) => key.$el.id !== keyWithCollision.id);
    this.removeEntity(keyWithCollision);
  }

  static removeStage() {
    this.removeEntity(this.$sky);
    this.removeEntity(this.$ground);
    this.removeEntities(this.$walls);
    this.removeEntities(this.$keys);
    this.removeEntities(this.$monsters);
  }

  static createStage(stage = 1) {
    const {level, uiItem} = state;
    switch (stage) {
      case 1:
        level.roomRowCount = 13;
        level.mapHeight = level.roomRowCount * 100;
        uiItem.monsters.total = 5;
        uiItem.keys.total = 10;
        this.generateWorld();
        this.addKeys(uiItem.keys.total);
        this.spawnMonster(uiItem.monsters.total);
        break;
      default:
    }
  }

  static update(deltaTime: number) {
    this.$keys.forEach(($box) => {
      $box.update(deltaTime);
    });

    this.$monsters.forEach(($monster) => {
      $monster.update(deltaTime);
    });
  }
}
