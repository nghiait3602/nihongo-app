import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './header.styles';
const Header = ({ left, right, onPress, textLeft, textRight }) => {
  return (
    <View style={styles.header}>
      <View style={styles.infoContainer}>
        <TouchableOpacity style={styles.infoContainer} onPress={onPress}>
          <Image style={styles.countryLogo} source={left} />
          <Text style={styles.countryText}>{textLeft}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        <Image source={right} />
      </View>
    </View>
  );
};

export default Header;
