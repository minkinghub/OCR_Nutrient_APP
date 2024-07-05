import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { screenWidth } from 'react-native-gifted-charts/src/utils';

const DonutGraph = ({ data, label }) => {
    return (
        <View style={styles.pieChartWrapper}>
            <PieChart
                data={data}
                donut
                radius={screenWidth * 0.13}
                innerRadius={screenWidth * 0.08}
                centerLabelComponent={() => {
                    return (
                        <View style={styles.centerLabel}>
                            <Text style={styles.centerLabelText}>
                                {data[0].value}%
                            </Text>
                            <Text style={styles.centerLabelSubText}>{label}</Text>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    pieChartWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    centerLabel: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerLabelText: {
        fontSize: 16,
        color: 'Black',
        fontWeight: 'bold',
    },
    centerLabelSubText: {
        fontSize: 12,
        color: 'Black',
    },
});

module.exports = { DonutGraph }