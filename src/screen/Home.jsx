import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, signOutUser } = useAuth();

  const handleLogout = async () => {
    await signOutUser();
  };

  return (
    <View style={styles.container}>
      {user ? (
        <Text style={styles.welcomeText}>Welcome, {user.email}</Text>
      ) : (
        <Text style={styles.welcomeText}>Welcome</Text>
      )}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Home;
