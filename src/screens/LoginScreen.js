import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig'; 

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setError(true);
      setErrorMessage('Por favor, completa todos los campos.');
      return;
    }
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setLoading(false);
        console.log('Usuario logueado:', userCredential.user);
        setError(false);  
        setErrorMessage('');  
        navigation.navigate('MainTabs', { screen: 'Home' });
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        setErrorMessage(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/icons/logo estandar.jpg')}  
        style={styles.logo}
      />

      <Text style={styles.title}>Inicia sesión con tu cuenta</Text>

      <View style={styles.inputContainer}>
        <Icon name="email-outline" size={24} color="#F28C85" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="correo electrónico"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={24} color="#F28C85" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      {error && (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        </View>
      )}

      <TouchableOpacity style={[styles.loginButton, loading && styles.loadingButton]} onPress={handleLogin} disabled={loading}>
        <Text style={styles.loginButtonText}>{loading ? 'Cargando...' : 'Iniciar sesión'}</Text>
      </TouchableOpacity>

      {error && (
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      )}

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>¿Aun no tienes una cuenta? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>Regístrate aquí</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    borderRadius: 60,
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 18,
    color: '#66cdaa',
    fontWeight: '600',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  icon: {
    marginRight: 10,
    color: "66cdaa",
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#66cdaa',
  },
  forgotPassword: {
    color: '#66cdaa',
    fontSize: 14,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#66cdaa',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
    marginBottom: 30,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingButton: {
    opacity: 0.5,
  },
  registerContainer: {
    flexDirection: 'row',
  },
  registerText: {
    color: '#9A9A9A',
    fontSize: 14,
  },
  registerLink: {
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

export default LoginScreen;