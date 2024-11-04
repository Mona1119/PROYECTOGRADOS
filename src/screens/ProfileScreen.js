// screens/ProfileScreen.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext'; 
import { Calendar } from 'react-native-calendars'; 

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth(); // Asegúrate de que logout esté disponible en tu contexto
  const [selectedDate, setSelectedDate] = useState('');

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleLogout = async () => {
    await logout(); // Llama a la función de logout
    navigation.navigate('Login'); // Navega a la pantalla de Login
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{user?.displayName || 'Usuario'}</Text>      
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.editButton}>Editar perfil</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Estas en nivel 1</Text>
        <Text style={styles.expText}>¡Entra todos los días para subir tu nivel!</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Correo: {user?.email || 'No disponible'}</Text>
        <Text style={styles.infoText}>Teléfono: {user?.phoneNumber || 'No disponible'}</Text>
        <Text style={styles.infoText}>Contraseña: {user?.password || 'No disponible'}</Text>
      </View>

      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
          }}
          style={styles.calendar}
        />
        {selectedDate ? (
          <Text style={styles.selectedDateText}>Fecha seleccionada: {selectedDate}</Text>
        ) : null}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey', 
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    color: '#FFF0ED',
  },
  editButton: {
    color: '#FFF',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#66cdaa',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFF',
  },
  expText: {
    fontSize: 16,
    color: '#FFF',
  },
  infoContainer: {
    backgroundColor: '#66cdaa', 
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#FFF',
  },
  calendarContainer: {
    marginVertical: 20,
    backgroundColor: '#66cdaa',
    borderRadius: 10,
    padding: 10,
  },
  calendar: {
    marginBottom: 10,
  },
  selectedDateText: {
    fontSize: 16,
    color: '#FFF',
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#E74C3C', 
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default ProfileScreen;