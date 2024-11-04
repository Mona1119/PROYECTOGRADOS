import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { db } from '../services/firebaseConfig'; 
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';

const FutbolScreen = () => {
  const [options, setOptions] = useState([]);
  const [expandedOption, setExpandedOption] = useState(null); // Para controlar qué opción está expandida

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const optionsCollection = collection(db, 'Voleibol');
        const optionsSnapshot = await getDocs(optionsCollection);
        const optionsList = optionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOptions(optionsList);
      } catch (error) {
        console.error('Error al obtener las opciones de fútbol: ', error);
      }
    };

    fetchOptions();
  }, []);

  const handleOptionPress = async (option) => {
    if (expandedOption && expandedOption.id === option.id) {
      setExpandedOption(null); // Si ya está expandido, colapsa
    } else {
      setExpandedOption(option); // Expande la opción seleccionada
    }
  };

  const handleBack = () => {
    setExpandedOption(null); // Colapsa cualquier opción expandida
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Elige una opción de Voleibol</Text>
      <ScrollView style={styles.scroll}>
        {options.map(option => (
          <View key={option.id}>
            <TouchableOpacity 
              style={styles.card}
              onPress={() => handleOptionPress(option)} 
            >
              <Text style={styles.cardTitle}>{option.id}</Text>
            </TouchableOpacity>
            {expandedOption && expandedOption.id === option.id && ( // Mostrar información si la opción está expandida
              <View style={styles.optionContainer}>
                {Object.keys(option).map((key) => (
                  <Text key={key} style={styles.optionText}>
                    <Text style={styles.optionKey}>{`${key}: `}</Text>
                    <Text style={styles.optionValue}>{option[key]}</Text>
                  </Text>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
      {expandedOption && (
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
      )}
    </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5", // Color de fondo más claro
    alignItems: 'center', 
  },
  subtitle: {
    fontSize: 24,
    color: "#66cdaa",
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold', // Texto en negrita
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
  cardTitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: 'center',
  },
  optionContainer: {
    padding: 10,
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
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
  },
  optionKey: {
    fontSize: 16,
    color: "#66cdaa", // Color principal para los títulos
    fontWeight: 'bold', // Texto en negrita
  },
  optionValue: {
    fontSize: 16,
    color: "#333",
  },
  backButtonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#66cdaa',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default FutbolScreen;