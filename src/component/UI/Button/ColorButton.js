import { Pressable, Text, StyleSheet } from "react-native";
import { Colors } from "../../../constants/colors";

function ColorButton({ onPress, children, color }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: color || Colors.Feather_Green }, // Set mau mac dinh
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default ColorButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    margin: 15,
    elevation: 4,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'white'
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
});
