import React from 'react';
import { BarChart } from 'react-native-gifted-charts';
import { screenWidth } from 'react-native-gifted-charts/src/utils';
import { StyleSheet, View } from 'react-native';

const barSize = screenWidth * 0.9 * 0.1
const blankSize = screenWidth * 0.9 * 0.035

const BarGraph = ({ data }) => {
    return (
        <View style={styles.chartContainer}>
            <BarChart
                data={data}
                barWidth={barSize}
                spacing={blankSize}
                roundedTop
                xAxisThickness={2}
                yAxisThickness={0}
                hideYAxisText={true}
                noOfSections={4}
                maxValue={100}
                isAnimated
            />
        </View>
    );
};

const styles = StyleSheet.create({
    chartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '98%',
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
});

module.exports = {
    BarGraph
}