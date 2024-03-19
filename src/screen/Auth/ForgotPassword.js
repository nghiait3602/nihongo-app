import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../constants/colors';
import ContainerComponent from '../../component/UI/Auth/ContainerComponent';
import SectionnsComponent from '../../component/UI/Auth/SectionnsComponent';
import InputComponent from '../../component/UI/Auth/InputComponent';
import BottomComponent from '../../component/UI/Auth/BottomComponent';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();
  return (
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
            <MaterialIcons name="keyboard-backspace" size={32} color="black" />
          </TouchableOpacity>
        </View>
      </SectionnsComponent>
      <SectionnsComponent>
        <InputComponent
          value={email}
          placeholder="Email"
          onChange={(val) => setEmail(val)}
          allowClear
          affix={<AntDesign name="mail" size={24} color="black" />}
        />
      </SectionnsComponent>
      <SectionnsComponent>
        <BottomComponent
          isDisable
          text="Reset Password"
          onPress={() => {}}
        ></BottomComponent>
      </SectionnsComponent>
    </ContainerComponent>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({});
