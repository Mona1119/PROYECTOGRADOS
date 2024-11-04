import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importar AsyncStorage

const firebaseConfig = {
  apiKey: "AIzaSyDVmyuwmJpG0_kpk6rJ1LBQ5os5RAoZH3U",
  authDomain: "proyectogrados.firebaseapp.com",
  projectId: "proyectogrados",
  storageBucket: "proyectogrados.appspot.com",
  messagingSenderId: "820968731033",
  appId: "1:820968731033:web:a79890bab879d3f8d0e308",
  measurementId: "G-04DQV28QV8",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage) 
});

export { auth };
export const db = getFirestore(app);