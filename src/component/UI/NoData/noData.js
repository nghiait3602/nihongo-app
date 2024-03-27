import React from 'react';
import { StyleSheet, View } from 'react-native';
import SectionnsComponent from '../Auth/SectionnsComponent';
import LottieView from 'lottie-react-native';

const noData = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}
    >
      <SectionnsComponent>
        <LottieView
          autoPlay
          style={{ width: '100%', height: '100%' }}
          source={require('../../../../assets/Img/Nodata.json')}
        ></LottieView>
      </SectionnsComponent>
    </View>
  );
};

export default noData;

const styles = StyleSheet.create({});
