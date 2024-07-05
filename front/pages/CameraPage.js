import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const CameraPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true, // base64 인코딩
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setBase64Image(result.assets[0].base64); // base64 데이터 설정.
    }
  };

  const uploadImage = async () => {
    if (!base64Image) return;

    const user_id = localStorage.getItem('user_id'); // 로컬 스토리지에서 user_id 가져오기

    try {
      const response = await axios.post('http://127.0.0.1:8000/upload', { base64: base64Image, user_id: user_id });
      console.log(response.data);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
}

module.exports = {
    CameraPage
}