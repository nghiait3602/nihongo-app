import { Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../../constants/colors';

function OutLineButton({ onPress, icon, children }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons
        style={styles.icon}
        name={icon}
        size={18}
        color={Colors.Feather_Green}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default OutLineButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    marginRight: 18,
    marginLeft: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.Beak_Upper,
    borderRadius: 10,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.Beak_Upper,
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'Nunito_Bold',
  },
});
