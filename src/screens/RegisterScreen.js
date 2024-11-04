import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'; 
import { auth } from '../services/firebaseConfig';
import { Picker } from '@react-native-picker/picker';


const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [weight, setWeight] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = () => {
    if (!firstName || !lastName || !email || !password || !birthday || !gender || !phoneNumber || !weight) {
      setError(true);
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError(true);
      setErrorMessage('Por favor, ingresa un correo electrónico válido.');
      return;
    }
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        }).then(() => {
          console.log('Usuario registrado con nombre:', user.displayName);
          navigation.navigate('Login', { screen: 'LoginScreen' });
        }).catch((error) => {
          setError(true);
          setErrorMessage(error.message);
        });

      })
      .catch((error) => {
        setError(true);
        setErrorMessage(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icons/logo estandar.jpg')} style={styles.logo} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="First name"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Last name"
          value={lastName}
          onChangeText={setLastName}
        />
      </View>

      <TextInput
        style={styles.singleInput}
        placeholder="Email address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.singleInput}
        placeholder="Choose password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          style={styles.picker}
          onValueChange={(itemValue) => setGender(itemValue)}>
          <Picker.Item label="Selecciona tu género" value="" />
          <Picker.Item label="Masculino" value="masculino" />
          <Picker.Item label="Femenino" value="femenino" />
          <Picker.Item label="Otro" value="otro" />
        </Picker>
      </View>

      <TextInput
        style={styles.singleInput}
        placeholder="Birthday"
        value={birthday}
        onChangeText={setBirthday}
      />

      <TextInput
        style={styles.singleInput}
        placeholder="Phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />

      <TextInput
        style={styles.singleInput}
        placeholder="Peso en kg"
        value={weight}
        onChangeText={setWeight}
      />

      {error && (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
      )}

      <TouchableOpacity style={[styles.registerButton, loading && styles.loadingButton]} onPress={handleRegister} disabled={loading}>
        <Text style={styles.registerButtonText}>{loading ? 'Cargando...' : 'Crear cuenta'}</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>¿Ya tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    borderRadius: 90000000000,
    width: 180,
    height: 180,
    resizeMode: 'contain',
    marginBottom: 0.10000,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  singleInput: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#66cdaa',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#66cdaa',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 2,
  },
  pickerContainer: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#66cdaa',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 2,
  },
  picker: {
    width: '100%',
    height: 50,
  },
  registerButton: {
    backgroundColor: '#66cdaa',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 30,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingButton: {
    opacity: 0.5,
  },
  loginContainer: {
    flexDirection: 'row',
  },
  loginText: {
    color: '#66cdaa',
    fontSize: 14,
  },
  loginLink: {
    color: '#66cdaa',
    fontSize: 14,
    fontWeight: 'bold',
  },
  errorMessageContainer: {
    backgroundColor: '#F8D7DA',
    borderColor: '#F5C6CB',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  errorMessage: {
    color: '#721C24',
    fontSize: 14,
    marginBottom: 10,
  },
});

export default RegisterScreen;