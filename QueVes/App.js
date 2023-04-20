import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import Game from './components/Game';
export default function App() {
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Game />
      </View>
      <View style={styles.footer}>
        <Image source={require('./assets/home.png')} style={styles.home} />
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 2,
    backgroundColor: '#FFE7D5',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    width: '100%',
    height: '7.5%',
    backgroundColor: '#2FD2A3',
    alignItems: 'center',
    color: 'white',
  },
  home: {
    height: '90%',
    width: '15%',
  },
});