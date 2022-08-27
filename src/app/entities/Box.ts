import { Entity, Scene } from 'aframe';

export class Box {
  scene: Scene;
  el: Entity;

  constructor(x = 0, y = 0, z = 0, settings: any = {}) {
    this.scene = document.querySelector('a-scene');
    this.el = document.createElement('a-entity');

    this.el.setAttribute('position', { x, y, z });
    this.el.setAttribute('geometry', {
      primitive: 'box',
      width: settings.width || 1,
      height: settings.height || 1,
      depth: settings.depth || 1,
    });
    this.el.setAttribute('material', {
      color: '#efefef',
      opacity: 0.5,
      shader: 'standard',
    });

    this.el.setAttribute('visible', true);

    this.el.className = 'box';

    this.scene.appendChild(this.el);
  }

  update(time: number, timeDelta: number) {
    let rotation = this.el.getAttribute('rotation');
    this.el.setAttribute('rotation', { x: rotation.x + 0.03 * timeDelta, y: rotation.y + 0.02 * timeDelta });
  }
}
