import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import styles from './Home.style';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import Header from '../../component/UI/Header/header';

const Home = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header />
    </SafeAreaView>
  );
};

export default Home;
