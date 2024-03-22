import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { initializeApp } from '@firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';


// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBv2vc1-RGh6-htKHNRW-Gs65OeEd5B99s",
  authDomain: "addd-b4230.firebaseapp.com",
  projectId: "addd-b4230",
  storageBucket: "addd-b4230.appspot.com",
  messagingSenderId: "104987385269",
  appId: "1:104987385269:web:d059ba44e65d90b72e4dfc",
  measurementId: "G-9S6J3EV77B"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Unauthenticated screen
const AuthScreen = ({ email, setEmail, password, setPassword, isLogin, setIsLogin, handleAuthentication }) => {
  return (
    <View style={styles.authContainer}>
    
       <Text style={styles.title}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
       <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <View style={styles.buttonContainer}>
        
        <Button title={isLogin ? 'Sign In' : 'Sign Up'} onPress={handleAuthentication} color="#3498db" />
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.toggleText} onPress={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
        </Text>
      </View>
    </View>
  );
}


// Authenticated screen
const AuthenticatedScreen = ({ user, handleAuthentication }) => {
  return (
    <View style={styles.authContainer}>
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.emailText}>{user.email}</Text>
      <Button title="Logout" onPress={handleAuthentication} color="#e74c3c" />
    </View>
  );
};
export default Biginer = () => {
  const [email, setEmail] = useState('');// Track email input
  const [password, setPassword] = useState('');// Track password input
  const [user, setUser] = useState(null); // Track user authentication state
  const [isLogin, setIsLogin] = useState(true);// Track sign-in or sign-up mode

// Get the Auth service for the default app
  const auth = getAuth(app);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [auth]);

  // Handle user authentication
  const handleAuthentication = async () => {
    try {
      if (user) {
        // If user is already authenticated, log out
        console.log('User logged out successfully!');
        await signOut(auth);
      } else {
        // Sign in or sign up
        if (isLogin) {
        // Sign in
          await signInWithEmailAndPassword(auth, email, password);
          console.log('User signed in successfully!');
        } else {
          // Sign up
          await createUserWithEmailAndPassword(auth, email, password);
          console.log('User created successfully!');
        }
      }
    } catch (error) {
      // Handle errors
      console.error('Authentication error:', error.message);
    }
  };

  return (
    // Scroll view to handle keyboard
    <ScrollView contentContainerStyle={styles.container}>
      {user ? (
        // Show user's email if user is authenticated
        <AuthenticatedScreen user={user} handleAuthentication={handleAuthentication} />
      ) : (
        // Show sign-in or sign-up form if user is not authenticated
        <AuthScreen
          email={email}// Pass email input
          setEmail={setEmail}// Pass setEmail function
          password={password}// Pass password input
          setPassword={setPassword}// Pass setPassword
          isLogin={isLogin}// Pass isLogin state
          setIsLogin={setIsLogin}// Pass setIsLogin function
          handleAuthentication={handleAuthentication}// Pass handleAuthentication function
        />
      )}
    </ScrollView>
  );
}
// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#3498db', 
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: '#333', 
    fontWeight: 'bold', 
  },
  input: {
    height: 40,
    borderColor: '#ccc', 
    borderWidth: 1,
    marginBottom: 16,
    padding: 8,
    borderRadius: 4,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  toggleText: {
    color: '#3498db', 
    textAlign: 'center',
    textDecorationLine: 'underline', 
  },
  bottomContainer: {
    marginTop: 20,
  },
  emailText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
    fontWeight: 'bold',
  },
});
