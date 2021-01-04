import { MUSIC_LOOP } from '../assets/Sounds';

const onSuccessfullyPlayed = (sound) => (success) => {
    if (success) {
        sound.play(onSuccessfullyPlayed(sound));
    }
};

export const playMusicLoop = () => MUSIC_LOOP.play(onSuccessfullyPlayed(MUSIC_LOOP));
