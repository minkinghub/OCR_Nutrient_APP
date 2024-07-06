import React, { useState, useEffect, useRef } from 'react';
import { Button, Image, View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import io from 'socket.io-client';

const socket = io('http://127.0.0.1:8000', {
  transports: ['websocket'],
  path: '/socket.io',
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const SocketTestPage = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('processed_image', (data) => {
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
    if (hasPermission) {
      interval = setInterval(async () => {
        if (cameraRef.current) {
          const photo = await cameraRef.current.takePictureAsync({
            quality: 0.1,
            base64: true,
            skipProcessing: true,
          });
          socket.emit('image', { base64Image: photo.base64 });
        }
      }, 1000 / 30); // 30 FPS
    }
    return () => clearInterval(interval);
  }, [hasPermission]);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} />
      {processedImage && <Image source={{ uri: processedImage }} style={styles.processedImage} />}
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
});

export default SocketTestPage;