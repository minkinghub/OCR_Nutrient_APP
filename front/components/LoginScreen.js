import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import PasswordInput from './PasswordInput';

const LoginScreen = ({ navigation, route }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const userData = route.params?.userData || {};

  const handleLogin = () => {
    if (id === userData.id && password === userData.password) {
      navigation.navigate('MainDrawer', userData);
    } else {
      Alert.alert('로그인 실패', 'ID 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  // ID와 비밀번호 입력 시 영어와 숫자만 입력되도록 처리하는 함수
  const handleIdChange = (text) => {
    const alphanumeric = text.replace(/[^a-zA-Z0-9]/g, '');
    setId(alphanumeric);
  };

  const handlePasswordChange = (text) => {
    const alphanumeric = text.replace(/[^a-zA-Z0-9]/g, '');
    setPassword(alphanumeric);
  };

  return (
    <View style={styles.container}>
      <Text>ID</Text>
      <TextInput
        style={styles.input}
        value={id}
        onChangeText={handleIdChange}
        placeholder="ID"
      />
      <Text>Password</Text>
      <PasswordInput
        value={password}
        onChangeText={handlePasswordChange}
        placeholder="Password"
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

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
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
