import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Input, Button } from 'react-native-elements';
import SQLite from 'react-native-sqlite-storage';

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

const ForgotPasswordScreen = ({ navigation }) => {
  const [usernameEmail, setUsernameEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    // Validate username/email and new password
    if (!validateUsernameEmail(usernameEmail)) {
      Alert.alert('Error', 'Invalid username/email format');
      return;
    }

    if (!validatePassword(newPassword)) {
      Alert.alert(
        'Error',
        'Invalid password format. Password must be at least 3 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM users WHERE username = ? OR email = ?',
        [usernameEmail, usernameEmail],
        (_, { rows }) => {
          if (rows.length === 0) {
            Alert.alert('Error', 'Invalid username/email');
          } else {
            const userId = rows.item(0).id;
            tx.executeSql(
              'UPDATE users SET password = ? WHERE id = ?',
              [newPassword, userId],
              () => {
                Alert.alert('Success', 'Password reset successfully');
                navigation.navigate('Login');
              }
            );
          }
        }
      );
    });
  };

  // Username/Email validation function
  const validateUsernameEmail = (input) => {
    // You can customize the validation rules based on your requirements
    const usernameEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return usernameEmailRegex.test(input);
  };

  // Password validation function
  const validatePassword = (password) => {
    // You can customize the validation rules based on your requirements
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{3,}$/;
    return passwordRegex.test(password);
  };

  return (
    <View style={styles.screen}>
      <Input
        style={styles.text}
        placeholder="Username or Email"
        value={usernameEmail}
        onChangeText={setUsernameEmail}
        autoCapitalize="none"
        containerStyle={styles.inputContainer}
      />
      <Input
        style={styles.text}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        containerStyle={styles.inputContainer}
      />
      <Input
        style={styles.text}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        containerStyle={styles.inputContainer}
      />
      <Button title="Reset Password" onPress={handleResetPassword} />
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

export default ForgotPasswordScreen;

