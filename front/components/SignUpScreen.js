import { useState } from 'react';
import { View, Text, TextInput, Button, TouchableWithoutFeedback, Keyboard, StyleSheet, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import PasswordInput from './PasswordInput';

export default function SignUpScreen({ navigation }) {
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
    <TouchableWithoutFeedback onPress={Platform.OS !== 'web' ? Keyboard.dismiss : undefined}>
      <View style={styles.container}>
        <Text>ID</Text>
        <TextInput style={styles.input} value={id} onChangeText={setId} placeholder="ID" />
        <Text>비밀번호</Text>
        <PasswordInput
          value={password}
          onChangeText={setPassword}
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
        <Text>성별</Text>
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
    </TouchableWithoutFeedback>
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
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 12,
  },
});
