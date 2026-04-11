import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import HexagonButton from '../components/HexagonButton';
import Logo from '../components/Logo';
import { IsIpad } from '../constants/IsIpad';
import { Screen } from '../constants/Screen';
import { useSettingsStore } from '../stores/settingsStore';
import SafeAreaScreenWrapper from './SafeAreaScreenWrapper';
import type { RootStackParamList } from '../types/game';

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const getToggleStyles = (isEnabled: boolean) =>
  isEnabled ? {} : { polygonFill: 'silver', polygonStroke: 'grey', textFill: 'dimgrey' };

const SettingsScreen = React.memo(({ navigation }: Props) => {
  const isSoundEnabled = useSettingsStore((s) => s.isSoundEnabled);
  const isMusicEnabled = useSettingsStore((s) => s.isMusicEnabled);
  const isVibrationEnabled = useSettingsStore((s) => s.isVibrationEnabled);
  const setIsSoundEnabled = useSettingsStore((s) => s.setIsSoundEnabled);
  const setIsMusicEnabled = useSettingsStore((s) => s.setIsMusicEnabled);
  const setIsVibrationEnabled = useSettingsStore((s) => s.setIsVibrationEnabled);

  return (
    <SafeAreaScreenWrapper>
      <Logo />

      <View style={styles.settingsWrapper}>
        <HexagonButton
          styles={styles.settingButton}
          text="MUSIC"
          onPress={() => setIsMusicEnabled(!isMusicEnabled)}
          {...getToggleStyles(isMusicEnabled)}
        />
        <HexagonButton
          styles={styles.settingButton}
          text="SOUND"
          onPress={() => setIsSoundEnabled(!isSoundEnabled)}
          {...getToggleStyles(isSoundEnabled)}
        />
        {!IsIpad && (
          <HexagonButton
            styles={styles.settingButton}
            text="VIBRATION"
            onPress={() => setIsVibrationEnabled(!isVibrationEnabled)}
            {...getToggleStyles(isVibrationEnabled)}
          />
        )}
      </View>

      <View style={styles.backWrapper}>
        <HexagonButton text="BACK" onPress={() => navigation.navigate(Screen.MAIN_MENU)} />
      </View>
    </SafeAreaScreenWrapper>
  );
});

const styles = StyleSheet.create({
  settingsWrapper: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  settingButton: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  backWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    bottom: 10,
  },
});

export default SettingsScreen;
