import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ItemKhoaHoc from '../UI/KhoaHoc/ItemKhoaHoc';
import ItemStyles from './Item.styles';
const ItemHome = ({ item }) => {
  const { id, data } = item;
  return (
    <View style={ItemStyles.sectionContainer}>
      {data.map((id) => {
        return (
          <View key={id._id} style={ItemStyles.sections}>
            {id.dsKhoaHoc.map((khoaHoc) => {
              return <ItemKhoaHoc KhoaHoc={khoaHoc} key={khoaHoc._id} />;
            })}
          </View>
        );
      })}
    </View>
  );
};

export default ItemHome;

const styles = StyleSheet.create({});
