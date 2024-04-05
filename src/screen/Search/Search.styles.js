import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    // backgroundColor: Colors.backgroundSliver,
    backgroundColor: Colors.searchHeader,
    borderColor: Colors.searchBorder,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 40,
    elevation: 4,
    marginBottom: 10,
  },
  searchContainer: {
    backgroundColor: Colors.searchBar, 
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 19
  },
  buttonsContainer: {
    flexDirection: "row",
    paddingVertical: 20,
  },
  buttonContainer: {
    flex: 1,
  },
  cameraContainer: {
    flex: 1,
  },
  search: {
    flex: 1,
    backgroundColor: Colors.backgroundBottom,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 5,
    fontSize: 16,
    elevation: 4,
    // borderColor: "#0af4fc",
    // borderWidth: 1,
  },
  label: {
    color: Colors.title,
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 8,
  },
  icon: {
    color: Colors.searchIcon,
    marginHorizontal: 12,
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Màu nền mờ
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%", // Chiều rộng của nội dung modal
    maxHeight: "80%", // Chiều cao tối đa của nội dung modal
  },
  closeButton: {
    width: 40,
    height: 40, 
    justifyContent: "center", 
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)", 
    alignSelf: "center",
    marginBottom: 10,
  },
});
