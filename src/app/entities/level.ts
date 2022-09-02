import { getRandomIndex, getRandomRange } from '../../utils/util';
import { state } from '../systems/state';
import { Key } from './Key';

export class Level {
  private static $gameScene = document.querySelector('#gameScene');
  private static $keys: Key[] = [];

  private static get roomDepth() {
    return state.level.mapWitdh / 4;
  }

  private static getDoorWitdh(row: number) {
    return state.level.mapHeight / row;
  }

  private static createWall(customOption: any) {
    const $wall = document.createElement('a-box');
    const option = {
      material: { roughness: 0.9 },
      height: 30,
      color: '#570c1e',
      ...customOption,
    };

    Object.keys(option).forEach((key) => {
      $wall.setAttribute(key, option[key]);
    });

    return $wall;
  }

  private static addKeys(count: number) {
    for (let i = 0; i < count; i++) {
      this.$keys.push(new Key(getRandomRange(state.level.mapWitdh / 2), 1.5, getRandomRange(state.level.mapWitdh / 2)));
    }
  }

  private static generateRooms($frag: DocumentFragment) {
    const { level } = state;
    const row = Math.max(level.roomRowCount, 3);
    const doorZPositions = [
      level.mapHeight / 2 - this.getDoorWitdh(row) * 0.5,
      level.mapHeight / 2 - this.getDoorWitdh(row) * 0.25,
      level.mapHeight / 2 - this.getDoorWitdh(row) * 0.75,
    ];

    // horizontal wall
    for (let idx = 1; idx < row; idx++) {
      $frag.append(
        this.createWall({
          width: this.roomDepth + (idx % 2) * this.roomDepth * 1.25,
          position: `${-(level.mapWitdh / 2 - this.roomDepth * 0.5 - (idx % 2) * (this.roomDepth * 1.25 * 0.75))} 15 ${
            level.mapHeight / 2 - (level.mapHeight / row) * idx
          }`,
          rotation: '0 0 0',
        }),
        this.createWall({
          width: this.roomDepth + ((idx + 1) % 2) * this.roomDepth * 1.25,
          position: `${
            level.mapWitdh / 2 - this.roomDepth * 0.5 - ((idx + 1) % 2) * (this.roomDepth * 1.25 * 0.75)
          } 15 ${level.mapHeight / 2 - (level.mapHeight / row) * idx}`,
          rotation: '0 0 0',
        })
      );
    }

    // vertical wall
    for (let idx = 0; idx < row; idx++) {
      $frag.append(
        this.createWall({
          width: this.getDoorWitdh(row) * 0.5,
          position: `-${this.roomDepth} 15 ${doorZPositions[getRandomIndex(3)] - this.getDoorWitdh(row) * idx}`,
          rotation: '0 90 0',
        }),
        this.createWall({
          width: this.getDoorWitdh(row) * 0.5,
          position: `${this.roomDepth} 15 ${doorZPositions[getRandomIndex(3)] - this.getDoorWitdh(row) * idx}`,
          rotation: '0 90 0',
        })
      );
    }
  }

  private static generateWorld() {
    const $frag = document.createDocumentFragment();
    const $sky = document.createElement('a-sky');
    $sky.setAttribute('color', '#171101');
    $sky.setAttribute('radius', (Math.max(state.level.mapHeight, state.level.mapWitdh) / 2) * 1.5);

    const $ground = document.createElement('a-plane');
    $ground.setAttribute('position', '0 0 0');
    $ground.setAttribute('rotation', '-90 0 0');
    $ground.setAttribute('width', state.level.mapWitdh);
    $ground.setAttribute('height', state.level.mapHeight);
    $ground.setAttribute('material', { color: '#010645', roughness: 0.9 });

    const $edgeWalls = [
      this.createWall({
        position: `-${state.level.mapWitdh / 2} 15 0`,
        width: state.level.mapHeight,
        rotation: '0 90 0',
      }),
      this.createWall({
        position: `${state.level.mapWitdh / 2} 15 0`,
        width: state.level.mapHeight,
        rotation: '0 90 0',
      }),
      this.createWall({
        position: `0 15 -${state.level.mapHeight / 2}`,
        width: state.level.mapWitdh,
        rotation: '0 0 0',
      }),
      this.createWall({
        position: `0 15 ${state.level.mapHeight / 2}`,
        width: state.level.mapWitdh,
        rotation: '0 0 0',
      }),
    ];

    $frag.append($sky, $ground, ...$edgeWalls);
    this.generateRooms($frag);
    this.$gameScene.appendChild($frag);
  }

  static createStage(stage = 1) {
    const { level } = state;
    switch (stage) {
      case 1:
        level.roomRowCount = 30;
        level.mapHeight = level.roomRowCount * 100;
        this.generateWorld();
        this.addKeys(10);
        break;
      default:
    }
  }

  static update(deltaTime: number) {
    this.$keys.forEach(($box) => {
      $box.update(deltaTime);
    });
  }
}
