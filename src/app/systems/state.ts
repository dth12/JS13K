interface PlayerStatus {
  isRunning: boolean;
  isMuted: boolean;
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

interface RoomSection {
  leftRooms: { x: number; z: number }[];
  rightRooms: { x: number; z: number }[];
  xOffset: number;
  zOffset: number;
}

class LevelState {
  mapHeight = 500;
  mapWidth = 500;
  roomRowCount = 5;
  get roomCount() {
    return this.roomRowCount * 2;
  }
  get roomSection() {
    const OFFSET_MARGIN = 10;
    const xLeft = (-this.mapWidth * 3) / 8;
    const xOffset = this.mapWidth / 8 - OFFSET_MARGIN;
    const zOffset = this.mapHeight / this.roomRowCount / 2 - OFFSET_MARGIN;
    const xRight = (this.mapWidth * 3) / 8;
    return Array.from({ length: this.roomRowCount }).reduce<RoomSection>(
      (p, _, i) => {
        const z =
          ((2 * i - this.roomRowCount) * this.mapHeight) / (2 * this.roomRowCount) +
          this.mapHeight / (2 * this.roomRowCount);
        p.leftRooms.push({ x: xLeft, z });
        p.rightRooms.push({ x: xRight, z });
        return p;
      },
      { leftRooms: [], rightRooms: [], xOffset, zOffset }
    );
  }
}

class State {
  player: PlayerStatus = {
    isRunning: false,
    isMuted: false,
  };
  level = new LevelState();
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
