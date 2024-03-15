import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';
const TuVungChiTiet = () => {
  const router = useRoute();
  const data = router.params;
  return (
    <View>
      <Text>{data.itemId}</Text>
    </View>
  );
};

export default TuVungChiTiet;

const styles = StyleSheet.create({});
