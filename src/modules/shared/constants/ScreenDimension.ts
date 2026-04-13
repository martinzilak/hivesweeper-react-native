import { Dimensions, Platform } from 'react-native';

const window = Dimensions.get('window');

// On web, screen dimensions can be the full display resolution rather than
// the browser viewport, and desktop viewports are landscape so the board
// must be sized off the height rather than width to avoid overflow.
const boardBaseWidth =
  Platform.OS === 'web'
    ? Math.min(window.width, window.height * 0.75)
    : window.width;

export const ScreenDimension = {
  WIDTH: boardBaseWidth,
  HEIGHT: window.height,
};
