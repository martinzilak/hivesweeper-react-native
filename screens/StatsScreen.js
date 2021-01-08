import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import * as R from 'ramda';
import HexagonButton from '../components/HexagonButton';
import Logo from '../components/Logo';
import StatRow from '../components/StatRow';
import { Screen } from '../constants/Screen';
import { Stats } from '../constants/Stats';
import { useStats } from '../hooks/useStats';
import BackgroundScreenWrapper from './BackgroundScreenWrapper';

const StatsScreen = ({ navigation }) => {
    const { stats, resetStats } = useStats();

    return (
        <BackgroundScreenWrapper>
            <View style={styles.logoWrapper}>
                <Logo />
            </View>

            <View style={styles.statsWrapper}>
                <ScrollView horizontal={false}>
                    {R.map((stat) => (
                        <StatRow
                            key={stat.key}
                            label={stat.label}
                            value={stats[stat.key]}
                        />
                    ))(Stats)}
                </ScrollView>
            </View>

            <View style={styles.backWrapper}>
                <HexagonButton
                    text="BACK"
                    onPress={() => navigation.navigate(Screen.MAIN_MENU)}
                />
            </View>
        </BackgroundScreenWrapper>
    );
};

StatsScreen.propTypes = {
    navigation: PropTypes.object,
};

const styles = StyleSheet.create({
    logoWrapper: {
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 40,
    },
    statsWrapper: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '90%',
        padding: 5,
        borderWidth: 1,
        borderColor: 'orange',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    backWrapper: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
});

export default StatsScreen;
