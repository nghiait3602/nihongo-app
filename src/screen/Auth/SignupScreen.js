import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useState } from 'react';
import InputComponent from '../../component/UI/Auth/InputComponent';
import { Colors } from '../../constants/colors';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import ContainerComponent from '../../component/UI/Auth/ContainerComponent';
import SectionnsComponent from '../../component/UI/Auth/SectionnsComponent';
import BottomComponent from '../../component/UI/Auth/BottomComponent';
import { useNavigation } from '@react-navigation/native';
const initValue = {
  userName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const SignUpScreen = () => {
  const [values, setValues] = useState(initValue);
  const [isDisable, setIsDisable] = useState(true);
  const navigation = useNavigation();

  function handlerValue(key, value) {
    const data = { ...values };
    data[key] = value;
    setValues(data);
  }
  function handlerButton() {
    console.log(values);
    setValues(initValue);
  }
  return (
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
            <MaterialIcons name="keyboard-backspace" size={32} color="black" />
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
      <SectionnsComponent>
        <BottomComponent
          isDisable
          text="SIGN IN"
          onPress={handlerButton}
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
