import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import { screenWidth } from 'react-native-gifted-charts/src/utils';

const GraphPage = () => {
    const pieData = [
        {
            value: 47,
            color: '#6600FF',
        },
        { value: 54, color: '#DDDDDD' },
    ];

    const barData = [
        {
            value: 40,
            label: '나트륨',
            spacing: 2,
            labelWidth: screenWidth* 0.11,
            labelTextStyle: { color: 'gray' },
            frontColor: '#177AD5',
        },
        { value: 20, frontColor: '#ED6665' },
        {
            value: 50,
            label: '포화지방',
            spacing: 2,
            labelWidth: screenWidth* 0.11,
            labelTextStyle: { color: 'gray' },
            frontColor: '#177AD5',
        },
        { value: 40, frontColor: '#ED6665' },
        {
            value: 75,
            label: '트랜스지방',
            spacing: 2,
            labelWidth: screenWidth* 0.11,
            labelTextStyle: { color: 'gray' },
            frontColor: '#177AD5',
        },
        { value: 25, frontColor: '#ED6665' },
        {
            value: 30,
            label: "당류",
            spacing: 2,
            labelWidth: screenWidth* 0.11,
            labelTextStyle: { color: 'gray' },
            frontColor: '#177AD5',
        },
        { value: 20, frontColor: '#ED6665' },
        {
            value: 60,
            label: '칼슘',
            spacing: 2,
            labelWidth: screenWidth* 0.11,
            labelTextStyle: { color: 'gray' },
            frontColor: '#177AD5',
        },
        { value: 40, frontColor: '#ED6665' },
        {
            value: 65,
            label: '콜레스테롤',
            spacing: 2,
            labelWidth: screenWidth* 0.11,
            labelTextStyle: { color: 'gray' },
            frontColor: '#177AD5',
        },
        { value: 30, frontColor: '#ED6665' },
    ];

    return (
        <>
            <View style={styles.row}>
                <View style={styles.chartContainer}>
                    <PieChart
                        data={pieData}
                        donut
                        // strokeColor="yellow"
                        // strokeWidth={1}
                        // innerCircleBorderWidth={1}
                        // innerCircleBorderColor={'yellow'}
                        radius={screenWidth * 0.15}
                        innerRadius={screenWidth * 0.1}
                        centerLabelComponent={() => {
                            return (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text
                                        style={{ fontSize: "110%", color: 'Black', fontWeight: 'bold' }}>
                                        47%
                                    </Text>
                                    <Text style={{ fontSize: "90%", color: 'Black' }}>탄수화물</Text>
                                </View>
                            );
                        }}
                    />
                </View>
                <View style={styles.chartContainer}>
                    <PieChart
                        data={pieData}
                        donut
                        radius={screenWidth * 0.15}
                        innerRadius={screenWidth * 0.1}
                        centerLabelComponent={() => {
                            return (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text
                                        style={{ fontSize: "110%", color: 'Black', fontWeight: 'bold' }}>
                                        47%
                                    </Text>
                                    <Text style={{ fontSize: "90%", color: 'Black' }}>단백질</Text>
                                </View>
                            );
                        }}
                    />
                </View>
                <View style={styles.chartContainer}>
                    <PieChart
                        data={pieData}
                        donut
                        radius={screenWidth * 0.15}
                        innerRadius={screenWidth * 0.1}
                        centerLabelComponent={() => {
                            return (
                                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                    <Text
                                        style={{ fontSize: "110%", color: 'Black', fontWeight: 'bold' }}>
                                        47%
                                    </Text>
                                    <Text style={{ fontSize: "90%", color: 'Black' }}>지방</Text>
                                </View>
                            );
                        }}
                    />
                </View>
            </View>
            <BarChart
                data={barData}
                barWidth={screenWidth * 0.05}
                spacing={screenWidth * 0.03}
                roundedTop
                xAxisThickness={2}
                yAxisThickness={0}
                yAxisTextStyle={{ color: 'gray' }}
                noOfSections={4}
                maxValue={100}
                isAnimated
            />
        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    chartContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

module.exports = { GraphPage };