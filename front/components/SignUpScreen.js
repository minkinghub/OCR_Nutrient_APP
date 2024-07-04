import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, StyleSheet, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import PasswordInput from './PasswordInput';

// SignUpScreen 컴포넌트: 회원가입 페이지를 구성
export default function SignUpScreen({ navigation }) {
  const [id, setId] = useState(''); // ID 상태 관리
  const [password, setPassword] = useState(''); // 비밀번호 상태 관리
  const [age, setAge] = useState(''); // 나이 상태 관리
  const [height, setHeight] = useState(''); // 키 상태 관리
  const [weight, setWeight] = useState(''); // 체중 상태 관리
  const [gender, setGender] = useState(''); // 성별 상태 관리
  const [isAthlete, setIsAthlete] = useState(null); // 운동 여부 상태 관리

  // 나이 입력 시 숫자만 입력되도록 처리하는 함수
  const handleAgeChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setAge(numericValue);
  };

  // 키 입력 시 숫자만 입력되도록 처리하는 함수
  const handleHeightChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setHeight(numericValue);
  };

  // 체중 입력 시 숫자와 소수점만 입력되도록 처리하는 함수
  const handleWeightChange = (text) => {
    const numericValue = text.replace(/[^0-9.]/g, '');
    if (numericValue.split('.').length > 2) return; // 소수점이 두 개 이상 입력되는 것을 방지
    setWeight(numericValue);
  };

  return (
    // 화면을 클릭 시 키보드를 닫도록 설정
    <TouchableWithoutFeedback onPress={Platform.OS !== 'web' ? Keyboard.dismiss : undefined}>
      <View style={styles.container}>
        <Text style={styles.label}>ID</Text>
        <TextInput style={styles.input} value={id} onChangeText={setId} placeholder="ID" />

        <Text style={styles.label}>비밀번호</Text>
        <PasswordInput
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
        />

        <Text style={styles.label}>나이</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={handleAgeChange}
          placeholder="(예: 25)"
          keyboardType="numeric"
        />

        <Text style={styles.label}>키</Text>
        <TextInput
          style={styles.input}
          value={height}
          onChangeText={handleHeightChange}
          placeholder="(예: 170)"
          keyboardType="numeric"
        />

        <Text style={styles.label}>체중</Text>
        <TextInput
          style={styles.input}
          value={weight}
          onChangeText={handleWeightChange}
          placeholder="(예: 65.5 소수점 첫자리까지)"
          keyboardType="numeric"
        />

        <Text style={styles.label}>성별</Text>
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

        <Text style={styles.label}>운동 여부</Text>
        <RNPickerSelect
          onValueChange={(value) => setIsAthlete(value)}
          items={[
            { label: 'Yes', value: true },
            { label: 'No', value: false },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: "Are you an athlete?", value: null }}
        />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        
      </View>
    </TouchableWithoutFeedback>
  );
}

// 스타일 시트
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 12,
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
  },
});
