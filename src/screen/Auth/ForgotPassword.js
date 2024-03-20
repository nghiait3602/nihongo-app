import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import ContainerComponent from '../../component/UI/Auth/ContainerComponent';
import SectionnsComponent from '../../component/UI/Auth/SectionnsComponent';
import InputComponent from '../../component/UI/Auth/InputComponent';
import BottomComponent from '../../component/UI/Auth/BottomComponent';
import authenticationAPI from '../../Api/authApi';
import Loading from '../../Modals/Loading';
import { Validate } from '../../util/validate';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    if (email) {
      setErrorMessage('');
    }
  }, [email]);
  async function hanlderForgotPasswor() {
    const validateEmail = Validate.email(email);
    setIsLoading(true);
    if (validateEmail) {
      try {
        const res = await authenticationAPI.HandlerAuthentication(
          '/forgotPassword',
          {
            email: email,
          },
          'post'
        );
        if (res.error) {
          setIsLoading(false);
          setErrorMessage(res.message);
        } else {
          setIsLoading(false);
          navigation.navigate('Login', email);
        }
      } catch (error) {
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  }
  return (
    <>
      <ContainerComponent>
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
          <Text style={styles.text}>Reset Password!</Text>
          <Text style={styles.textDesc}>Hãy điền email của bạn vào!</Text>
        </SectionnsComponent>
        <SectionnsComponent>
          <InputComponent
            value={email}
            placeholder="abc@gmail.com"
            onChange={(val) => setEmail(val)}
            allowClear
            affix={<AntDesign name="mail" size={24} color="black" />}
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
            text="Send"
            onPress={() => {
              hanlderForgotPasswor();
            }}
          ></BottomComponent>
        </SectionnsComponent>
      </ContainerComponent>
      <Loading isVisible={isLoading}></Loading>
    </>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontFamily: 'Nunito_Bold',
    fontSize: 32,
  },
  textDesc: {
    color: 'gray',
    fontFamily: 'Nunito_Bold',
    fontSize: 15,
  },
});
