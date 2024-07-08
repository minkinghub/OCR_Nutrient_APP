import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { sendingLogin } from "./";
import { useUser } from '../components';
import PasswordInput from './PasswordInput';

// LoginScreen 컴포넌트: 사용자가 ID와 비밀번호를 입력하고 로그인 또는 회원가입을 할 수 있는 화면
function LoginScreen({ navigation }) {
  const { setUser } = useUser(); // UserContext에서 setUser 가져오기
  const [id, setId] = useState(''); // ID 상태를 관리
  const [password, setPassword] = useState(''); // 비밀번호 상태를 관리

  const sendRequest = async () => {
    const data = {
      id: id,
      password: password
    };

    try {
      const response = await sendingLogin(data);
      console.log('Server response:', response); // 서버 응답을 콘솔에 출력
      if (response && response.user_id) {
        // 로그인 성공 시 사용자 정보 설정
        setUser(response.user_id);
        navigation.navigate('MainDrawer', { id, password });
      } else {
        // 로그인 실패 시 경고 표시
        Alert.alert('Login Failed', response.detail || 'An error occurred');
      }
    } catch (error) {
      console.error('Error during login:', error); // 에러를 콘솔에 출력
      // 요청 실패 시 경고 표시
      Alert.alert('Error', 'An error occurred during login');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.appName}>NutriJeans</Text>
      <Text style={styles.label}>ID</Text>
      {/* ID 입력 필드 */}
      <TextInput style={styles.input} value={id} onChangeText={setId} placeholder="ID" />
      <Text style={styles.label}>Password</Text>

      {/* 비밀번호 입력 필드 (PasswordInput 컴포넌트 사용) */}
      <PasswordInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />

      {/* 로그인 버튼 */}
      <TouchableOpacity style={styles.button} onPress={sendRequest}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* 회원가입 버튼 */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

// 스타일을 정의하는 StyleSheet 객체
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 32,
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

export default LoginScreen;
