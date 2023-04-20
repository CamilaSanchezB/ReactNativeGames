import React from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import { useState } from 'react';
import Game from './components/Game';
import Finished from './components/Finished';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications



export default function App() {
const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontVariant: 'semibold',
    fontSize: 32,
    color: 'rgba(0, 0, 0, 0.75)',
},

line: {
  borderBottomColor: 'rgba(0, 0, 0, 0.3)',
  borderBottomWidth: StyleSheet.hairlineWidth,
  width: '50%',
  marginHorizontal: 'auto',
  marginVertical: 5,
    
},
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
  card: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 40,
    width: '100%',
    height: '75%',
    paddingVertical: 30,
    paddingHorizontal: 20,
},

shadow01: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
},
})
/*setear onQuery(respuestas)*/
  const [valor, setValor] = useState([]);
  const [lastCat, setLastCat] = useState(0);
  return(
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={[styles.card, styles.shadow01]}>
          <Text style={styles.title}>Tutti Fruti</Text>
          <View style={styles.line}></View>
          {lastCat!==2 && (<Game onQuery={setValor} onLastCategory={setLastCat}/>)}
          {lastCat===2 &&(<Finished query={valor}/>)}
        </View>
      </View>
      <View style={styles.footer}>
        <Image source={require('./assets/home.png')} style={styles.home} />
      </View>
    </View>
  );
}



