import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const ContainerComponent = (props) => {
  const { isImageBackground, isScroll, title, children } = props;
  const returnContainer = isScroll ? (
    <ScrollView style={styles.container}>{children}</ScrollView>
  ) : (
    <View style={styles.container}>{children}</View>
  );
  return isImageBackground ? (
    <ImageBackground
      source={require('../../../../assets/Icons/animals.png')}
      style={{ flex: 1 }}
      imageStyle={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>{returnContainer}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>{returnContainer}</View>
    </SafeAreaView>
  );
};

export default ContainerComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
