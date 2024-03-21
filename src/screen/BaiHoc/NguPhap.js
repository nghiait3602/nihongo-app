// import React, { useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   View,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// import nguPhapApi from "../../Api/lessionApi";
// import { useDispatch } from "react-redux";
// import { addAuth } from "../../redux/reducers/authReducer";
// import { Colors } from "../../constants/colors";
// import { useNavigation } from "@react-navigation/native";

// const NguPhap = () => {
//   const navigator = useNavigation();
//   const [nguPhap, setNguPhap] = useState([]);

//   const dispatch = useDispatch();

//   const handlerNguPhap = async () => {
//     const res = await nguPhapApi.nguPhapHandler("/", null, "get", null);
//     const dataFetch = {
//       id: res.data.data[0]._id,
//       baiHoc: res.data.data[0].baiHoc,
//       cauTruc: res.data.data[0].cauTruc,
//     };
//     setNguPhap(dataFetch);
//     dispatch(addAuth(dataFetch));
//     navigator.navigate("NguPhapChiTiet", dataFetch);
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.container}
//       onPress={() => handlerNguPhap(item)}
//     >
//       <View style={{ flexDirection: "row" }}>
//         <Text style={styles.textTitle}>{item.nguPhap}</Text>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={{ flex: 1, backgroundColor: "white" }}>
//       <FlatList
//         data={nguPhap}
//         keyExtractor={(item) => item._id}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// export default NguPhap;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     borderBottomColor: "gray",
//     borderBottomWidth: 1,
//     backgroundColor: "white",
//     justifyContent: "center",
//   },
//   textTitle: {
//     fontSize: 20,
//     color: "black",
//     fontFamily: "Nunito_Bold",
//     fontWeight: "bold",
//   },
//   textDesc: {
//     marginLeft: 10,
//     fontSize: 15,
//     color: Colors.Wolf,
//     fontFamily: "Nunito_Bold",
//   },
// });

import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import nguPhapApi from "../../Api/lessionApi";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

const NguPhap = () => {
  const navigator = useNavigation();
  const [nguPhap, setNguPhap] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    handlerNguPhap();
  }, []);

  const handlerNguPhap = async () => {
    try {
      const response = await nguPhapApi.nguPhapHandler("", null, "get", null);
      const data = response.data.data;
      setNguPhap(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.");
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigateToDetail(item)}
    >
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.textTitle}>{item.cauTruc}</Text>
      </View>
    </TouchableOpacity>
  );

  const navigateToDetail = (item) => {
    navigator.navigate("NguPhapChiTiet", item);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        data={nguPhap}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default NguPhap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  textTitle: {
    fontSize: 20,
    color: "black",
    fontFamily: "Nunito_Bold",
    fontWeight: "bold",
  },
  textDesc: {
    marginLeft: 10,
    fontSize: 15,
    color: Colors.Wolf,
    fontFamily: "Nunito_Bold",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
