import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Text } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const logoAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(logoAnimation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/icons/logo estandar.jpg')}
        style={[styles.logo, { opacity: logoAnimation }]}
      />
      <Text style={styles.loadingText}>Cargando...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    borderRadius: 60,
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#fff',
  },
});

export default SplashScreen