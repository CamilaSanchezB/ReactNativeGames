import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

function Finished({ query }) {
  const [indiceActual, setIndiceActual] = useState(0);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
      marginTop: 20, // Agregar margen superior
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginTop: 20,
    },
    image: {
      width: 150,
      height: 150,
      alignSelf: 'center',
      marginBottom: 0,
    },
    respuesta: {
      fontWeight: 'bold',
      fontSize: 18,
      textAlign: 'center',
      marginBottom: 10,
      backgroundColor: '#FFC164',
      borderRadius: 10,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    arrowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      position: 'absolute',
      bottom: 20,
    },
    arrowButton: {
      backgroundColor: '#E2879C',
      borderRadius: 30,
      padding: 10,
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (indiceActual < query.length - 1) {
        setIndiceActual(indiceActual + 1);
      } else {
        clearInterval(interval);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [indiceActual, query]);

  return (
    <View style={styles.container}>
      {query.length > 0 && (
        <>
          <Text style={styles.title}>{query[indiceActual].categoria} con la letra {query[indiceActual].letra}</Text>
          <Image source={require('../assets/favicon.png')} style={styles.image} />
          <Text style={styles.respuesta}>{(query[indiceActual].respuesta).toUpperCase()}</Text>
          <View style={styles.arrowContainer}>
            {indiceActual > 0 && (
              <TouchableOpacity onPress={() => { setIndiceActual(indiceActual - 1) }} style={styles.arrowButton}>
                <MaterialIcons name="arrow-back" size={24} color="white" />
              </TouchableOpacity>
            )}
            {indiceActual < query.length - 1 && (
              <TouchableOpacity onPress={() => { setIndiceActual(indiceActual + 1) }} style={styles.arrowButton}>
                <MaterialIcons name="arrow-forward" size={24} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
}

export default Finished;
