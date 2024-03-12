import { StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.2,
    backgroundColor: Colors.backgroundSliver,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 40,
    elevation: 4,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: 18,
    marginBottom: 4,
  },
  icon: {
    marginHorizontal: 12,
    alignItems: "center",
  },
});
