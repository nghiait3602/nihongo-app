import { StyleSheet, FlatList } from 'react-native';
import React from 'react';
import ItemHome from './ItemHome';
const List = ({ data }) => {
  return (
    <FlatList
      data={data}
      renderItem={ItemHome}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
    ></FlatList>
  );
};

export default List;

const styles = StyleSheet.create({});
