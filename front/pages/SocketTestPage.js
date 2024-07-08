import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { Camera } from 'expo-camera';
import io from 'socket.io-client';

const socket = io('http://192.168.1.18:8000', {
  transports: ['websocket'],
  path: '/socket.io',
});

const SocketTestPage = () => {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [processedImage, setProcessedImage] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    requestPermission();

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('processed_image', (data) => {
      console.log('Received processed image');
      setProcessedImage(`data:image/jpeg;base64,${data.base64Image}`);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('processed_image');
    };
  }, []);

  useEffect(() => {
    let interval;
    if (permission?.granted) {
      interval = setInterval(async () => {
        if (cameraRef.current) {
          try {
            const photo = await cameraRef.current.takePictureAsync({
              quality: 0.5,
              base64: true,
              skipProcessing: true,
            });
            console.log('Photo taken');
            socket.emit('image', { base64Image: photo.base64 });
          } catch (error) {
            console.error('Error taking picture:', error);
          }
        }
      }, 1000 / 30); // 30 FPS
    }
    return () => clearInterval(interval);
  }, [permission]);

  if (!permission) {
    return <Text>Requesting camera permission...</Text>;
  }

  if (!permission.granted) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} />
      {processedImage ? (
        <Image source={{ uri: processedImage }} style={styles.processedImage} />
      ) : (
        <Text style={styles.noImageText}>Waiting for processed image...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  processedImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  noImageText: {
    position: 'absolute',
    top: 20,
    left: 20,
    color: 'white',
  },
});

export default SocketTestPage;