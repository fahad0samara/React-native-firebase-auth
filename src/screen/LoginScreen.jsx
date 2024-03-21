import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword, getErrorText } from '../utils/utils';
import { styles } from '../styles/styles'; 


const LoginScreen = ({ navigation }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');
    setLoading(true);
    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      setTimeout(() => setEmailError(''), 3000); 
      setLoading(false);
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long');
      setTimeout(() => setPasswordError(''), 3000); 
      setLoading(false);
      return;
    }

    try {
      await signIn(email, password);
    } catch (error) {
      const errorMessage = getErrorText(error.code);
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <Button title="Login" onPress={handleLogin}
      color={'#000'}



       disabled={loading} />

      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.loginText}>
          Don't have an account? Register
        </Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#4CAF50" />}
    </View>
  );
};



export default LoginScreen;
