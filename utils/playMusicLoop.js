import { MUSIC_LOOP } from '../assets/Sounds';

const onSuccessfullyPlayed = (sound) => (success) => {
    if (success) {
        sound.play(onSuccessfullyPlayed(sound));
    }
};

export const playMusicLoop = () => {
    if (!MUSIC_LOOP.isPlaying()) {
        MUSIC_LOOP.play(onSuccessfullyPlayed(MUSIC_LOOP));
    }
};
