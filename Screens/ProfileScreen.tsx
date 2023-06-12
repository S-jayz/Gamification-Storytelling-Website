import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmarks</Text>
      {/* Add your desired content for the profile screen here */}
      {/* For example, you can add an image upload section, account details, etc. */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProfileScreen;
