declare module 'honeycomb-grid' {
  import type { PrimitiveHex } from './game';

  type Grid = {
    [index: number]: PrimitiveHex;
    length: number;
    neighborsOf(hex: PrimitiveHex): (PrimitiveHex | undefined)[];
    forEach(callback: (hex: PrimitiveHex) => void): void;
    map<T>(callback: (hex: PrimitiveHex) => T): T[];
  };

  type HexFactory = (coords?: { x: number; y: number }) => PrimitiveHex;

  type GridFactory = {
    hexagon(options: { radius: number; center: [number, number] }): Grid;
  };

  function extendHex(options: { size: number; orientation?: string }): HexFactory;
  function defineGrid(hexFactory: HexFactory): GridFactory;
}
