import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { useAuth } from '../context/AuthContext'; 
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ navigation }) => {
  const { user } = useAuth();
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [animation]);

  return (
    <Animated.View style={[styles.container, { opacity: animation }]}>
      <Text style={styles.subtitle}>¿Qué quieres hacer hoy?,</Text>
      <Text style={styles.title}>{user?.displayName  || 'Usuario'}</Text> 
      <View style={styles.cardsContainer}>
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('EstadoFisico')}
          accessibilityLabel="Ir a Estado Físico">
          <Image source={require('../../assets/icons/estadofisico.jpg')} style={styles.logo}/>
          <Text style={styles.cardTitle}>Estado Físico</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('Futbol')}
          accessibilityLabel="Ir a Futbol">
          <Image source={require('../../assets/icons/futbol.jpg')} style={styles.logo}/> 
          <Text style={styles.cardTitle}>Futbol</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('Baloncesto')}
          accessibilityLabel="Ir a Baloncesto">
          <Image source={require('../../assets/icons/baloncesto.jpg')} style={styles.logo}/>  
          <Text style={styles.cardTitle}>Baloncesto</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => navigation.navigate('Voleibol')}
          accessibilityLabel="Ir a Voley Ball">
          <Image source={require('../../assets/icons/voleibal.jpg')} style={styles.logo}/>  
          <Text style={styles.cardTitle}>Voley Ball</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "grey",
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: "#66cdaa",
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#66cdaa",
    textAlign: 'center',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 60,
  },
  card: {
    width: '45%',
    marginBottom: 20,
    backgroundColor: "#66cdaa",
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    color: "#000000",
  },
});

export default HomeScreen;