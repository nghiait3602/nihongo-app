import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default StyleSheet.create({
  nullContainer: {
    width: 50,
    height: 50,
    marginHorizontal: 12,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  chuCaiContainer: {
    width: 50,
    height: 50,
    marginHorizontal: 12,
    marginVertical: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.XanhNgocDam,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  chuCai: {
    fontSize: 24,
    color: "black",
  },
  title: {
    marginVertical: 10,
    fontSize: 24,
    color: Colors.title,
    fontWeight: 'bold'
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  chuCaiFlatList: {
    justifyContent: "center",
    alignItems: "center",
  }
});
