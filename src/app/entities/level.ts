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
          // left horizontal wall
          this.createWall({
            material: 'roughness: 0.9',
            position: '-189 15 -50',
            height: '30',
            width: '125',
            rotation: '0 0 0',
            color: '#570c1e',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '-189 15 -150',
            height: '30',
            width: '125',
            rotation: '0 0 0',
            color: '#570c1e',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '-189 15 50',
            height: '30',
            width: '125',
            rotation: '0 0 0',
            color: '#570c1e',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '-189 15 150',
            height: '30',
            width: '125',
            rotation: '0 0 0',
            color: '#570c1e',
          }),
          // left vertical wall
          this.createWall({
            material: 'roughness: 0.9',
            position: '-126 15 225',
            height: '30',
            width: '50',
            rotation: '0 90 0',
            color: '#fff',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '-126 15 175',
            height: '30',
            width: '50',
            rotation: '0 90 0',
            color: '#fff',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '-126 15 125',
            height: '30',
            width: '50',
            rotation: '0 90 0',
            color: '#fff',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '-126 15 75',
            height: '30',
            width: '50',
            rotation: '0 90 0',
            color: '#fff',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '-126 15 25',
            height: '30',
            width: '50',
            rotation: '0 90 0',
            color: '#fff',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '-126 15 -25',
            height: '30',
            width: '50',
            rotation: '0 90 0',
            color: '#fff',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '-126 15 -75',
            height: '30',
            width: '50',
            rotation: '0 90 0',
            color: '#fff',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '-126 15 -125',
            height: '30',
            width: '50',
            rotation: '0 90 0',
            color: '#fff',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '-126 15 -175',
            height: '30',
            width: '50',
            rotation: '0 90 0',
            color: '#fff',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '-126 15 -225',
            height: '30',
            width: '50',
            rotation: '0 90 0',
            color: '#fff',
          }),
          // right horizontal wall
          this.createWall({
            material: 'roughness: 0.9',
            position: '189 15 -50',
            height: '30',
            width: '125',
            rotation: '0 0 0',
            color: '#570c1e',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '189 15 -150',
            height: '30',
            width: '125',
            rotation: '0 0 0',
            color: '#570c1e',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '189 15 50',
            height: '30',
            width: '125',
            rotation: '0 0 0',
            color: '#570c1e',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '189 15 150',
            height: '30',
            width: '125',
            rotation: '0 0 0',
            color: '#570c1e',
          }),
          // right vertical wall
          this.createWall({
            material: 'roughness: 0.9',
            position: '126 15 225',
            height: '30',
            width: '50',
            rotation: '0 90 0',
            color: '#fff',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '126 15 175',
            height: '30',
            width: '50',
            rotation: '0 90 0',
            color: '#fff',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '126 15 125',
            height: '30',
            width: '50',
            rotation: '0 90 0',
            color: '#fff',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '126 15 75',
            height: '30',
            width: '50',
            rotation: '0 90 0',
            color: '#fff',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '126 15 25',
            height: '30',
            width: '50',
            rotation: '0 90 0',
            color: '#fff',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '126 15 -25',
            height: '30',
            width: '50',
            rotation: '0 90 0',
            color: '#fff',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '126 15 -75',
            height: '30',
            width: '50',
            rotation: '0 90 0',
            color: '#fff',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '126 15 -125',
            height: '30',
            width: '50',
            rotation: '0 90 0',
            color: '#fff',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '126 15 -175',
            height: '30',
            width: '50',
            rotation: '0 90 0',
            color: '#fff',
          }),
          this.createWall({
            material: 'roughness: 0.9',
            position: '126 15 -225',
            height: '30',
            width: '50',
            rotation: '0 90 0',
            color: '#fff',
          })
          //asfdasdf
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
