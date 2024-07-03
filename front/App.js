import { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RNPickerSelect from 'react-native-picker-select';
import 'react-native-gesture-handler';

function LoginScreen({ navigation }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text>ID</Text>
      <TextInput style={styles.input} value={id} onChangeText={setId} placeholder="ID" />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder="Password"
      />
      <Button title="Login" onPress={() => navigation.navigate('MainDrawer')} />
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}

function SignUpScreen({ navigation }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [isAthlete, setIsAthlete] = useState(null);

  const handleAgeChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setAge(numericValue);
  };

  const handleHeightChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setHeight(numericValue);
  };

  const handleWeightChange = (text) => {
    const numericValue = text.replace(/[^0-9.]/g, '');
    if (numericValue.split('.').length > 2) return;
    setWeight(numericValue);
  };

  return (
    <View style={styles.container}>
      <Text>ID</Text>
      <TextInput style={styles.input} value={id} onChangeText={setId} placeholder="ID" />
      <Text>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        placeholder="Password"
      />
      <Text>나이</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={handleAgeChange}
        placeholder="(예: 25)"
        keyboardType="numeric"
      />
      <Text>키</Text>
      <TextInput
        style={styles.input}
        value={height}
        onChangeText={handleHeightChange}
        placeholder="(예: 170)"
        keyboardType="numeric"
      />
      <Text>체중</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={handleWeightChange}
        placeholder="(예: 65.5 소수점 첫자리까지)"
        keyboardType="numeric"
      />
      <Text>Gender</Text>
      <RNPickerSelect
        onValueChange={(value) => setGender(value)}
        items={[
          { label: '남', value: 'male' },
          { label: '여', value: 'female' },
          { label: 'Other', value: 'other' },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: "Select your gender", value: null }}
      />
      <Text>운동 여부</Text>
      <RNPickerSelect
        onValueChange={(value) => setIsAthlete(value)}
        items={[
          { label: 'Yes', value: true },
          { label: 'No', value: false },
        ]}
        style={pickerSelectStyles}
        placeholder={{ label: "Are you an athlete?", value: null }}
      />
      <Button title="Sign Up" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

function ImageScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Image Screen</Text>
    </View>
  );
}

function DayScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>1일 통계</Text>
    </View>
  );
}

function WeekScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>1주 통계</Text>
    </View>
  );
}

const TopTab = createMaterialTopTabNavigator();

function StatsScreen() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Day" component={DayScreen} options={{ title: '1일' }} />
      <TopTab.Screen name="Week" component={WeekScreen} options={{ title: '1주' }} />
    </TopTab.Navigator>
  );
}

function MyPageScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>My Page Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Stats"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Image" component={ImageScreen} />
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function MainDrawer() {
  return (
    <Drawer.Navigator initialRouteName="MainTabs">
      <Drawer.Screen name="MainTabs" component={MainTabs} options={{ drawerLabel: 'Main Tabs' }} />
      <Drawer.Screen name="Mypage" component={MyPageScreen} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 12,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 12,
  },
});
