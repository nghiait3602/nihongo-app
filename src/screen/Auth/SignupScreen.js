import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import InputComponent from '../../component/UI/Auth/InputComponent';
import { Colors } from '../../constants/colors';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import ContainerComponent from '../../component/UI/Auth/ContainerComponent';
import SectionnsComponent from '../../component/UI/Auth/SectionnsComponent';
import BottomComponent from '../../component/UI/Auth/BottomComponent';
import { useNavigation } from '@react-navigation/native';
import authenticationAPI from '../../Api/authApi';
import Loading from '../../Modals/Loading';
import { Validate } from '../../util/validate';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../redux/reducers/authReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
const initValue = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const SignUpScreen = () => {
  const [values, setValues] = useState(initValue);
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setTextError] = useState('');

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (values.email || values.password) {
      setTextError('');
    }
  }, [values.email, values.password]);
  function handlerValue(key, value) {
    const data = { ...values };
    data[key] = value;
    setValues(data);
  }

  async function handlerResgiter() {
    const { email, password, confirmPassword } = values;
    const emailValidate = Validate.email(email);
    const passwordValidate = Validate.Password(password);

    if (email && password && confirmPassword) {
      if (emailValidate && passwordValidate) {
        setIsDisable(true);
        try {
          const res = await authenticationAPI.HandlerAuthentication(
            '/signup',
            {
              name: values.userName,
              email: values.email,
              ngaySinh: '1/1/1999',
              password: values.password,
              passwordConfirm: values.password,
            },
            'post'
          );
          const dataFetch = {
            id: res.data.user._id,
            token: res.token,
            email: res.data.user.email,
          };
          dispatch(addAuth(dataFetch));
          await AsyncStorage.setItem('auth', JSON.stringify(dataFetch));
          setValues(initValue);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      } else {
        setTextError('Email không đúng định dạng!');
      }
    } else {
      setTextError('Vui lòng nhập đầy đủ thông tin!');
    }
  }

  return (
    <>
      <ContainerComponent isImageBackground isScroll>
        <SectionnsComponent>
          <View
            style={{
              marginTop: 20,
              marginBottom: 20,
              borderBottomWidth: 1,
              borderColor: Colors.Swan,
            }}
          >
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons
                name="keyboard-backspace"
                size={32}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </SectionnsComponent>
        <SectionnsComponent>
          <Text style={styles.text}>SIGN UP</Text>
          <InputComponent
            value={values.userName}
            placeholder="User name"
            onChange={(val) => handlerValue('userName', val)}
            allowClear
            //  isPassword

            affix={<AntDesign name="user" size={24} color="black" />}
          />
          <InputComponent
            value={values.email}
            placeholder="Email"
            onChange={(val) => handlerValue('email', val)}
            allowClear
            affix={<AntDesign name="mail" size={24} color="black" />}
          />
          <InputComponent
            value={values.password}
            placeholder="Password"
            onChange={(val) => handlerValue('password', val)}
            allowClear
            isPassword
            affix={<AntDesign name="lock" size={24} color="black" />}
          />
          <InputComponent
            value={values.confirmPassword}
            placeholder="Confirm Password"
            onChange={(val) => handlerValue('confirmPassword', val)}
            allowClear
            isPassword
            affix={<AntDesign name="lock" size={24} color="black" />}
          />
        </SectionnsComponent>
        {errorMessage && (
          <SectionnsComponent>
            <Text style={{ color: 'red' }}>{errorMessage}</Text>
          </SectionnsComponent>
        )}
        <SectionnsComponent>
          <BottomComponent
            isDisable
            text="SIGN IN"
            onPress={handlerResgiter}
          ></BottomComponent>
        </SectionnsComponent>
        <SectionnsComponent>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={styles.forgotPassword}>Bạn chưa có tài khoản ?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text style={[styles.forgotPassword, { color: Colors.primary }]}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </SectionnsComponent>
      </ContainerComponent>
      <Loading isVisible={isLoading}></Loading>
    </>
  );
};

export default SignUpScreen;

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
