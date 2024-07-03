import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';


import LoginScreen from './components/LoginScreen'
import SignUpScreen from './components/SignUpScreen'
import MyPageScreen from './components/MyPageScreen'
import MainTabs from './components/MainTabs'


const Drawer = createDrawerNavigator();

function MainDrawer({ route }) {
  const { id, password, age, height, weight, gender, isAthlete } = route.params;

  return (
    <Drawer.Navigator initialRouteName="MainTabs">
      <Drawer.Screen
        name="MainTabs"
        component={MainTabs}
        options={{ drawerLabel: 'Main Tabs'}}
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

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="MainDrawer" component={MainDrawer} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
