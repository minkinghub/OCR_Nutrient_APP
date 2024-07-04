import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { screenWidth } from 'react-native-gifted-charts/src/utils';
import * as Progress from 'react-native-progress';
import { DonutGraph, BarGraph, LoadingComponent, loadNutrient } from '../components';

const userId = "66861ec2d90427eb49eda019";

const labelSize = screenWidth * 0.9 * 0.095;

const GraphPage = () => {
    const [nutrient, setNutrient] = useState({});  // 서버에서 받아온 영양소 정보
    const [tdee, setTdee] = useState(1);  // 서버에서 받아온 tdee
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const setInfos = async () => {
            const data = await loadNutrient({ documentKey: userId });
            console.log("data : ", data);
            if (Object.keys(data).length === 0) {
                Alert.alert("오류 발생");
                return;
            }
            setNutrient(data.nutrient);
            setTdee(data.tdee);
            setIsLoading(false);
        };

        setInfos();
    }, []);

    useEffect(() => {
        console.log(tdee);
    }, [tdee]);

    useEffect(() => {
        console.log(nutrient);
    }, [nutrient]);

    if (isLoading) {
        return <LoadingComponent />;
    }

    const pieData = [
        {
            value: 30,
            color: '#3366FF',
        },
        { value: 100, color: '#DDDDDD' },
    ];

    const barData = [
        {
            value: 30,
            label: '나트륨',
            labelWidth: labelSize,
            labelTextStyle: { color: 'gray' },
            frontColor: '#30A2FF',
        },
        {
            value: 30,
            label: '포화지방',
            labelWidth: labelSize,
            labelTextStyle: { color: 'gray' },
            frontColor: '#ADC8FF',
        },
        {
            value: 30,
            label: '트랜스지방',
            labelWidth: labelSize,
            labelTextStyle: { color: 'gray' },
            frontColor: '#84A9FF',
        },
        {
            value: 30,
            label: "당류",
            labelWidth: labelSize,
            labelTextStyle: { color: 'gray' },
            frontColor: '#6690FF',
        },
        {
            value: 30,
            label: '칼슘',
            labelWidth: labelSize,
            labelTextStyle: { color: 'gray' },
            frontColor: '#3366FF',
        },
        {
            value: 40,
            label: '콜레스테롤',
            labelWidth: labelSize,
            labelTextStyle: { color: 'gray' },
            frontColor: '#254EDB',
        },
    ];

    return (
        <>
            <View style={[styles.boxContainer]}>
                <Text style={styles.sectionLabel}>일일 칼로리 섭취량</Text>
                <View style={styles.chartContainer}>
                    <Progress.Bar
                        progress={0 || ( nutrient.calories / tdee) }
                        width={screenWidth * 0.8}
                        color={'#FF6347'}
                        style={styles.progressBar}
                    />
                </View>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.progressLabel}>50 %</Text>
                    <Text style={styles.progressLabel}> 1500 / 3000 Kcal</Text>
                </View>
            </View>
            <View style={styles.boxContainer}>
                <Text style={styles.sectionLabel}>일일 주요 영양소 섭취량</Text>
                <View style={styles.chartContainer}>
                    <DonutGraph data={pieData} label="탄수화물" />
                    <View style={styles.separatorVertical} />
                    <DonutGraph data={pieData} label="단백질" />
                    <View style={styles.separatorVertical} />
                    <DonutGraph data={pieData} label="지방" />
                </View>
            </View>
            <View style={styles.boxContainer}>
                <Text style={styles.sectionLabel}>일일 기타 영양소 섭취량</Text>
                <BarGraph data={barData} />
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
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 10,
        alignItems: 'center',
        marginBottom: 5,
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
    progressBar: {
        borderRadius: 5,
    },
});

module.exports = { GraphPage };