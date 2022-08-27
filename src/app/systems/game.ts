import { Level } from './level';

AFRAME.registerSystem('game', {
  schema: {},

  init() {
    console.log('Game Initialized');
    // TODO: Move to seperate class (ex. Player)
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case ' ':
          const $flash = document.querySelector('#flash');
          const isFlashOn = $flash.getAttribute('intensity') !== '0';

          $flash.setAttribute('intensity', isFlashOn ? '0' : '1 ');
      }
    });
    Level.createStage(1);
  },

  tick(_time, timeDelta) {
    Level.update(timeDelta);
  },
});
