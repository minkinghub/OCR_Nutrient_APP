import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GraphPage } from "../pages/GraphPage"
// import socketTestPage from '../pages/SocketTestPage';

// DayScreen 컴포넌트: 1일 통계를 표시
function DayScreen() {
  return (
    <View style={styles.container}>
      {/* <socketTestPage /> */}
      <GraphPage />
    </View>
  );
}

// WeekScreen 컴포넌트: 1주 통계를 표시
function WeekScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>1주 통계</Text>
    </View>
  );
}

// MaterialTopTabNavigator를 생성
const TopTab = createMaterialTopTabNavigator();

// StatsScreen 컴포넌트: 상단 탭 네비게이션을 사용하여 DayScreen과 WeekScreen을 렌더링
export default function StatsScreen() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#ccc',
        tabBarStyle: { backgroundColor: '#4CAF50' },
        tabBarIndicatorStyle: { backgroundColor: '#fff' },
      }}
    >
      {/* 1일 통계를 표시하는 탭 */}
      <TopTab.Screen name="Day" component={DayScreen} options={{ title: '1일' }} />

      {/* 1주 통계를 표시하는 탭 */}
      <TopTab.Screen name="Week" component={WeekScreen} options={{ title: '1주' }} />
    </TopTab.Navigator>
  );
}

// 스타일 시트
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
