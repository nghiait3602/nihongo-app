import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const item = ({ icon, children, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{ flex: 0.5 }}>
        <Ionicons
          style={styles.icon}
          name={icon}
          size={32}
          color={Colors.XanhNgocDam}
        />
      </View>
      <View style={{ flex: 0.7 }}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default item;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 40,
    elevation: 2,
    shadowColor: 'gray',
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 20,
    shadowOpacity: 0.5,
  },
  icon: {
    textAlign: 'center',
    width: 50,
    height: 30,
  },
  text: {
    fontSize: 15,
    fontFamily: 'Nunito_ExtraBold',
  },
});
