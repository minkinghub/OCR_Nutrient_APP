import { View, Text, StyleSheet } from 'react-native';
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
    flex: 1,    // flex 속성을 1로 설정하여 View가 가능한 모든 공간을 차지하도록 함
    justifyContent: 'center',   // 수직 방향으로 중앙에 정렬
    alignItems: 'center',   // 수평 방향으로 중앙에 정렬
  },
});
