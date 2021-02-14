import { MUSIC_LOOP } from '../assets/Sounds';

const onSuccessfullyPlayed = (sound) => (success) => {
    if (success) {
        sound.play(onSuccessfullyPlayed(sound));
    } else {
        setTimeout(() => {
            sound.play(onSuccessfullyPlayed(sound));
        }, 1000);
    }
};

export const playMusicLoop = () => {
    if (!MUSIC_LOOP.isPlaying()) {
        MUSIC_LOOP.play(onSuccessfullyPlayed(MUSIC_LOOP));
    }
};
