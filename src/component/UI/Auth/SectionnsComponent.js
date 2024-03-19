import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const SectionnsComponent = (props) => {
  const { children, styl } = props;
  return <View style={[styles.section, styl]}>{children}</View>;
};

export default SectionnsComponent;

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});
