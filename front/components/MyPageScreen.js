import { useState } from 'react';
import { View, Text, TextInput, Button, Image, TouchableWithoutFeedback, Keyboard, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import PasswordInput from './PasswordInput'; // 공통 컴포넌트 임포트

export default function MyPageScreen({ id, password, age, height, weight, gender, isAthlete }) {
  const [localId] = useState(id);
  const [localPassword, setLocalPassword] = useState(password);
  const [localAge, setLocalAge] = useState(age);
  const [localHeight, setLocalHeight] = useState(height);
  const [localWeight, setLocalWeight] = useState(weight);
  const [localGender] = useState(gender);
  const [localIsAthlete, setLocalIsAthlete] = useState(isAthlete);

  const handleAgeChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setLocalAge(numericValue);
  };

  const handleHeightChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    setLocalHeight(numericValue);
  };

  const handleWeightChange = (text) => {
    const numericValue = text.replace(/[^0-9.]/g, '');
    if (numericValue.split('.').length > 2) return;
    setLocalWeight(numericValue);
  };

  const handlePasswordChange = (text) => {
    setLocalPassword(text);
  };

  return (
    <TouchableWithoutFeedback onPress = {Keyboard.dismiss}>
      <View style={styles.container}>
        <Image style={styles.profileImage} source={require('../assets/default-profile.jpg')} />
        <Text>프로필 정보</Text>
        <Text>ID (수정 불가)</Text>
        <TextInput style={[styles.input, styles.nonEditable]} value={localId} editable={false} />
        <Text>비밀번호</Text>
        <PasswordInput
          value={localPassword}
          onChangeText={handlePasswordChange}
          placeholder="Password"
        />
        <Text>나이</Text>
        <TextInput style={styles.input} value={localAge} onChangeText={handleAgeChange} keyboardType="numeric" />
        <Text>키</Text>
        <TextInput style={styles.input} value={localHeight} onChangeText={handleHeightChange} keyboardType="numeric" />
        <Text>체중</Text>
        <TextInput style={styles.input} value={localWeight} onChangeText={handleWeightChange} keyboardType="numeric" />
        <Text>성별 (수정 불가)</Text>
        <TextInput style={[styles.input, styles.nonEditable]} value={localGender} editable={false} />
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
        <Button title="저장" onPress={() => console.log('저장되었습니다.')} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
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
