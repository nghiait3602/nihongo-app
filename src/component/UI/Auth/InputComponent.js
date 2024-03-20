import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { Feather, AntDesign } from '@expo/vector-icons';
import { Colors } from '../../../constants/colors';
const InputComponen = (props) => {
  const {
    value,
    onChange,
    affix,
    placeholder,
    suffix,
    isPassword,
    allowClear,
    type,
    onEnd,
  } = props;
  const [isShow, setIsShowPass] = useState(isPassword ?? false);
  return (
    <View style={styles.inputContainer}>
      {affix ?? affix}
      <TextInput
        style={styles.input}
        value={value}
        placeholder={placeholder ?? ''}
        onChangeText={(val) => onChange(val)}
        secureTextEntry={isShow}
        autoCapitalize="none"
        onEndEditing={onEnd}
      ></TextInput>
      {suffix ?? suffix}
      <TouchableOpacity
        onPress={isPassword ? () => setIsShowPass(!isShow) : () => onChange('')}
      >
        {isPassword ? (
          <Feather name={isShow ? 'eye-off' : 'eye'} size={24} color="black" />
        ) : (
          value.length > 0 &&
          allowClear && <AntDesign name="close" size={24} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default InputComponen;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.Macaw,
    width: '100%',
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: 'white',
    marginBottom: 19,
  },

  input: {
    padding: 0,
    margin: 0,
    flex: 1,
    paddingHorizontal: 14,
    color: 'black',
    fontFamily: 'Nunito_Regular',
    fontSize: 14,
  },
});
