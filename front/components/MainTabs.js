import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import StatsScreen from './StatsScreen';
import ImageScreen from './ImageScreen';

// Bottom Tab Navigator를 생성
const Tab = createBottomTabNavigator();

// MainTabs 컴포넌트는 StatsScreen과 ImageScreen을 탭 네비게이션으로 구성
function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Stats"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          // 각 탭의 아이콘을 설정
          let iconName;

          if (route.name === 'Stats') {
            iconName = focused ? 'stats-chart' : 'stats-chart-outline';
          } else if (route.name === 'Image') {
            iconName = focused ? 'image' : 'image-outline';
          }

          // Ionicons 컴포넌트를 사용하여 아이콘을 렌더링
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4CAF50',   // 활성화된 탭의 색상을 설정
        tabBarInactiveTintColor: 'gray',    // 비활성화된 탭의 색상을 설정
        tabBarStyle: { backgroundColor: '#f5f5f5' },
        headerShown: false, // 탭 네비게이션 상단의 헤더를 숨김
      })}
    >
      
      {/* StateScreen을 Stats 탭에 설정 */}
      <Tab.Screen
        name="Stats"
        component={StatsScreen}
        options={{ tabBarLabel: '통계' }}
      />
      
      {/* ImageScreen을 Image 탭에 설정 */}
      <Tab.Screen
        name="Image"
        component={ImageScreen}
        options={{ tabBarLabel: '이미지' }}
      />
    </Tab.Navigator>
  );
}

export default MainTabs;