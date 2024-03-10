import { View, Text, Image } from 'react-native';
import React from 'react';
import styles from './header.styles';
const Header = ({ left, right, onPress, textLeft, textRight }) => {
  return (
    <View style={styles.header}>
      <View style={styles.infoContainer}>
        <Image style={styles.countryLogo} source={left} />
        <Text style={styles.countryText} onPress={onPress}>
          {textLeft}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <Image source={right} />
        <Text style={styles.fireText}>{textRight}</Text>
      </View>
    </View>
  );
};

export default Header;
