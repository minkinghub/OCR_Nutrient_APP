import { useState } from 'react';
import { Text, View, TextInput, Button, StyleSheet } from 'react-native';
import PasswordInput from './PasswordInput';

function LoginScreen({ navigation }) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text>ID</Text>
      <TextInput style={styles.input} value={id} onChangeText={setId} placeholder="ID" />
      <Text>Password</Text>
      <PasswordInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
      />
      <Button title="Login" onPress={() => navigation.navigate('MainDrawer', {
        id,
        password,
      })} />
      <Button title="Sign Up" onPress={() => navigation.navigate('SignUp')} />
    </View>
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

export default LoginScreen;
