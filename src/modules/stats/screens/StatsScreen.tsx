import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HexagonButton , Logo , StatRow , BorderedBoxWithBackgroundStyle , Screen , SafeAreaScreenWrapper ,type  RootStackParamList } from 'hivesweeper/shared';
import { Stat ,type  StatEntry } from '../constants/Stat';
import { useStatsStore } from '../store';

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const StatsScreen = React.memo(({ navigation }: Props) => {
  const stats = useStatsStore((s) => s.stats);

  return (
    <SafeAreaScreenWrapper>
      <Logo />

      <View style={styles.contentWrapper}>
        <View style={styles.statsWrapper}>
          <ScrollView style={styles.scrollView} horizontal={false} alwaysBounceVertical={false}>
            {Object.values(Stat).map((stat: StatEntry) => (
              <StatRow key={stat.key} label={stat.label} value={stats[stat.key]} />
            ))}
          </ScrollView>
        </View>

        <View style={styles.backWrapper}>
          <HexagonButton text="BACK" onPress={() => navigation.navigate(Screen.MAIN_MENU)} />
        </View>
      </View>
    </SafeAreaScreenWrapper>
  );
});

const styles = StyleSheet.create({
  contentWrapper: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
  },
  statsWrapper: {
    flex: 4,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '95%',
    ...BorderedBoxWithBackgroundStyle,
  },
  scrollView: {
    width: '100%',
  },
  backWrapper: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    bottom: 10,
  },
});

export default StatsScreen;
