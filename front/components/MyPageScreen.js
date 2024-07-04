import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, TouchableWithoutFeedback, Keyboard, StyleSheet, Platform, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import PasswordInput from './PasswordInput';

// MyPageScreen 컴포넌트: 사용자의 프로필 정보를 표시하고 수정할 수 있는 화면
export default function MyPageScreen({ id, password, age, height, weight, gender, isAthlete, bmr }) {
  // 상태 관리
  const [localId] = useState(id);
  const [localPassword, setLocalPassword] = useState(password);
  const [localAge, setLocalAge] = useState(age);
  const [localHeight, setLocalHeight] = useState(height);
  const [localWeight, setLocalWeight] = useState(weight);
  const [localGender] = useState(gender);
  const [localIsAthlete, setLocalIsAthlete] = useState(isAthlete);

  // 나이 입력 변경 핸들러
  const handleAgeChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setLocalAge(numericValue);
  };

  // 키 입력 변경 핸들러
  const handleHeightChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setLocalHeight(numericValue);
  };

  // 체중 입력 변경 핸들러
  const handleWeightChange = (text) => {
    const numericValue = text.replace(/[^0-9.]/g, '');
    if (numericValue.split('.').length > 2) return;
    setLocalWeight(numericValue);
  };

  // 비밀번호 입력 변경 핸들러
  const handlePasswordChange = (text) => {
    setLocalPassword(text);
  };

  // 저장 버튼 클릭 핸들러
  const handleSave = () => {
    if (Platform.OS === 'web') {
      window.alert('변경사항이 저장되었습니다.');
    } else {
      Alert.alert('저장 완료', '변경사항이 저장되었습니다.');
    }
    console.log('저장되었습니다.');
  };

  return (
    // 화면을 클릭하면 키보드를 닫음
    <TouchableWithoutFeedback onPress={Platform.OS !== 'web' ? Keyboard.dismiss : undefined}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* 기본 프로필 이미지 */}
          <Image style={styles.profileImage} source={require('../assets/default-profile.png')} />
          <Text style={styles.headerText}>프로필 정보</Text>

          {/* ID 입력 필드 (수정 불가) */}
          <Text>ID (수정 불가)</Text>
          <TextInput style={[styles.input, styles.nonEditable]} value={localId} editable={false} />

          {/* 비밀번호 입력 필드 */}
          <Text>비밀번호</Text>
          <PasswordInput
            value={localPassword}
            onChangeText={handlePasswordChange}
            placeholder="Password"
          />

          {/* 나이 입력 필드 */}
          <Text>나이</Text>
          <TextInput style={styles.input} value={localAge} onChangeText={handleAgeChange} keyboardType="numeric" />

          {/* 키 입력 필드 */}
          <Text>키</Text>
          <TextInput style={styles.input} value={localHeight} onChangeText={handleHeightChange} keyboardType="numeric" />

          {/* 체중 입력 필드 */}
          <Text>체중</Text>
          <TextInput style={styles.input} value={localWeight} onChangeText={handleWeightChange} keyboardType="numeric" />

          {/* 성별 입력 필드 (수정 불가) */}
          <Text>성별 (수정 불가)</Text>
          <TextInput style={[styles.input, styles.nonEditable]} value={localGender} editable={false} />

          {/* 운동 여부 선택 필드 */}
          <Text>운동 여부</Text>
          <RNPickerSelect
            onValueChange={(value) => setLocalIsAthlete(value)}
            items={[
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ]}
            style={pickerSelectStyles}
            value={localIsAthlete}
            placeholder={{}}
          />

          {/* 기초대사량 입력 필드 (수정 불가) */}
          <Text>기초대사량 (BMR)</Text>
          <TextInput style={[styles.input, styles.nonEditable]} value={bmr ? bmr.toString() : ''} editable={false} />

          {/* 저장 버튼 */}
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>저장</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

// 스타일을 정의하는 StyleSheet 객체
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
    width: '100%',
  },
  nonEditable: {
    backgroundColor: '#e0e0e0',
    color: '#a0a0a0',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    alignSelf: 'center',  // 프로필 이미지를 가운데 정렬
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
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
    width: '100%',
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
    width: '100%',
  },
});
