import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ItemKhoaHoc from '../UI/KhoaHoc/ItemKhoaHoc';
import ItemStyles from './Item.styles';
const ItemHome = ({ item }) => {
  const { id, data } = item;
  return (
    <View style={ItemStyles.sectionContainer}>
      {data.map((tier) => {
        console.log(tier);
        return (
          <View key={tier.tier} style={ItemStyles.sections}>
            {tier.exercises.map((exercise) => {
              return <ItemKhoaHoc exercise={exercise} key={exercise.id} />;
            })}
          </View>
        );
      })}
    </View>
  );
};

export default ItemHome;

const styles = StyleSheet.create({});
