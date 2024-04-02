import {
  StyleSheet,
  SafeAreaView,
  Platform,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import { Colors } from "../../constants/colors";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import Header from "../../component/UI/Header/header";
import { FlatList } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import KhoaHocApi from "../../Api/khohocApi";
import TienTrinhApi from "../../Api/tienTrinhApi";
import userAPI from "../../Api/authApi";

import { useSelector } from "react-redux";
import { authSelector } from "../../redux/reducers/authReducer";
import Loading from "../../Modals/Loading";
import SectionComponent from "../../component/UI/Auth/SectionnsComponent";
import LottieView from "lottie-react-native";
const LessionScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchData, setData] = useState([]);
  const [check, setCheck] = useState([]);

  const navigation = useNavigation();
  const router = useRoute();
  const idKhoaHoc = router.params;
  const auth = useSelector(authSelector);

  const [TienTrinhUser, setTienTrinhUser] = useState([]);
  const [userNow, setUserNow] = useState(null);
  const [userData, setUserData] = useState([]);

  const fetchDataMe = async () => {
    try {
      const response = await userAPI.HandlerAuthentication(
        `/me`,
        null,
        "get",
        auth.token
      );
      if (
        response.status === "success" &&
        response.data.data.tienTrinhCuaToi.length > 0
      ) {
        const tienTrinhIds = response.data.data.tienTrinhCuaToi.map(
          (tienTrinh) => tienTrinh.baiHoc._id
        );
        setTienTrinhUser(tienTrinhIds);
        setUserNow(response.data.data.id);
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };
  useEffect(() => {
    fetchDataMe();
  }, [auth.token]);

  useEffect(() => {
    handleGetBaiHoc();
  }, [idKhoaHoc, auth.token]);

  const fetchData2 = async () => {
    try {
      const response = await TienTrinhApi.TienTrinhHandler(
        "/",
        null,
        "get",
        auth.token
      );
      if (response.status === "success" && response.results >= 1) {
        const responseData = response.data.data; // Lấy ra mảng data từ response
        const baiHocIds = responseData.map((item) => item.baiHoc._id); // Lấy ra mảng các baiHoc._id
        const userIds = responseData.map((item) => item.user);
        setUserData(userIds);
        setCheck(baiHocIds); // Đặt giá trị của check là mảng các baiHoc._id
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  };

  useEffect(() => {
    fetchData2();
  }, [auth.token]);

  const handleGetBaiHoc = async () => {
    setIsLoading(true);
    try {
      if (auth.token && idKhoaHoc) {
        const res = await KhoaHocApi.baiHocHandler(
          `/${idKhoaHoc}/baihoc`,
          "",
          "get",
          auth.token
        );
        setData(res.data.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  function handlerNavigation(item) {
    console.log(item);
    navigation.navigate("LessionObject", item);
  }
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={[
          styles.item,
          check.includes(item._id) &&
          TienTrinhUser.includes(item._id) &&
          userData.includes(userNow)
            ? { opacity: 0.3 }
            : null,
        ]}
        onPress={handlerNavigation.bind(this, item._id)}
      >
        <View style={styles.infoContainer}>
          <Image
            style={styles.logoLession}
            source={{ uri: item.hinhAnh }}
          ></Image>
          <View style={styles.inforContent}>
            <Text style={styles.text}>{item.tenBaiHoc}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  if (fetchData.length === 0 && !isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <SectionComponent>
          <LottieView
            autoPlay
            style={{ width: "100%", height: "100%" }}
            source={require("../../../assets/Img/Nodata.json")}
          ></LottieView>
        </SectionComponent>
      </View>
    );
  }
  return (
    <SafeAreaView style={{ ...styles.container }}>
      {isLoading && <Loading isVisible={isLoading}></Loading>}
      {fetchData && !isLoading && (
        <FlatList
          data={fetchData}
          keyExtractor={(item, index) => index}
          renderItem={renderItem}
        ></FlatList>
      )}
    </SafeAreaView>
  );
};

export default LessionScreen;
var width = Dimensions.get("window").width;
var height = Dimensions.get("window").height;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Snow,
    paddingTop: Platform.OS === "android" ? 50 : 0,
  },
  item: {
    display: "flex",
    flex: 1,
    padding: 10,
    color: "black",
    justifyContent: "center",
    margin: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logoLession: {
    width: width * 0.06,
    height: height * 0.04,
  },
  inforContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Nunito_ExtraBold",
  },
});
