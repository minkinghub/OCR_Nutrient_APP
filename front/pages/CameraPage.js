// import React, { useState } from 'react';
// import { Button, Image, View } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';

// const CameraPage = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [base64Image, setBase64Image] = useState(null);

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//       base64: true, // base64 인코딩
//     });

//     if (!result.canceled) {
//       setSelectedImage(result.assets[0].uri);
//       setBase64Image(result.assets[0].base64); // base64 데이터 설정.
//     }
//   };

//   const uploadImage = async () => {
//     if (!base64Image) return;

//     const user_id = localStorage.getItem('user_id'); // 로컬 스토리지에서 user_id 가져오기

//     try {
//       const response = await axios.post('http://127.0.0.1:8000/upload', { base64: base64Image, user_id: user_id });
//       console.log(response.data);
//     } catch (error) {
//       console.error(error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button title="Pick an image from camera roll" onPress={pickImage} />
//       {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
//       <Button title="Upload Image" onPress={uploadImage} />
//     </View>
//   );
// }

import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';

const CameraPage = () => {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhoto(photo);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.cameraSmall} facing={facing} ref={cameraRef}>
      </CameraView>
      {photo && <Image source={{ uri: photo.uri }} style={styles.preview} />}
      <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraSmall: {
    width: 200, // 너비를 조절하여 크기를 줄입니다.
    height: 200, // 높이를 조절하여 크기를 줄입니다.
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    backgroundColor: "green"
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  preview: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
});

module.exports = {
    CameraPage
}