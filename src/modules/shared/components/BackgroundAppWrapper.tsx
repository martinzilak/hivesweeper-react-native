import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { BACKGROUND } from '../assets/Images';
import { usePlayMusicLoop } from '../hooks/usePlayMusicLoop';

const BackgroundAppWrapper = React.memo(
  ({ children }: { children: React.ReactNode }) => {
    usePlayMusicLoop();

    return (
      <ImageBackground
        style={styles.backgroundImage}
        source={BACKGROUND}
        resizeMode="cover"
      >
        {children}
      </ImageBackground>
    );
  },
);

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
});

export default BackgroundAppWrapper;
