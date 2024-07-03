import { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet, Platform, TouchableOpacity, Modal } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Picker } from '@react-native-picker/picker';
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
  const [showGenderPicker, setShowGenderPicker] = useState(false);
  const [showAthletePicker, setShowAthletePicker] = useState(false);

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
      <TouchableOpacity onPress={() => setShowGenderPicker(true)} style={styles.pickerButton}>
        <Text style={styles.pickerButtonText}>{gender ? gender : "Select your gender"}</Text>
      </TouchableOpacity>
      <Modal visible={showGenderPicker} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.pickerModal}>
            <Picker
              selectedValue={gender}
              onValueChange={(itemValue) => {
                setGender(itemValue);
                setShowGenderPicker(false);
              }}
            >
              <Picker.Item label="남" value="male" />
              <Picker.Item label="여" value="female" />
              <Picker.Item label="Other" value="other" />
            </Picker>
            <Button title="Done" onPress={() => setShowGenderPicker(false)} />
          </View>
        </View>
      </Modal>
      <Text>운동 여부</Text>
      <TouchableOpacity onPress={() => setShowAthletePicker(true)} style={styles.pickerButton}>
        <Text style={styles.pickerButtonText}>{isAthlete ? (isAthlete === true ? "Yes" : "No") : "Are you an athlete?"}</Text>
      </TouchableOpacity>
      <Modal visible={showAthletePicker} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.pickerModal}>
            <Picker
              selectedValue={isAthlete}
              onValueChange={(itemValue) => {
                setIsAthlete(itemValue);
                setShowAthletePicker(false);
              }}
            >
              <Picker.Item label="Yes" value={true} />
              <Picker.Item label="No" value={false} />
            </Picker>
            <Button title="Done" onPress={() => setShowAthletePicker(false)} />
          </View>
        </View>
      </Modal>
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
  pickerButton: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  pickerButtonText: {
    color: 'gray',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerModal: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
});
