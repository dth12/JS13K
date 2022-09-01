import { getRandomRange } from '../../utils/util';
import { Key } from './Key';

export class Level {
  private static mapWitdh = 500;
  private static mapHeight = 500;
  private static roomRowCount = 5;
  private static $gameScene = document.querySelector('#gameScene');
  private static $keys: Key[] = [];

  private static get roomDepth() {
    return this.mapWitdh / 4;
  }

  private static getDoorWitdh(row: number) {
    return this.mapHeight / (row * 2);
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
      this.$keys.push(new Key(getRandomRange(this.mapWitdh / 2), 1.5, getRandomRange(this.mapWitdh / 2)));
    }
  }

  private static generateRooms($frag: DocumentFragment) {
    const row = Math.max(this.roomRowCount, 3);

    // horizontal wall
    for (let idx = 1; idx < row; idx++) {
      $frag.append(
        this.createWall({
          width: this.roomDepth + (idx % 2) * this.roomDepth * 1.25,
          position: `${-(this.mapWitdh / 2 - this.roomDepth / 2 - (idx % 2) * ((this.roomDepth * 1.25) / 2))} 15 ${
            this.mapHeight / 2 - (this.mapHeight / row) * idx
          }`,
          rotation: '0 0 0',
        }),
        this.createWall({
          width: this.roomDepth + ((idx + 1) % 2) * this.roomDepth * 1.25,
          position: `${this.mapWitdh / 2 - this.roomDepth / 2 - ((idx + 1) % 2) * ((this.roomDepth * 1.25) / 2)} 15 ${
            this.mapHeight / 2 - (this.mapHeight / row) * idx
          }`,
          rotation: '0 0 0',
        })
      );
    }

    // vertical wall
    for (let idx = 0; idx < row * 2; idx++) {
      $frag.append(
        this.createWall({
          position: `-${this.roomDepth} 15 ${
            this.mapHeight / 2 - this.getDoorWitdh(row) / 2 - this.getDoorWitdh(row) * idx
          }`,
          width: this.getDoorWitdh(row),
          rotation: '0 90 0',
        }),
        this.createWall({
          position: `${this.roomDepth} 15 ${
            this.mapHeight / 2 - this.getDoorWitdh(row) / 2 - this.getDoorWitdh(row) * idx
          }`,
          width: this.getDoorWitdh(row),
          rotation: '0 90 0',
        })
      );
    }
  }

  private static generateWorld() {
    const $frag = document.createDocumentFragment();
    const $sky = document.createElement('a-sky');
    $sky.setAttribute('color', '#171101');
    $sky.setAttribute('radius', (Math.max(this.mapHeight, this.mapWitdh) / 2) * 1.5);

    const $ground = document.createElement('a-plane');
    $ground.setAttribute('position', '0 0 0');
    $ground.setAttribute('rotation', '-90 0 0');
    $ground.setAttribute('width', this.mapWitdh);
    $ground.setAttribute('height', this.mapHeight);
    $ground.setAttribute('material', { color: '#010645', roughness: 0.9 });

    const $edgeWalls = [
      this.createWall({
        position: `-${this.mapWitdh / 2} 15 0`,
        width: this.mapHeight,
        rotation: '0 90 0',
      }),
      this.createWall({
        position: `${this.mapWitdh / 2} 15 0`,
        width: this.mapHeight,
        rotation: '0 90 0',
      }),
      this.createWall({
        position: `0 15 -${this.mapHeight / 2}`,
        width: this.mapWitdh,
        rotation: '0 0 0',
      }),
      this.createWall({
        position: `0 15 ${this.mapHeight / 2}`,
        width: this.mapWitdh,
        rotation: '0 0 0',
      }),
    ];

    $frag.append($sky, $ground, ...$edgeWalls);
    this.generateRooms($frag);
    this.$gameScene.appendChild($frag);
  }

  static createStage(stage = 1) {
    switch (stage) {
      case 1:
        this.roomRowCount = 5;
        this.mapHeight = this.roomRowCount * 100;
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
