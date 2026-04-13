import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import {
  BorderedBoxWithBackgroundStyle,
  HexagonButton,
  HiveDimension,
} from 'hivesweeper/shared';

export type DialogConfig = {
  title: string;
  subtitle?: string;
  buttonText: string;
};

type Props = DialogConfig & {
  onButtonPress: () => void;
};

const GameDialog = ({ title, subtitle, buttonText, onButtonPress }: Props) => (
  <Modal transparent animationType="fade" visible>
    <View style={styles.overlay}>
      <View style={styles.dialog}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        <HexagonButton
          width={Math.ceil(0.6 * HiveDimension.WIDTH)}
          text={buttonText}
          onPress={onButtonPress}
        />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialog: {
    ...BorderedBoxWithBackgroundStyle,
    backgroundColor: 'rgba(255, 248, 220, 0.85)',
    width: '80%',
    maxWidth: 400,
    padding: 24,
    gap: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'brown',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#671919',
    textAlign: 'center',
  },
});

export default GameDialog;
