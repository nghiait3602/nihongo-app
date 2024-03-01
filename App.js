import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import Home from './src/screen/Home/Home';
import Alphabet from './src/screen/Alphabet/Alphabet';
import Profile from './src/screen/Profile/Profile';
import Search from './src/screen/Search/Search';
import LessionScreen from './src/screen/Lession/Lession';
import Dialog from './src/screen/Dialog/Dialog';

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();
export default function App() {
  const [loaded] = useFonts({
    Nunito_Black: require('./assets/Fonts/Nunito-Black.ttf'),
    Nunito_Bold: require('./assets/Fonts/Nunito-Bold.ttf'),
    Nunito_ExtraBold: require('./assets/Fonts/Nunito-ExtraBold.ttf'),
    Nunito_Regular: require('./assets/Fonts/Nunito-Regular.ttf'),
  });
  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer independent={true}>
      <HomeScreen />
    </NavigationContainer>
  );
}
function HomeScreen() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="BottomNavigation"
        component={BottomNavigation}
      ></Stack.Screen>
      <Stack.Screen
        name="LessionScreen"
        component={LessionScreen}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}
function BottomNavigation() {
  return (
    <Tabs.Navigator
      screenOptions={{ tabBarShowLabel: false, headerShown: false }}
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <Image
                  style={{ width: 30, height: 25 }}
                  source={require('./assets/Icons/home-active.png')}
                />
              );
            } else {
              return (
                <Image
                  style={{ width: 30, height: 25 }}
                  source={require('./assets/Icons/home-unactive.png')}
                />
              );
            }
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="Alphabet"
        component={Alphabet}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <Image
                  style={{ width: 30, height: 25 }}
                  source={require('./assets/Icons/forcus.png')}
                />
              );
            } else {
              return (
                <Image
                  style={{ width: 30, height: 25 }}
                  source={require('./assets/Icons/unforcus.png')}
                />
              );
            }
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <Image
                  style={{ width: 30, height: 25 }}
                  source={require('./assets/Icons/search-active.png')}
                />
              );
            } else {
              return (
                <Image
                  style={{ width: 30, height: 25 }}
                  source={require('./assets/Icons/search-unactive.png')}
                />
              );
            }
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="Dialog"
        component={Dialog}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <Image
                  style={{ width: 30, height: 25 }}
                  source={require('./assets/Icons/book-active.png')}
                />
              );
            } else {
              return (
                <Image
                  style={{ width: 30, height: 25 }}
                  source={require('./assets/Icons/book-unactive.png')}
                />
              );
            }
          },
        }}
      ></Tabs.Screen>
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return (
                <Image
                  style={{ width: 30, height: 25 }}
                  source={require('./assets/Icons/profile-active.png')}
                />
              );
            } else {
              return (
                <Image
                  style={{ width: 30, height: 25 }}
                  source={require('./assets/Icons/profile-unactive.png')}
                />
              );
            }
          },
        }}
      ></Tabs.Screen>
    </Tabs.Navigator>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
