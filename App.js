import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from 'expo-font';
import { AntDesign } from '@expo/vector-icons';
import Home from './src/screen/Home/Home';
import Alphabet from './src/screen/Alphabet/Alphabet';
import Profile from './src/screen/Profile/Profile';
import Search from './src/screen/Search/Search';
import LessionScreen from './src/screen/Lession/Lession';
import LessionObjec from './src/screen/Lession/LessionObjec';
import Dialog from './src/screen/Dialog/Dialog';
import TuVung from './src/screen/BaiHoc/TuVung';
import NguPhap from './src/screen/BaiHoc/NguPhap';
import Kanji from './src/screen/BaiHoc/Kanji';
import BaiDoc from './src/screen/BaiHoc/BaiDoc';
import BaiTapTongHop from './src/screen/BaiHoc/BaiTapTongHop';
import ChuDe from './src/screen/ChuDe/ChuDe';
import TuVungChiTiet from './src/screen/ChiTiet/TuVungChiTiet';
import KanjiChiTiet from './src/screen/ChiTiet/KanjiChiTiet';
import BaiDocChiTiet from './src/screen/ChiTiet/BaiDocChiTiet';
import NguPhapChiTiet from './src/screen/ChiTiet/NguPhapChiTiet';
import LoginScreen from './src/screen/Auth/LoginScreen';
import SignUpScreen from './src/screen/Auth/SignupScreen';
import ForgotPassword from './src/screen/Auth/ForgotPassword';
import Verification from './src/screen/Auth/Verification';
import SettingsScreen from './src/screen/Profile/Setting';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './src/redux/store';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { addAuth, authSelector } from './src/redux/reducers/authReducer';
import { addLike } from './src/redux/reducers/likeReducer';
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
    <Provider store={store}>
      <Root></Root>
    </Provider>
  );
}
function Root() {
  const { getItem } = useAsyncStorage('auth');
  const auth = useSelector(authSelector);
  const dispatch = useDispatch();
  console.log(auth);
  useEffect(() => {
    checkLogin();
    checkLike();
  }, []);
  const checkLogin = async () => {
    const data = await getItem();
    data && dispatch(addAuth(JSON.parse(data)));
  };
  const checkLike = async () => {
    const data = await AsyncStorage.getItem('like');
    if (data) {
      const test = JSON.parse(data);
      test.forEach((id) => dispatch(addLike({ id: id })));
    }
  };

  return (
    <NavigationContainer independent={true}>
      {auth.token ? <HomeScreen /> : <AuthStack></AuthStack>}
    </NavigationContainer>
  );
}
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="SigUp"
        component={SignUpScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

function HomeScreen() {
  const [chude, setChuDe] = useState();
  const CheckChuDe = async () => {
    const data = await AsyncStorage.getItem('chude');
    return data;
  };
  useEffect(() => {
    CheckChuDe().then((res) => {
      setChuDe(res);
    });
  });
  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
      {!chude && (
        <Stack.Screen
          name="ChuDe"
          component={ChuDe}
          options={({ navigation }) => ({
            title: 'Chủ đề yêu thích',
            presentation: 'modal',
            headerLeft: () => (
              <AntDesign
                name="close"
                size={24}
                color="black"
                style={{ marginLeft: 5 }}
                onPress={() => navigation.navigate('BottomNavigation')}
              />
            ),
          })}
        ></Stack.Screen>
      )}
      <Stack.Screen
        name="BottomNavigation"
        component={BottomNavigation}
        options={{ headerShown: false, title: 'Home' }}
      ></Stack.Screen>
      <Stack.Screen
        name="LessionScreen"
        component={LessionScreen}
        options={{
          title: 'Bài Học',
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="LessionObject"
        component={LessionObjec}
        options={{
          title: 'Bài Học',
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="TuVung"
        component={TuVung}
        options={{
          title: 'Từ Vựng',
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="NguPhap"
        component={NguPhap}
        options={{
          title: 'Ngữ Pháp',
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="Kanji"
        component={Kanji}
        options={{
          title: 'Kanji',
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="BaiDoc"
        component={BaiDoc}
        options={{
          title: 'Bài Đọc',
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="BaiTapTongHop"
        component={BaiTapTongHop}
        options={{
          title: 'Bài tập tổng hợp',
        }}
      ></Stack.Screen>
      <Stack.Screen
        name="TuVungChiTiet"
        component={TuVungChiTiet}
        options={{ title: 'Cấu trúc từ vựng' }}
      ></Stack.Screen>
      <Stack.Screen
        name="KanjiChiTiet"
        component={KanjiChiTiet}
        options={{ title: 'Tổng quan hán tự' }}
      ></Stack.Screen>
      <Stack.Screen
        name="BaiDocChiTiet"
        component={BaiDocChiTiet}
        options={{ title: 'Tổng quan bài đọc' }}
      ></Stack.Screen>
      <Stack.Screen
        name="NguPhapChiTiet"
        component={NguPhapChiTiet}
        options={{ title: 'Tổng quan ngữ pháp' }}
      ></Stack.Screen>
      <Stack.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ title: 'Thông tin cá nhân' }}
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
