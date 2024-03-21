import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import SplashScreen from './src/screen/SplashScreen';

import LoginScreen from './src/screen/LoginScreen';
import RegisterScreen from './src/screen/RegisterScreen';
import Home from './src/screen/Home';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
    </NavigationContainer>
  );
};

const AppNavigation = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={SplashScreen} 
      options={{ headerShown: false }}
      />
      {user ? (
        <Stack.Screen name="Home" component={Home} />
      ) : (
        <>
  <Stack.Screen name="Login" component={LoginScreen}
        options={{ headerShown: false }}
   />
        <Stack.Screen name="Register" component={RegisterScreen}
        options={{ headerShown: false }}
         />
        </>

      




      )}
    </Stack.Navigator>
  );
};

export default App;
