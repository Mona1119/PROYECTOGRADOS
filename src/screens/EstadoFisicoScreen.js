import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db } from '../services/firebaseConfig'; 
import { doc, getDoc } from 'firebase/firestore';

const EstadoFisicoScreen = () => {
  const [days, setDays] = useState([]);
  const [routine, setRoutine] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showRoutine, setShowRoutine] = useState(false);
  const animation = useState(new Animated.Value(0))[0]; 
  const navigation = useNavigation();

  useEffect(() => {
    const daysOfWeek = [
      { id: 1, dia: 'Lunes' },
      { id: 2, dia: 'Martes' },
      { id: 3, dia: 'Miercoles' },
      { id: 4, dia: 'Jueves' },
      { id: 5, dia: 'Viernes' },
      { id: 6, dia: 'Sabado' },
      { id: 7, dia: 'Domingo' },
    ];
    setDays(daysOfWeek);
  }, []);

  useEffect(() => {
    const fetchRoutine = async () => {
      if (!selectedDay) return;

      try {
        const docRef = doc(db, 'Estado Fisico', selectedDay.dia);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setRoutine(docSnap.data());
          setShowRoutine(true);
          // Iniciar la animación de entrada
          Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }).start();
        } else {
          console.log('No hay rutina disponible para este día');
          setRoutine(null);
        }
      } catch (error) {
        console.error('Error al obtener la rutina: ', error);
      }
    };

    fetchRoutine();
  }, [selectedDay]);

  const handleBack = () => {
    //animación 
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setShowRoutine(false); 
      setSelectedDay(null);
      setRoutine(null); 
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Elige un día para entrenar</Text>
      {showRoutine ? (
        <Animated.View style={[styles.routineContainer, { opacity: animation }]}>
          {routine && selectedDay && (
            <>
              {Object.keys(routine).map((key, index) => (
                <View key={index}>
                  <Text style={styles.routineTitle}>{key}</Text>
                  <Text style={styles.routineDescription}>{routine[key]}</Text>
                </View>
              ))}
              <Text style={styles.selectedDay}>Día seleccionado: {selectedDay.dia}</Text>
            </>
          )}
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <ScrollView style={styles.scroll}>
          {days.map((day) => (
            <TouchableOpacity 
              key={day.id}
              style={styles.card}
              onPress={() => {
                setSelectedDay(day);
                console.log(`Día seleccionado: ${day.dia}`);
              }} 
            >
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{day.dia}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 24,
    color: "#66cdaa",
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: ' bold',
  },
  scroll: {
    width: '100%',
  },
  card: {
    borderRadius: 10,
    marginVertical: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#66cdaa',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: 'center',
  },
  routineContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    marginBottom: 20,
  },
  routineTitle: {
    fontSize: 20,
    color: "#66cdaa",
    marginBottom: 10,
    fontWeight: 'bold',
  },
  routineDescription: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  selectedDay: {
    fontSize: 18,
    color: "#66cdaa",
    textAlign: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#66cdaa',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: 'center',
  },
});

export default EstadoFisicoScreen;