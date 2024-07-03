import { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import PasswordInput from './PasswordInput';

// LoginScreen 컴포넌트: 사용자가 ID와 비밀번호를 입력하고 로그인 또는 회원가입을 할 수 있는 화면
function LoginScreen({ navigation }) {
  const [id, setId] = useState(''); // ID 상태를 관리
  const [password, setPassword] = useState(''); // 비밀번호 상태를 관리

  return (
    <View style={styles.container}>
      <Text>ID</Text>
      {/* ID 입력 필드 */}
      <TextInput style={styles.input} value={id} onChangeText={setId} placeholder="ID" />
      <Text>Password</Text>

      {/* 비밀번호 입력 필드 (PasswordInput 컴포넌트 사용) */}
      <PasswordInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />

      {/* 로그인 버튼 */}
      <Button title="Login" onPress={() => navigation.navigate('MainDrawer', {
        id,
        password,
      })} />

      {/* 회원가입 버튼 */}
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
}

// 스타일을 정의하는 StyleSheet 객체
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

export default LoginScreen;
