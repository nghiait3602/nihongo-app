import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ContainerComponent from '../../component/UI/Auth/ContainerComponent';
import SectionnsComponent from '../../component/UI/Auth/SectionnsComponent';
import BottomComponent from '../../component/UI/Auth/BottomComponent';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import authenticationAPI from '../../Api/authApi';
import Loading from '../../Modals/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addAuth } from '../../redux/reducers/authReducer';
import { useDispatch } from 'react-redux';

const Verification = () => {
  const navigation = useNavigation();
  const router = useRoute();
  const { dataFetch, veriCode } = router.params;

  const [codeValues, setCodeValues] = useState([]);
  const [newCode, setNewCode] = useState('');
  const [limit, setLimit] = useState(120);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCode, setCurrentCode] = useState(veriCode);
  const [errorMessage, setErrorMessage] = useState('');

  const ref1 = useRef();
  const ref2 = useRef();
  const ref3 = useRef();
  const ref4 = useRef();
  const dispatch = useDispatch();
  console.log(currentCode);
  console.log(dataFetch);
  useEffect(() => {
    ref1.current.focus();
  }, []);

  useEffect(() => {
    let item = '';
    codeValues.forEach((val) => (item += val));
    setNewCode(item);
  }, [codeValues]);

  useEffect(() => {
    if (limit > 0) {
      const interval = setInterval(() => {
        setLimit((limit) => limit - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [limit]);

  const handleChangeCode = (val, index) => {
    const data = [...codeValues];
    data[index] = val;
    setCodeValues(data);
  };

  const hanlderVerification = async () => {
    setCodeValues(['', '', '', '']);
    setNewCode('');
    setIsLoading(true);
    try {
      const res = await authenticationAPI.HandlerAuthentication(
        '/verification',
        {
          email: dataFetch.email,
        },
        'post'
      );
      setLimit(120);
      setCurrentCode(res.verificationCode);
      setIsLoading(false);
      setErrorMessage('');
    } catch (error) {
      setIsLoading(false);
    }
  };
  const handlerResgiter = async () => {
    const data = {
      name: dataFetch.name ? dataFetch.name : 'User',
      email: dataFetch.email,
      ngaySinh: dataFetch.ngaySinh,
      password: dataFetch.password,
      passwordConfirm: dataFetch.password,
      photo: "https://res.cloudinary.com/dwajmdb86/image/upload/v1711479672/nihongoapp/khhvxuqa1uqcp0b0ktfy.png"
    };
    if (limit > 0) {
      if (newCode.toString() === currentCode.toString()) {
        try {
          const res = await authenticationAPI.HandlerAuthentication(
            '/signup',
            data,
            'post'
          );
          console.log(res);
          const dataFetchs = {
            id: res.data.user._id,
            token: res.token,
            email: res.data.user.email,
          };
          dispatch(addAuth(dataFetchs));
          await AsyncStorage.setItem('auth', JSON.stringify(dataFetchs));
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
        }
      } else {
        setErrorMessage('Code không trùng khớp!');
      }
    } else {
      setErrorMessage('Code đã hết hạn, vui lòng chọn gửi lại code!');
    }
  };
  return (
    <>
      <ContainerComponent isImageBackground isScroll>
        <SectionnsComponent>
          <View
            style={{
              marginTop: 20,
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
          <Text style={styles.text}>Verification</Text>
        </SectionnsComponent>
        <SectionnsComponent>
          <Text style={styles.descTitle}>
            Chúng tôi đã gửi mã code đến email{' '}
            {dataFetch.email.replace(/.{1,5}/, (m) => '*'.repeat(m.length))} xin
            vui lòng kiểm tra !
          </Text>
        </SectionnsComponent>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginBottom: 40,
          }}
        >
          <TextInput
            placeholder="-"
            keyboardType="number-pad"
            maxLength={1}
            ref={ref1}
            style={styles.input}
            value={codeValues[0]}
            onChangeText={(val) => {
              val.length > 0 && ref2.current.focus();
              handleChangeCode(val, 0);
            }}
          ></TextInput>
          <TextInput
            placeholder="-"
            keyboardType="number-pad"
            value={codeValues[1]}
            maxLength={1}
            ref={ref2}
            style={styles.input}
            onChangeText={(val) => {
              val.length > 0 && ref3.current.focus();
              val.length === 0 && ref1.current.focus();
              handleChangeCode(val, 1);
            }}
          ></TextInput>
          <TextInput
            placeholder="-"
            value={codeValues[2]}
            keyboardType="number-pad"
            maxLength={1}
            ref={ref3}
            style={styles.input}
            onChangeText={(val) => {
              val.length > 0 && ref4.current.focus();
              val.length === 0 && ref2.current.focus();
              handleChangeCode(val, 2);
            }}
          ></TextInput>
          <TextInput
            placeholder="-"
            keyboardType="number-pad"
            value={codeValues[3]}
            maxLength={1}
            ref={ref4}
            style={styles.input}
            onChangeText={(val) => {
              handleChangeCode(val, 3);
              val.length === 0 && ref3.current.focus();
            }}
          ></TextInput>
        </View>
        {errorMessage && (
          <Text style={{ color: 'red', textAlign: 'center', marginBottom: 20 }}>
            {errorMessage}
          </Text>
        )}
        <SectionnsComponent>
          <BottomComponent
            text="SEND"
            onPress={handlerResgiter}
            disable={newCode.length !== 4}
          ></BottomComponent>
        </SectionnsComponent>
        {limit > 0 ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 40,
              gap: 10,
            }}
          >
            <Text>Thời gian hiệu lực</Text>
            <Text style={{ color: 'blue' }}>
              {(limit - (limit % 60)) / 60}:{limit - (limit - (limit % 60))}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 40,
              gap: 10,
            }}
            onPress={hanlderVerification}
          >
            <Text style={{ color: 'blue' }}>Gửi lại code đến email!</Text>
          </TouchableOpacity>
        )}
      </ContainerComponent>
      <Loading isVisible={isLoading}></Loading>
    </>
  );
};

export default Verification;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Nunito_Bold',
    fontSize: 30,
  },
  descTitle: {
    color: 'gray',
    fontSize: 18,
  },
  input: {
    height: 66,
    width: 66,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.Swan,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    textAlign: 'center',
    marginLeft: 10,
    fontFamily: 'Nunito_Bold',
  },
});
