import { Box } from '../entities/Box';

export class Level {
  private static $boxes: Box[] = [];
  private static createWall(option: any) {
    const $wall = document.createElement('a-box');
    Object.keys(option).forEach((key) => {
      $wall.setAttribute(key, option[key]);
    });
    return $wall;
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
            height: '10',
            width: '100',
            rotation: '0 90 0',
            color: '#570c1e',
          }),
          this.createWall({
            position: '5 0 0',
            height: '10',
            width: '100',
            rotation: '0 90 0',
            color: '#570c1e',
            material: 'roughness: 0.9',
          }),
          this.createWall({
            position: '0 0 -50',
            height: '10',
            width: '10',
            color: 'black',
          })
        );
        $gameScene.appendChild($frag);

        // add boxes
        this.$boxes.push(new Box(0, 2, -40));
        this.$boxes.push(new Box(0, 2, 20));
        break;
      default:
    }
  }

  static update(deltaTime: number) {
    this.$boxes.forEach(($box) => {
      $box.update(deltaTime);
    });
  }
}
