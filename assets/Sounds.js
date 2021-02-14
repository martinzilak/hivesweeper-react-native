import Sound from 'react-native-sound';

Sound.setCategory('Playback');
Sound.setMode('Default');

const PRESS = new Sound(require('./sounds/press.mp3'));
PRESS.setVolume(1);
PRESS.setNumberOfLoops(0);

const LONG_PRESS = new Sound(require('./sounds/long_press.mp3'));
LONG_PRESS.setVolume(1);
LONG_PRESS.setNumberOfLoops(0);

const WIN = new Sound(require('./sounds/win.mp3'));
WIN.setVolume(1);
WIN.setNumberOfLoops(0);

const LOSE = new Sound(require('./sounds/lose.mp3'));
LOSE.setVolume(1);
LOSE.setNumberOfLoops(0);

const MUSIC_LOOP = new Sound(require('./sounds/music_loop.mp3'));
MUSIC_LOOP.setVolume(1);
MUSIC_LOOP.setNumberOfLoops(0);

export { PRESS, LONG_PRESS, WIN, LOSE, MUSIC_LOOP };
