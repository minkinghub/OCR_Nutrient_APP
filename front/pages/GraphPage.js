import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { screenWidth } from 'react-native-gifted-charts/src/utils';
import * as Progress from 'react-native-progress';
import { DonutGraph, BarGraph, LoadingComponent, loadNutrient, useUser } from '../components';
import { useFocusEffect } from '@react-navigation/native';

const labelSize = screenWidth * 0.9 * 0.095;

const GraphPage = () => {
    const { user } = useUser();
    const [nutrient, setNutrient] = useState({});  // 서버에서 받아온 영양소 정보
    const [tdee, setTdee] = useState(1);  // 서버에서 받아온 tdee
    const [isLoading, setIsLoading] = useState(true);
    const [pieData, setPieData] = useState({
        charbodrate : [
            {
                value: 0,
                color: "#3366FF",
            }, {
                value: 100,
                color: "#DDDDDD"
            }
        ],
        protein : [
            {
                value: 0,
                color: "#3366FF",
            }, {
                value: 100,
                color: "#DDDDDD"
            }
        ],
        fat : [
            {
                value: 0,
                color: "#3366FF",
            }, {
                value: 100,
                color: "#DDDDDD"
            }
        ],
    });

    const [barData, setBarData] = useState(
        [
            {
                value: 1,
                label: '나트륨',
                labelWidth: labelSize,
                labelTextStyle: { color: 'gray' },
                frontColor: '#30A2FF',
            },
            {
                value: 1,
                label: '포화지방',
                labelWidth: labelSize,
                labelTextStyle: { color: 'gray' },
                frontColor: '#ADC8FF',
            },
            {
                value: 1,
                label: '트랜스지방',
                labelWidth: labelSize,
                labelTextStyle: { color: 'gray' },
                frontColor: '#84A9FF',
            },
            {
                value: 1,
                label: "당류",
                labelWidth: labelSize,
                labelTextStyle: { color: 'gray' },
                frontColor: '#6690FF',
            },
            {
                value: 1,
                label: '칼슘',
                labelWidth: labelSize,
                labelTextStyle: { color: 'gray' },
                frontColor: '#3366FF',
            },
            {
                value: 1,
                label: '콜레스테롤',
                labelWidth: labelSize,
                labelTextStyle: { color: 'gray' },
                frontColor: '#254EDB',
            },
        ]
    );

    const updateData = async () => {
        setIsLoading(true);
        const data = await loadNutrient({ documentKey: user });
        console.log("data : ", data);
        if (Object.keys(data).length === 0) {
            Alert.alert("오류 발생");
            return;
        }
        const newTdee = Math.floor(data.tdee);
        const newNutrient = data.nutrient;
        console.log(newNutrient);
        setNutrient(newNutrient);
        setTdee(newTdee);

        const newPieData = {
            charbodrate : [
                {
                    value: Math.floor((newNutrient.charbodrate / ((newTdee * 0.65) / 4)) * 100),
                    color: "#3366FF",
                }, {
                    value: 100 - Math.floor((newNutrient.charbodrate / ((newTdee * 0.65) / 4)) * 100),
                    color: "#DDDDDD"
                }
            ],
            protein : [
                {
                    value: Math.floor((newNutrient.protein / ((newTdee * 0.2) / 4)) * 100),
                    color: "#3366FF",
                }, {
                    value: 100 - Math.floor((newNutrient.protein / ((newTdee * 0.2) / 4)) * 100),
                    color: "#DDDDDD"
                }
            ],
            fat : [
                {
                    value: Math.floor((newNutrient.fat / ((newTdee * 0.35) / 9)) * 100),
                    color: "#3366FF",
                }, {
                    value: 100 - Math.floor((newNutrient.fat / ((newTdee * 0.35) / 9)) * 100),
                    color: "#DDDDDD"
                }
            ],
        };
        setPieData(newPieData);

        const newBarData = [
            {
                value: Math.floor((newNutrient.sodium / 2300) * 100),
                label: '나트륨',
                labelWidth: labelSize,
                labelTextStyle: { color: 'gray' },
                frontColor: '#30A2FF',
            },
            {
                value: Math.floor((newNutrient.saturatedFat / (newTdee * 0.1)) * 100),
                label: '포화지방',
                labelWidth: labelSize,
                labelTextStyle: { color: 'gray' },
                frontColor: '#ADC8FF',
            },
            {
                value: Math.floor((newNutrient.transFat / (newTdee * 0.01)) * 100),
                label: '트랜스지방',
                labelWidth: labelSize,
                labelTextStyle: { color: 'gray' },
                frontColor: '#84A9FF',
            },
            {
                value: Math.floor((newNutrient.sugar / 100) * 100),
                label: "당류",
                labelWidth: labelSize,
                labelTextStyle: { color: 'gray' },
                frontColor: '#6690FF',
            },
            {
                value: Math.floor((newNutrient.calcium / 1000) * 100),
                label: '칼슘',
                labelWidth: labelSize,
                labelTextStyle: { color: 'gray' },
                frontColor: '#3366FF',
            },
            {
                value: Math.floor((newNutrient.cholesterol / 300) * 100),
                label: '콜레스테롤',
                labelWidth: labelSize,
                labelTextStyle: { color: 'gray' },
                frontColor: '#254EDB',
            },
        ];
        setBarData(newBarData);

        setIsLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            updateData();
        }, [])
    );

    if (isLoading) {
        return <LoadingComponent />;
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={[styles.boxContainer]}>
                <Text style={styles.sectionLabel}>일일 칼로리 섭취량</Text>
                <View style={styles.chartContainer}>
                    <Progress.Bar
                        progress={nutrient.calorie && tdee ? nutrient.calorie / tdee : 0}
                        width={screenWidth * 0.8}
                        color={'#FF6347'}
                        style={styles.progressBar}
                    />
                </View>
                <View style={{ flexDirection: "row", justifyContent: 'space-between', width: '100%', paddingHorizontal: 10 }}>
                    <Text style={styles.progressLabel}>{nutrient.calorie && tdee ? Math.floor((nutrient.calorie / tdee) * 100) : 0} %</Text>
                    <Text style={styles.progressLabel}>{nutrient.calorie || 0} / {tdee} Kcal</Text>
                </View>
            </View>
            <View style={styles.boxContainer}>      
                <Text style={styles.sectionLabel}>일일 주요 영양소 섭취량</Text>
                <View style={styles.chartContainer}>
                    <DonutGraph data={pieData.charbodrate} label="탄수화물" />
                    <View style={styles.separatorVertical} />
                    <DonutGraph data={pieData.protein} label="단백질" />
                    <View style={styles.separatorVertical} />
                    <DonutGraph data={pieData.fat} label="지방" />
                </View>
            </View>
            <View style={styles.boxContainer}>
                <Text style={styles.sectionLabel}>일일 기타 영양소 섭취량</Text>
                <BarGraph data={barData} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
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
        marginBottom: "4%",
        marginHorizontal: 5,
        width: '98%',
        backgroundColor: '#EFf2EA',
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