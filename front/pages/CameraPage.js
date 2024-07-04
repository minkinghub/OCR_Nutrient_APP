import React, { useState } from 'react';
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
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

    try {
      const response = await axios.post('http://127.0.0.1:8000/upload', { base64: base64Image });
      console.log(response.data);
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick an image from camera roll</Text>
      </TouchableOpacity>
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.image} />}
      <TouchableOpacity style={styles.button} onPress={uploadImage}>
        <Text style={styles.buttonText}>Upload Image</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
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
  image: {
    width: 200,
    height: 200,
    marginVertical: 16,
  },
});

module.exports = {
  CameraPage,
};