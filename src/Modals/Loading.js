import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Loading = (props) => {
  const { isVisible } = props;
  return (
    <Modal
      visible={isVisible}
      style={{ flex: 1 }}
      transparent
      statusBarTranslucent
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <ActivityIndicator color="white" size={32}></ActivityIndicator>
        <Text style={{ flex: 0, color: 'white' }}>Loading....</Text>
      </View>
    </Modal>
  );
};

export default Loading;

const styles = StyleSheet.create({});
