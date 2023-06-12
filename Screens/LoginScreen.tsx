import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import SQLite from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';

const db = SQLite.openDatabase(
  {
    name: 'mydatabase.db',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  }
);

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        (_, { rows }) => {
          if (rows.length > 0) {
            // User is authenticated
            navigation.navigate('Home', { isLoggedIn: true, username: rows.item(0).username });
          } else {
            Alert.alert('Error', 'Invalid email or password');
          }
        }
      );
    });
  };

  const handleCreateAccount = () => {
    navigation.navigate('CreateAccount');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Create Account" onPress={handleCreateAccount} />
      <Button title="Forgot Password?" onPress={handleForgotPassword} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default LoginScreen;
