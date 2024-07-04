import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import { screenWidth } from 'react-native-gifted-charts/src/utils';
import * as Progress from 'react-native-progress';

const barSize = screenWidth * 0.9 * 0.1
const blankSize = screenWidth * 0.9 * 0.035

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
            labelWidth: screenWidth * 0.1,
            labelTextStyle: { color: 'gray' },
            frontColor: '#6600FF',
        },
        {
            value: 50,
            label: '포화지방',
            labelWidth: screenWidth * 0.1,
            labelTextStyle: { color: 'gray' },
            frontColor: '#6600FF',
        },
        {
            value: 75,
            label: '트랜스지방',
            labelWidth: screenWidth * 0.1,
            labelTextStyle: { color: 'gray' },
            frontColor: '#6600FF',
        },
        {
            value: 30,
            label: "당류",
            labelWidth: screenWidth * 0.1,
            labelTextStyle: { color: 'gray' },
            frontColor: '#6600FF',
        },
        {
            value: 60,
            label: '칼슘',
            labelWidth: screenWidth * 0.1,
            labelTextStyle: { color: 'gray' },
            frontColor: '#6600FF',
        },
        {
            value: 65,
            label: '콜레스테롤',
            labelWidth: screenWidth * 0.1,
            labelTextStyle: { color: 'gray' },
            frontColor: '#6600FF',
        },
    ];

    return (
        <>
            <View style={[styles.boxContainer]}>
                <Text style={styles.sectionLabel}>일일 칼로리 섭취량</Text>
                <View style = {styles.chartContainer}>
                    <Progress.Bar 
                        progress={0.5} 
                        width={screenWidth * 0.8} 
                        color={'#FF6347'} 
                        style={styles.progressBar}
                    />
                </View>
                <View style = {{flexDirection:"row"}}>
                    <Text style={styles.progressLabel}>50 %</Text>
                    <Text style={styles.progressLabel}>1500 Kcal</Text>
                </View>
            </View>
            <View style={styles.boxContainer}>
                <Text style={styles.sectionLabel}>일일 주요 영양소 섭취량</Text>
                <View style={styles.chartContainer}>
                    <View style={styles.pieChartWrapper}>
                        <PieChart
                            data={pieData}
                            donut
                            radius={screenWidth * 0.13}
                            innerRadius={screenWidth * 0.08}
                            centerLabelComponent={() => {
                                return (
                                    <View style={styles.centerLabel}>
                                        <Text style={styles.centerLabelText}>
                                            47%
                                        </Text>
                                        <Text style={styles.centerLabelSubText}>탄수화물</Text>
                                    </View>
                                );
                            }}
                        />
                    </View>
                    <View style={styles.separatorVertical} />
                    <View style={styles.pieChartWrapper}>
                        <PieChart
                            data={pieData}
                            donut
                            radius={screenWidth * 0.13}
                            innerRadius={screenWidth * 0.08}
                            centerLabelComponent={() => {
                                return (
                                    <View style={styles.centerLabel}>
                                        <Text style={styles.centerLabelText}>
                                            47%
                                        </Text>
                                        <Text style={styles.centerLabelSubText}>단백질</Text>
                                    </View>
                                );
                            }}
                        />
                    </View>
                    <View style={styles.separatorVertical} />
                    <View style={styles.pieChartWrapper}>
                        <PieChart
                            data={pieData}
                            donut
                            radius={screenWidth * 0.13}
                            innerRadius={screenWidth * 0.08}
                            centerLabelComponent={() => {
                                return (
                                    <View style={styles.centerLabel}>
                                        <Text style={styles.centerLabelText}>
                                            47%
                                        </Text>
                                        <Text style={styles.centerLabelSubText}>지방</Text>
                                    </View>
                                );
                            }}
                        />
                    </View>
                </View>
            </View>
            <View style = {styles.boxContainer}>
                <Text style={styles.sectionLabel}>일일 기타 영양소 섭취량</Text>
                <View style={styles.chartContainer}>
                    <BarChart
                        data={barData}
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
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    progressContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    progressLabel: {
        fontSize: 16,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#333',
    },
    sectionLabel: {
        fontSize: 18,
        marginVertical: 15,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    infoBox: {
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    boxContainer: {
        flexDirection: 'colume',
        justifyContent: 'space-around',
        padding: 10,
        alignItems: 'center',
        marginBottom:5,
        marginHorizontal: 5,
        width: '98%',
        backgroundColor: '#f8f8f8',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
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
    pieChartWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    separatorVertical: {
        width: 1,
        height: '100%',
        backgroundColor: '#ccc',
        marginHorizontal: 10,
    },
    barChartContainer: {
        margin: 20,
        padding: 20,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    centerLabel: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerLabelText: {
        fontSize: "80%",
        color: 'Black',
        fontWeight: 'bold',
    },
    centerLabelSubText: {
        fontSize: "60%",
        color: 'Black',
    },
    progressBar: {
        borderRadius: 5,
    },
});

module.exports = { GraphPage };