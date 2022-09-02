interface UiItem {
  total: number;
  count: number;
}

interface UiStatus {
  keys: UiItem;
  monsters: UiItem;
}

export class Ui {
  private status: UiStatus;
  private $keys: HTMLDivElement;
  private $monsters: HTMLDivElement;

  private initUiItems() {
    // keys ui
    this.$keys.querySelector('.ui_item_total').textContent = `${this.status.keys.total}`;
    this.$keys.querySelector('.ui_item_count').textContent = `${this.status.keys.count}`;

    // monster ui
    this.$monsters.querySelector('.ui_item_total').textContent = `${this.status.monsters.total}`;
    this.$monsters.querySelector('.ui_item_count').textContent = `${this.status.monsters.count}`;
  }

  constructor() {
    this.$keys = document.querySelector('.keys') as unknown as HTMLDivElement;
    this.$monsters = document.querySelector('.monsters') as unknown as HTMLDivElement;
    this.status = {
      keys: { total: 10, count: 0 },
      monsters: { total: 5, count: 0 },
    };
    this.initUiItems();
  }
}
