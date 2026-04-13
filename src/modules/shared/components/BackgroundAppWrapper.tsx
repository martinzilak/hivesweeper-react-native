import React from 'react';
import { ImageBackground, Platform, StyleSheet } from 'react-native';
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
    width: '100%',
    ...(Platform.OS === 'web' && {
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    }),
  },
});

export default BackgroundAppWrapper;
