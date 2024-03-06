import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Hiragana from './Hira';
import Katakana from './Kata';

const TopTab = createMaterialTopTabNavigator();
function TopTabBarNavigation() {
  const insets = useSafeAreaInsets();
  return (
    <TopTab.Navigator
      initialRouteName="Hiragana"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          fontFamily: 'Nunito_Bold',
          marginTop: insets.top,
        },
      }}
    >
      <TopTab.Screen
        name="Hiragana"
        component={Hiragana}
        options={{ tabBarLabel: 'HIRAGANA' }}
      ></TopTab.Screen>
      <TopTab.Screen
        name="Katakana"
        component={Katakana}
        options={{ tabBarLabel: 'KATAKANA' }}
      ></TopTab.Screen>
    </TopTab.Navigator>
  );
}

const Alphabet = () => {
  return <TopTabBarNavigation />;
};

export default Alphabet;

const styles = StyleSheet.create({});
