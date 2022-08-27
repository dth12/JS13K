import { Entity, Scene } from 'aframe';

export class Box {
  scene: Scene;
  el: Entity;

  constructor(x: number, y: number, z: number, settings: any) {
    this.scene = document.querySelector('a-scene');
    this.el = document.createElement('a-entity');

    this.el.setAttribute('position', {
      x: x || 0,
      y: y || 0,
      z: z || 0,
    });
    this.el.setAttribute('geometry', {
      primitive: 'box',
      width: settings.width || 1,
      height: settings.height || 1,
      depth: settings.depth || 1,
    });
    this.el.setAttribute('material', {
      opacity: 1,
      shader: 'standard',
    });

    this.el.setAttribute('visible', true);

    this.el.className = 'box';

    this.scene.appendChild(this.el);
  }

  update(time: number, timeDelta: number) {
    let rotation = this.el.getAttribute('rotation');
    this.el.setAttribute('rotation', { y: rotation.y + 0.01 * timeDelta });
  }
}
