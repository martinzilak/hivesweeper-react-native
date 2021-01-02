import Sound from 'react-native-sound';

Sound.setCategory('Playback');
Sound.setMode('Default');

const BEE = new Sound(require('./sounds/bee.mp3'));
BEE.setVolume(1);
BEE.setNumberOfLoops(0);

const CLICK = new Sound(require('./sounds/click.mp3'));
CLICK.setVolume(1);
CLICK.setNumberOfLoops(0);

const FLAG = new Sound(require('./sounds/flag.mp3'));
FLAG.setVolume(1);
FLAG.setNumberOfLoops(0);

const LOSE = new Sound(require('./sounds/lose.mp3'));
LOSE.setVolume(1);
LOSE.setNumberOfLoops(0);

const REVEAL = new Sound(require('./sounds/reveal.mp3'));
REVEAL.setVolume(1);
REVEAL.setNumberOfLoops(0);

const WIN = new Sound(require('./sounds/win.mp3'));
WIN.setVolume(1);
WIN.setNumberOfLoops(0);

const MUSIC_LOOP = new Sound(require('./sounds/music_loop.mp3'));
MUSIC_LOOP.setVolume(1);
MUSIC_LOOP.setNumberOfLoops(-1);

export { BEE, CLICK, FLAG, LOSE, REVEAL, WIN, MUSIC_LOOP };
