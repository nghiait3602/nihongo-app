import { StyleSheet } from "react-native";

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
    borderColor: "#08979c",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chuCai: {
    fontSize: 24,
    color: "black",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  chuCaiFlatList: {
    justifyContent: "center",
    alignItems: "center",
  },
});
