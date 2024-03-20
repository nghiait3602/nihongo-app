import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import styles from './Home.style';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Header from '../../component/UI/Header/header';
import ListHome from '../../component/ListHome/List';
import data from '../../../data/datatest.json';
import authenticationAPI from '../../Api/authApi';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer';
const Home = () => {
  const auth = useSelector(authSelector);
  useEffect(() => {
    console.log(auth.id);
    // fect();
  }, []);
  // async function fect() {
  //   try {
  //     const res = await authenticationAPI.HandlerAuthentication(
  //       `/`,
  //       null,
  //       'get',
  //       auth.token
  //     );
  //     console.log(res.data);
  //   } catch (error) {}
  // }
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
