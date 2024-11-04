import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    // Redirigir a la pantalla de Splash después de 2 segundos
    const timer = setTimeout(() => {
      navigation.navigate('SplashScreen');
    }, 2000); // 2000 ms = 2 segundos

    // Limpiar el timer al desmontar el componente
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SplashScreen')} style={styles.button}>
        <Text style={styles.buttonText}>VAMOS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0ED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
  },
  button: {
    backgroundColor: '#FFC107',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;