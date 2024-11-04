import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import EstadoFisicoScreen from '../screens/EstadoFisicoScreen';
import EditProfileScreen from "../screens/EditProfileScreen";
import FutbolScreen from '../screens/FutbolScreen';
import BaloncestoScreen from '../screens/BaloncestoScreen';
import VoleibolScreen from '../screens/VoleibolScreen';
import EditNameScreen from '../screens/EditNameScreen';
import colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import CustomTheme from '../constants/CustomTheme';
import EditEmailScreen from '../screens/EditEmailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// TabNavigator para las pestañas principales
const TabNavigator = () => (
  <Tab.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{
      tabBarStyle: { backgroundColor: colors.principal },
      tabBarActiveTintColor: colors.luminous,
      tabBarInactiveTintColor: colors.variante3,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="person" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => (
  <NavigationContainer theme={CustomTheme}>
    <Stack.Navigator initialRouteName="Welcome">
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="EstadoFisico" component={EstadoFisicoScreen} />
      <Stack.Screen name="Futbol" component={FutbolScreen} options/>
      <Stack.Screen name="Baloncesto" component={BaloncestoScreen} options/>
      <Stack.Screen name="Voleibol" component={VoleibolScreen} options/>
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options/>
      <Stack.Screen name="EditProfile" component={EditProfileScreen} options/>
      <Stack.Screen name="Profile" component={ProfileScreen} options/>
      <Stack.Screen name="EditName" component={EditNameScreen} options/>
      <Stack.Screen name="EditEmail" component={EditEmailScreen} options/>
      <Stack.Screen name="EditPassword" component={ChangePasswordScreen} options/>







    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;