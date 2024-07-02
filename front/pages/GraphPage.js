import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { View } from "react-native-ui-lib";
import { ProgressChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get("window").width;

const progressData = {
    labels: ["칼로리", "탄수화물", "단백질", "지방"], // 선택
    data: [0.2, 0.4, 0.6, 0.8]
};

const progressChartConfig = {
    backgroundGradientFrom: "#FFFFFF", // 배경 시작 색
    backgroundGradientTo: "#FFFFFF", // 배경 끝 색
    color: (opacity = 1) => `rgba(102, 00, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 글자 색깔 변경
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const barChartConfig = {
    backgroundGradientFrom: "#FFFFFF", // 배경 시작 색
    backgroundGradientTo: "#FFFFFF", // 배경 끝 색
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // 글자 색깔 변경
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

const barData = {
    labels: ["나트륨", "비타민 C", "비타민 D", "비타민 B", "비타민 E", "철분"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43]
        }
    ]
};

const GraphPage = () => {
    return (
        <View style={styles.container}>
            <ProgressChart
                data={progressData}
                width={screenWidth * 0.95} // Adjust width to avoid padding issues
                height={220}
                strokeWidth={16}
                radius={40}
                chartConfig={progressChartConfig}
                hideLegend={false}
            />
            <View style={styles.line} />
            <BarChart
                data={barData}
                width={screenWidth * 0.95}
                height={220}
                fromZero={true}
                showBarTops={false}
                yAxisSuffix="%"
                chartConfig={barChartConfig}
                verticalLabelRotation={0}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 8, // Adjust padding as necessary
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: '#000', // 선 색깔
        marginVertical: 20, // 위아래 여백
    },
});

module.exports = { GraphPage };