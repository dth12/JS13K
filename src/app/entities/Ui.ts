import { state } from '../systems/state';

export class Ui {
  private $keys: HTMLDivElement;
  private $monsters: HTMLDivElement;
  private $gameOverPage: HTMLDivElement;

  private initUiItems() {
    const {
      uiItem: { keys, monsters },
    } = state;

    // keys ui
    this.$keys.querySelector('.ui_item_total').textContent = `${keys.total}`;
    this.$keys.querySelector('.ui_item_count').textContent = `${keys.count}`;

    // monster ui
    this.$monsters.querySelector('.ui_item_total').textContent = `${monsters.total}`;
    this.$monsters.querySelector('.ui_item_count').textContent = `${monsters.count}`;
  }

  constructor() {
    this.$keys = document.querySelector('.keys') as unknown as HTMLDivElement;
    this.$monsters = document.querySelector('.monsters') as unknown as HTMLDivElement;
    this.$gameOverPage = document.querySelector('.ui_game_over') as unknown as HTMLDivElement;
    this.initUiItems();
  }

  setKeyCount(count: number) {
    state.uiItem.keys.count = count;
    this.$keys.querySelector('.ui_item_count').textContent = `${count}`;
  }

  setMonsterCount(count: number) {
    state.uiItem.monsters.count = count;
    this.$monsters.querySelector('.ui_item_count').textContent = `${count}`;
  }

  setGameOverUi() {
    state.game.isClear = true;
    const gameoverPromise = new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        this.$gameOverPage.classList.remove('off');
        resolve();
      }, 1500);
    });
    gameoverPromise.then(() => {
      state.game.isClear = false;
    });
  }
}
