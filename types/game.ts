export type GameSizeValue = 4 | 6 | 8;

export type PrimitiveHex = {
  x: number;
  y: number;
  corners(): { x: number; y: number }[];
  toPoint(): { x: number; y: number };
};

export type HiveCell = {
  primitiveHex: PrimitiveHex;
  id: string;
  pointsString: string;
  x: number;
  y: number;
  cellSize: number;
  isBee: boolean;
  isFlagged: boolean;
  isRevealed: boolean;
  neighborIds: string[];
  neighboringBees: number;
};

export type HiveGrid = Record<string, HiveCell>;

export type PersistentSettings = {
  isSoundEnabled: boolean;
  isMusicEnabled: boolean;
  isVibrationEnabled: boolean;
};

export type VolatileSettings = {
  gameSize: GameSizeValue;
};

export type Stats = Record<string, number>;

export type RootStackParamList = {
  MainMenuScreen: undefined;
  NewGameSizeScreen: undefined;
  GameScreen: undefined;
  SettingsScreen: undefined;
  StatsScreen: undefined;
};