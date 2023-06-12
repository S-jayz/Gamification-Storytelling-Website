import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const ProfileScreen = ({ db }) => {
  const [userProfileBackground, setUserProfileBackground] = useState('');
  const [userProfilePicture, setUserProfilePicture] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [aboutMe, setAboutMe] = useState('');

  const handleSave = () => {
    // Save the changes to the user profile

    // You can perform API requests or database operations here to update the user profile

    // For example, you can save the changes using the SQLite database
    // Make sure you have the necessary database setup and imports

    db.transaction(tx => {
      tx.executeSql(
        'UPDATE users SET username = ?, email = ?, about_me = ? WHERE id = ?',
        [username, email, aboutMe, userId], // Replace `userId` with the actual user ID
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            // Changes saved successfully
            console.log('Profile updated');
          } else {
            // Error saving changes
            console.log('Failed to update profile');
          }
        },
      );
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileBackground} />
      <View style={styles.profilePicture} />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="About Me"
        value={aboutMe}
        onChangeText={setAboutMe}
        multiline
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  profileBackground: {
    width: 200,
    height: 200,
    backgroundColor: 'gray',
    marginBottom: 20,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'gray',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default ProfileScreen;
