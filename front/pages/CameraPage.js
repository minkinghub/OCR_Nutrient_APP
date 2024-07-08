import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Modal, ActivityIndicator } from 'react-native';
import { useUser } from "../components"
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import { LoadingComponent } from '../components';  // 로딩 컴포넌트를 가져옴
import { useNavigation } from '@react-navigation/native'; // useNavigation 훅 가져오기


const CameraPage = () => {
  const { user } = useUser();
  const navigation = useNavigation();   // navigation 객체 생성
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [photo, setPhoto] = useState(null);
  const [photoBase64, setPhotoBase64] = useState(null);
  const [boxedPhotos, setBoxedPhotos] = useState([]);
  const [cameraActive, setCameraActive] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  useEffect(() => {
    if (uploadStatus) {
      setTimeout(() => setUploadStatus(null), 3000);
    }
  }, [uploadStatus]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <Modal visible={true} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>We need your permission to show the camera</Text>
            <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
              <Text style={styles.permissionButtonText}>Grant Permission</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      setPhoto(photo);
      setPhotoBase64(photo.base64);
      setCameraActive(false);
      await requestBoxedImage(photo.base64);
    }
  }

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0]);
      setPhotoBase64(result.assets[0].base64);
      setCameraActive(false);
      await requestBoxedImage(result.assets[0].base64);
    }
  }

  async function requestBoxedImage(base64) {
    setIsUploading(true);

    try {
      const response = await axios.post('http://192.168.1.28:8000/boxedimage', { base64: base64, user_id: user });
      setBoxedPhotos(response.data.cropped_images);
      setUploadStatus('success');
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  }

  async function uploadImage() {
    if (boxedPhotos.length === 0) return;
    setIsUploading(true);

    try {
      const response = await axios.post('http://192.168.1.28:8000/upload', {
        base64: boxedPhotos[0], // 첫 번째 잘린 이미지를 업로드
        user_id: user,
      });
      console.log(response.data);
      setUploadStatus('success');
      navigation.navigate('Stats'); // 업로드 했을 때 통계 페이지로 이동

    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      setUploadStatus('error');
    } finally {
      setIsUploading(false);
    }
  }

  function retakePicture() {
    setPhoto(null);
    setPhotoBase64(null);
    setBoxedPhotos([]);
    setCameraActive(true);
  }

  return (
    <View style={styles.container}>
      {cameraActive ? (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.iconButton} onPress={toggleCameraFacing}>
              <Ionicons name="camera-reverse" size={30} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <Ionicons name="camera" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={pickImage}>
              <Ionicons name="images" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </CameraView>
      ) : (
        <View style={styles.previewContainer}>
          <View style={styles.boxedPhotoContainer}>
            {isUploading ? (
              <LoadingComponent />  // 로딩 컴포넌트를 사용
            ) : (
              boxedPhotos.map((photo, index) => (
                <Image
                  key={index}
                  style={styles.preview}
                  source={{ uri: `data:image/png;base64,${photo}` }}
                />
              ))
            )}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.iconButton2} onPress={retakePicture}>
                <Ionicons name="camera-reverse" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton2} onPress={uploadImage}>
                <Ionicons name="cloud-upload" size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {uploadStatus && (
        <View style={[styles.statusMessage, uploadStatus === 'success' ? styles.successMessage : styles.errorMessage]}>
          <Text style={styles.statusText}>
            {uploadStatus === 'success' ? 'Upload successful!' : 'Upload failed. Please try again.'}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  camera: {
    width: 400,
    flex: 1,
  },
  boxedPhotoContainer: {
    width: 400,
    backgroundColor: "#CCCCCC",
    flex: 1,
  },  
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  iconButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    borderRadius: 40,
  },
  iconButton2: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 40,
  },
  captureButton: {
    backgroundColor: '#ff4757',
    padding: 20,
    borderRadius: 50,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  preview: {
    width: '100%',
    height: '80%',
    resizeMode: 'contain',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 100,
    position: 'absolute',
    bottom: 30,
  },
  actionButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  statusMessage: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  successMessage: {
    backgroundColor: '#4CAF50',
  },
  errorMessage: {
    backgroundColor: '#f44336',
  },
  statusText: {
    color: 'white',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  permissionButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

module.exports = { CameraPage };