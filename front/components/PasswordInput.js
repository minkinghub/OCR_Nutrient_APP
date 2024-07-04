import { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// PasswordInput 컴포넌트: 비밀번호 입력 필드와 비밀번호 표시/숨김 토글 아이콘을 포함
export default function PasswordInput({ value, onChangeText, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);  // 비밀번호 표시 여부를 관리하는 상태

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword} // showPassword가 false이면 비밀번호 숨김, true이면 표시
        placeholder={placeholder}
      />

      {/* 아이콘을 눌러 비밀번호 표시/숨김 토글 */}
      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>


        <Ionicons
          name={showPassword ? 'eye' : 'eye-off'} // 비밀번호 표시 여부에 따라 아이콘 변경
          size={24}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  );
}

// 스타일을 정의하는 StyleSheet 객체
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 12,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
  },
});