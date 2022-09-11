import {state} from '../systems/state';

export class Ui {
  private $keys: HTMLDivElement;
  private $monsters: HTMLDivElement;
  private $mainPage: HTMLDivElement;

  private initUiItems() {
    const {
      uiItem: { keys, monsters },
      game,
    } = state;

    // keys ui
    this.$keys.querySelector('.ui_item_total').textContent = `${keys.total}`;
    this.$keys.querySelector('.ui_item_count').textContent = `${keys.count}`;

    // monster ui
    this.$monsters.querySelector('.ui_item_total').textContent = `${monsters.total}`;
    this.$monsters.querySelector('.ui_item_count').textContent = `${monsters.count}`;

    // main ui
    this.$mainPage.querySelector('.ui_main_start').addEventListener('click', () => {
      game.isStarted = true;
      this.$mainPage.classList.add('off');
    });
  }

  constructor() {
    this.$keys = document.querySelector('.keys') as unknown as HTMLDivElement;
    this.$monsters = document.querySelector('.monsters') as unknown as HTMLDivElement;
    this.$mainPage = document.querySelector('.ui_main') as unknown as HTMLDivElement;
    this.initUiItems();
  }

  setMonsterCount(count: number) {
    this.$monsters.querySelector('.ui_item_count').textContent = `${count}`;
  }
}
