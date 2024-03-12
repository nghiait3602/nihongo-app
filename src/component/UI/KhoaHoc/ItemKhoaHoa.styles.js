import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  innerButton: {
    alignItems: 'center',
    margin: 5,
  },
  innerCircle: {
    opacity: 0.8,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    height: 120 * 0.75, // 90px
    width: 120 * 0.75, // 90px
  },
  innerLogo: {
    width: 50,
    height: 50,
  },
  innerText: { fontFamily: 'Nunito_Black', fontSize: 18, marginTop: 5 },
});
