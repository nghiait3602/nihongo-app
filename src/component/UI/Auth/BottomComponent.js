import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../../constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

const BottomComponent = (props) => {
  const { text, color, onPress, disable } = props;
  return (
    <View style={{ justifyContent: 'center' }}>
      <TouchableOpacity
        disabled={disable}
        onPress={onPress}
        style={[
          styles.button,
          styles.shadow,
          {
            backgroundColor: color ? color : disable ? 'gray' : Colors.primary,
            marginBottom: 17,
            width: '100%',
          },
        ]}
      >
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomComponent;

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'White',
    paddingHorizontal: 16,
    paddingVertical: 16,
    // minHeight: 56,
    flexDirection: 'row',
  },
  shadow: {
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  text: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Nunito_Regular',
  },
});
