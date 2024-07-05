import { View, StyleSheet } from 'react-native';
import { CameraPage } from "../pages/CameraPage";

// ImageScreen 컴포넌트는 "Image Screen" 텍스트를 중앙에 표시
export default function ImageScreen() {
  return (
    <View style={styles.container}>
      <CameraPage />
    </View>
  );
}

// 스타일을 정의하는 StyleSheet 객체
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});