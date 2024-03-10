import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import styles from './Home.style';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Header from '../../component/UI/Header/header';
import ListHome from '../../component/ListHome/List';
import data from '../../../data/datatest.json';
const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header
        textLeft="Left"
        textRight="Right"
        left={require('../../../assets/Icons/japan.png')}
        right={require('../../../assets/Icons/fire.png')}
      />
      <ListHome data={data.sections} />
    </SafeAreaView>
  );
};

export default Home;
