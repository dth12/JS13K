import { getRandomRange } from '../../utils/util';
import { Key } from './Key';

const MAX_MAP_SIZE = 500;

export class Level {
  private static $keys: Key[] = [];
  private static createWall(option: any) {
    const $wall = document.createElement('a-box');
    Object.keys(option).forEach((key) => {
      $wall.setAttribute(key, option[key]);
    });
    return $wall;
  }

  private static addKeys(count: number) {
    for (let i = 0; i < count; i++) {
      this.$keys.push(new Key(getRandomRange(MAX_MAP_SIZE / 2), 1.5, getRandomRange(MAX_MAP_SIZE / 2)));
    }
  }

  static createStage(stage = 1) {
    const $gameScene = document.querySelector('#gameScene');
    const $frag = document.createDocumentFragment();

    switch (stage) {
      case 1:
        // add walls
        $frag.append(
          this.createWall({
            material: 'roughness: 0.9',
            position: '-5 0 0',
            height: '30',
            width: '100',
            rotation: '0 90 0',
            color: '#570c1e',
          }),
          this.createWall({
            position: '5 0 0',
            height: '30',
            width: '100',
            rotation: '0 90 0',
            color: '#570c1e',
            material: 'roughness: 0.9',
          }),
          this.createWall({
            position: '0 0 -50',
            height: '30',
            width: '10',
            color: 'black',
          })
        );
        this.addKeys(10);
        $gameScene.appendChild($frag);
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
