import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState } from 'react';
import InputComponent from '../../component/UI/Auth/InputComponent';
import { Colors } from '../../constants/colors';
import { AntDesign } from '@expo/vector-icons';
import ContainerComponent from '../../component/UI/Auth/ContainerComponent';
import SectionnsComponent from '../../component/UI/Auth/SectionnsComponent';
import BottomComponent from '../../component/UI/Auth/BottomComponent';
import authenticationAPI from '../../Api/authApi';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../Modals/Loading';
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const data = {
    email: email,
    password: password,
  };
  async function handlerLogin() {
    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandlerAuthentication(
        '/login',
        data,
        'post'
      );
      const dataFetch = {
        id: res.data.user._id,
        token: res.token,
        email: res.data.user.email,
      };
      dispatch(addAuth(dataFetch));
      await AsyncStorage.setItem('auth', JSON.stringify(dataFetch));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  }
  return (
    <>
      <ContainerComponent isImageBackground isScroll>
        <SectionnsComponent
          styl={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 75,
          }}
        >
          <Image
            source={require('../../../assets/Icons/animals.png')}
            style={{ width: 100, height: 100, marginBottom: 30 }}
          ></Image>
        </SectionnsComponent>
        <SectionnsComponent>
          <Text style={styles.text}>LOGIN</Text>
          <InputComponent
            value={email}
            placeholder="Email"
            onChange={(val) => setEmail(val)}
            allowClear
            //  isPassword
            affix={<AntDesign name="mail" size={24} color="black" />}
          />
          <InputComponent
            value={password}
            placeholder="Password"
            onChange={(val) => setPassword(val)}
            allowClear
            isPassword
            affix={<AntDesign name="lock" size={24} color="black" />}
          />
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View></View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotPassword}>Fotgot password ?</Text>
            </TouchableOpacity>
          </View>
        </SectionnsComponent>
        <SectionnsComponent>
          <BottomComponent
            isDisable
            text="SIGN IN"
            onPress={handlerLogin}
          ></BottomComponent>
        </SectionnsComponent>
        <SectionnsComponent>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.forgotPassword}>Bạn chưa có tài khoản ?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SigUp');
              }}
            >
              <Text style={[styles.forgotPassword, { color: Colors.primary }]}>
                Sign up
              </Text>
            </TouchableOpacity>
          </View>
        </SectionnsComponent>
      </ContainerComponent>
      <Loading isVisible={isLoading}></Loading>
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Nunito_Bold',
    fontSize: 24,
    marginBottom: 15,
  },
  forgotPassword: {
    color: 'gray',
    fontSize: 13,
  },
});
