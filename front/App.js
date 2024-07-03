import { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Picker } from '@react-native-picker/picker';
import { GraphPage, CameraPage } from "./pages";
import "react-native-svg";
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
      <Button title="Login" onPress={() => navigation.navigate('Main')} />
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
  const [isAthlete, setIsAthlete] = useState(false);

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
      <TextInput style={styles.input} value={age} onChangeText={setAge} placeholder="Age" />
      <Text>키</Text>
      <TextInput style={styles.input} value={height} onChangeText={setHeight} placeholder="Height" />
      <Text>체중</Text>
      <TextInput style={styles.input} value={weight} onChangeText={setWeight} placeholder="Weight" />
      <Text>Gender</Text>
      <Picker
        selectedValue={gender}
        style={styles.input}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="남" value="male" />
        <Picker.Item label="여" value="female" />
        <Picker.Item label="Other" value="other" />
      </Picker>
      <Text>운동 여부</Text>
      <Picker
        selectedValue={isAthlete}
        style={styles.input}
        onValueChange={(itemValue) => setIsAthlete(itemValue)}
      >
        <Picker.Item label="Yes" value={true} />
        <Picker.Item label="No" value={false} />
      </Picker>
      <Button title="Sign Up" onPress={() => navigation.navigate('Login')} />
    </View>
  );
}

function ImageScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CameraPage />
    </View>
  );
}

function HistoryScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>History Screen</Text>
    </View>
  );
}

function MyPageScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>My Page Screen</Text>
      <GraphPage />
      {/* <StatusBar style="auto" /> */}
    </View>
  );
}

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="History"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Image" component={ImageScreen} />
    </Tab.Navigator>
  );
}

const Drawer = createDrawerNavigator();

function MainNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Main">
      <Drawer.Screen name="Main" component={TabNavigator} options={{ drawerLabel: 'Main' }} />
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
        <Stack.Screen name="Main" component={MainNavigator} options={{ headerShown: false }} />
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
