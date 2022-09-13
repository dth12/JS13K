import '../public/monster.webp';
import {state} from './../systems/state';

export class Monster {
  private readonly HEIGHT = 5;
  private readonly BOUNCING_SPEED = 0.02;
  private readonly SPEED = 0.035;

  private $gameScene = document.querySelector('#gameScene');
  private $el = document.createElement('a-box');

  private didFindPlayer = false;
  private deg = 0;

  constructor(option: { [key: string]: any } = {}) {
    Object.keys(option).forEach((key) => {
      this.$el.setAttribute(key, option[key]);
    });
    this.$el.classList.add('monster');

    setTimeout(() => {
      const img = new Image();
      // @ts-ignore
      const texture = new THREE.Texture(img);
      img.src = '../public/monster.webp';
      // @ts-ignore
      img.tex = texture;
      img.onload = function() {
        // @ts-ignore
        this.tex.needsUpdate = true;
      };

      const materials = [
        // @ts-ignore
        new THREE.MeshStandardMaterial({color: '#080808', roughness: 0.9 }),
        // @ts-ignore
        new THREE.MeshStandardMaterial({color: '#080808', roughness: 0.9 }),
        // @ts-ignore
        new THREE.MeshStandardMaterial({color: '#080808', roughness: 0.9}),
        // @ts-ignore
        new THREE.MeshStandardMaterial({color: '#080808', roughness: 0.9}),
        // @ts-ignore
        new THREE.MeshStandardMaterial({color: '#999999', map: texture, roughness: 0.9}),
        // @ts-ignore
        new THREE.MeshStandardMaterial({color: '#080808', roughness: 0.9})
      ];

      // @ts-ignore
      this.$el.getObject3D('mesh').material = new THREE.MultiMaterial(materials);
    }, 500);
    this.$gameScene.appendChild(this.$el);
  }

  update(deltaTime: number) {
    const { flash, player } = state;
    const $player = document.querySelector('#player');

    // playerX, playerZ
    const { x: px, y: py, z: pz } = $player.getAttribute('position');
    // @ts-ignore
    this.$el.object3D.lookAt(new THREE.Vector3(px, py, pz));
    // monsterX, monsterZ
    const { x: mx, y: my, z: mz } = this.$el.getAttribute('position');

    const distX = px - mx;
    const distZ = pz - mz;
    const ratio = Math.abs(distZ / distX);

    const dirX = distX >= 0 ? 1 : -1;
    const dirZ = distZ >= 0 ? 1 : -1;

    const distance = Math.sqrt(distX ** 2 + distZ ** 2);

    if(distance < 150) {
      if(!player.nearMonsters.includes(this)) {
        player.nearMonsters.push(this);
      }
    } else {
      player.nearMonsters = player.nearMonsters.filter((monster) => monster !== this);
    }

    if (!this.didFindPlayer && distance < 13) {
      this.didFindPlayer = true;
      this.$el.emit('player-dead', {x: mx, y: my, z: mz});
      // @ts-ignore
      this.$gameScene.systems['game'].restartGame();
    }

    const speed = this.didFindPlayer || !flash.isOn ? this.SPEED * 0.01 : this.SPEED;

    const offsetX = !this.didFindPlayer ? Math.sqrt(speed ** 2 / (1 + ratio ** 2)) : 0;
    const offsetZ = offsetX * ratio;

    this.$el.setAttribute('position', {
      x: mx + offsetX * dirX * deltaTime,
      y: this.HEIGHT + Math.sin(Math.PI * this.deg),
      z: mz + offsetZ * dirZ * deltaTime,
    });

    this.deg += this.BOUNCING_SPEED;
  }
  setDidFindPlayer(didFindPlayer: boolean) {
    this.didFindPlayer = didFindPlayer;
  }
}
