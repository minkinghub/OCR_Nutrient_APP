import { View, Text, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function DayScreen() {
  return (
    <View style={styles.container}>
      <Text>1일 통계</Text>
    </View>
  );
}

function WeekScreen() {
  return (
    <View style={styles.container}>
      <Text>1주 통계</Text>
    </View>
  );
}

const TopTab = createMaterialTopTabNavigator();

export default function StatsScreen() {
  return (
    <TopTab.Navigator>
      <TopTab.Screen name="Day" component={DayScreen} options={{ title: '1일' }} />
      <TopTab.Screen name="Week" component={WeekScreen} options={{ title: '1주' }} />
    </TopTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
