import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import "react-native-svg";
import 'react-native-gesture-handler';

import { UserProvider } from './components';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import MyPageScreen from './components/MyPageScreen';
import MainTabs from './components/MainTabs';

// Drawer Navigator를 생성
const Drawer = createDrawerNavigator();

// MainDrawer 컴포넌트는 Drawer Navigator를 사용하여 메인 탭과 마이 페이지를 렌더링
function MainDrawer({ route }) {
  const { id, password, age, height, weight, gender, isAthlete } = route.params;

  return (
    <Drawer.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        drawerActiveTintColor: '#4CAF50',
        drawerInactiveTintColor: 'gray',
        drawerStyle: {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ drawerLabel: 'Main Tabs' }} // 드로어 메뉴에서 "Main Tabs"로 표시
      />
      <Drawer.Screen name="Mypage">
        {props => (
          <MyPageScreen
            {...props}
            id={id}
            password={password}
            age={age}
            height={height}
            weight={weight}
            gender={gender}
            isAthlete={isAthlete}
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

// Stack Navigator를 생성
const Stack = createStackNavigator();

// App 컴포넌트는 네비게이션 컨테이너를 사용하여 앱의 전체 네비게이션 구조를 정의
export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainDrawer"
            component={MainDrawer}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}