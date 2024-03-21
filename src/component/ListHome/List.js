import { StyleSheet, FlatList } from 'react-native';
import React from 'react';
import ItemHome from './ItemHome';
const List = ({ data }) => {
  function convertData(inputData) {
    // Lấy giá trị của trường "data" từ đầu vào
    const { data, ...rest } = inputData;
    // Tạo một mảng mới chứa một đối tượng có trường "data" chỉ với giá trị của trường "capdo"
    const outputData = [{ data: data.capdo, id: 'introl' }];
    return outputData;
  }
  // Sử dụng hàm chuyển đổi và in kết quả
  const outputData = convertData(data);
  console.log(outputData);

  return (
    <FlatList
      data={outputData}
      renderItem={ItemHome}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
    ></FlatList>
  );
};

export default List;

const styles = StyleSheet.create({});
