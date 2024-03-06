import { View, Text, Image } from 'react-native';
import React from 'react';
import styles from './header.styles';
const Header = () => {
  return (
    <View style={styles.header}>
      <View style={styles.infoContainer}>
        <Image
          style={styles.countryLogo}
          source={require('../../../../assets/Icons/japan.png')}
        />
        <Text style={styles.countryText}>Left</Text>
      </View>
      <View style={styles.infoContainer}>
        <Image source={require('../../../../assets/Icons/fire.png')} />
        <Text style={styles.fireText}>Right</Text>
      </View>
    </View>
  );
};

export default Header;
