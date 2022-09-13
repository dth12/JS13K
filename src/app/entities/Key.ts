import {Entity, Scene} from 'aframe';

export class Key {
  $scene: Scene;
  $el: Entity;

  constructor(id: number, x = 0, y = 0, z = 0, settings: any = {}) {
    this.$scene = document.querySelector('a-scene');
    this.$el = document.createElement('a-entity');

    this.$el.setAttribute('position', { x, y, z });
    this.$el.setAttribute('geometry', {
      primitive: 'box',
      width: settings.width || 2,
      height: settings.height || 2,
      depth: settings.depth || 2,
    });
    this.$el.setAttribute('material', {
      color: '#ffe45e',
      opacity: 0.9,
      shader: 'standard',
    });
    this.$el.setAttribute('collision', '');
    this.$el.setAttribute('visible', true);

    this.$el.className = 'key';
    this.$el.id = `key${id}`;

    this.$scene.appendChild(this.$el);
  }

  update(timeDelta: number) {
    const rotation = this.$el.getAttribute('rotation');
    this.$el.setAttribute('rotation', {
      x: rotation.x + Math.random() * 0.1 * timeDelta,
      y: rotation.y + Math.random() * 0.1 * timeDelta,
    });
  }
}
