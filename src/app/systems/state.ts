interface PlayerStatus {
  isRunning: boolean;
}

interface UiItem {
  total: number;
  count: number;
}

interface UiStatus {
  keys: UiItem;
  monsters: UiItem;
}

interface FlashStatus {
  isOn: boolean;
  battery: number;
}

interface LevelStatus {
  mapWitdh: number;
  mapHeight: number;
  roomRowCount: number;
}

class State {
  player: PlayerStatus = {
    isRunning: false,
  };
  level: LevelStatus = {
    mapHeight: 500,
    mapWitdh: 500,
    roomRowCount: 5,
  };
  flash: FlashStatus = {
    isOn: false,
    battery: 100,
  };
  uiItem: UiStatus = {
    keys: { total: 10, count: 0 },
    monsters: { total: 10, count: 0 },
  };
}

export const state = new State();
