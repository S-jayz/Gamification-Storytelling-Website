/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import SQLite from 'react-native-sqlite-storage';
// import { generateAuthenticationCode } from '../Components/utils';

const db = SQLite.openDatabase(
  {
    name: 'mydatabase.db',
    location: 'default',
  },
  () => {},
  error => {
    console.log(error);
  },
);

const CreateAccount = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');


  const handleCreateAccount = () => {
    // Validate email, password, and username
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Invalid email format');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert(
        'Error',
        'Invalid password format. Password must be at least 3 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      return;
    }

    if (!validateUsername(username)) {
      Alert.alert('Error', 'Invalid username format');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ?',
        [username],
        (_, { rows }) => {
          if (rows.length > 0) {
            Alert.alert('Error', 'This username is taken');
          } else {
            tx.executeSql(
              'INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
              [email, password, username],
              (_, { rowsAffected }) => {
                if (rowsAffected > 0) {
                  Alert.alert('Success', 'Account created successfully');
                  navigation.navigate('Login');
                } else {
                  Alert.alert('Error', 'Failed to create account');
                }
              }
            );
          }
        }
      );
    });
  };

  // Username validation function
  const validateUsername = (username) => {
    // Username format validation
    // You can customize the validation rules based on your requirements
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
  };

    // Email validation function
  const validateEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation function
  const validatePassword = (password) => {
    // Password format validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{3,}$/;
    return passwordRegex.test(password);
  };

  return (
    <View style={styles.screen}>
      <Input
        style={styles.text}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        containerStyle={styles.inputContainer}
      />
      <Input
        style={styles.text}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={styles.inputContainer}
      />
      <Input
        style={styles.text}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        containerStyle={styles.inputContainer}
      />

      <Button title="Create Account" onPress={handleCreateAccount} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default CreateAccount;
