import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import styles from './Home.style';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Header from '../../component/UI/Header/header';
import ListHome from '../../component/ListHome/List';
import data from '../../../data/datatest.json';
import authenticationAPI from '../../Api/authApi';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/reducers/authReducer';
import LerverApi from '../../Api/leversApi';
import Loading from '../../Modals/Loading';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-async-storage/async-storage';
import axios from 'axios';
const Home = () => {
  const [dataFetch, setDataFetch] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = useSelector(authSelector);

  useEffect(() => {
    if (auth.token) {
      handerLever();
    } else {
      console.error('Authentication token is missing or invalid.');
      setIsLoading(false);
    }
  }, []);

  const handerLever = async () => {
    try {
      const res = await LerverApi.HandlerLever('/', null, 'get', auth.token);
      if (res && res.data) {
        const data = res; // Lấy mảng dữ liệu từ trường "data"
        setDataFetch(data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Header
        textLeft="Nhật Bản"
        left={require('../../../assets/Icons/japan.png')}
      />
      {isLoading && <Loading isVisible={isLoading}></Loading>}
      {dataFetch && !isLoading && <ListHome data={dataFetch} />}
    </SafeAreaView>
  );
};

export default Home;
