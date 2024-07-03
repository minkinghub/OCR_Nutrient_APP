import React, { useState } from 'react';
import { Button, Image, View, StyleSheet, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { Alert } from 'react-native';

const CameraPage = () => {
    const [image, setImage] = useState(null);
  
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.canceled) {
        setImage(result.uri);
      }
    };
  
    const uploadImage = async () => {
      if (!image) {
        Alert.alert("No image selected", "Please select an image first.");
        return;
      }
  
      const formData = new FormData();
      formData.append('file', {
        uri: image,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });
  
      try {
        const response = await axios.post('http://localhost:8000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Upload successful:', response.data);
        Alert.alert("Upload successful", response.data.text);
      } catch (error) {
        console.error('Upload failed:', error);
        Alert.alert("Upload failed", error.message);
      }
    };
  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        <Button title="Upload Image" onPress={uploadImage} />
      </View>
    );
  }
module.exports = {
    CameraPage
}