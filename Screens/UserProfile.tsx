import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image } from 'react-native';

const UserProfile = ({ route }) => {
  const userProfileBackground = route.params?.userProfileBackground || null;
  const aboutMe = route.params?.aboutMe || '';

  return (
    <View style={styles.container}>
      {userProfileBackground ? (
        <Image source={{ uri: userProfileBackground }} style={styles.userProfileBackground} />
      ) : (
        <View style={[styles.userProfileBackground, { backgroundColor: 'grey' }]}></View>
      )}
      <TextInput style={styles.input} placeholder="About Me" value={aboutMe} editable={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userProfileBackground: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default UserProfile;
