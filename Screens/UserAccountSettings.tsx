import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';




const UserAccountSettings = ({ route }) => {
  const [userProfileBackground, setUserProfileBackground] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [aboutMe, setAboutMe] = useState('');
  const navigation = useNavigation();

  const handleSelectImage = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets) {
        setUserProfileBackground(response.assets[0].uri);
      }
    });
  };

  const handleSaveChanges = () => {
    navigation.reset({
      index: 0,
      routes: [
        { name: 'Home', params: { isLoggedIn: true, username: route.params?.username } }
      ]
    });
  };
  

  
  
  
  
  //   navigation.reset({
  //     index: 0,
  //     routes: [{ name: 'Home' }],
  //   });
  // };
  
  
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSelectImage}>
        {userProfileBackground ? (
          <Image source={{ uri: userProfileBackground }} style={styles.userProfileBackground} />
        ) : (
          <View style={[styles.userProfileBackground, { backgroundColor: 'grey' }]}></View>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Change Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Change Email Address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="About Me"
        value={aboutMe}
        onChangeText={setAboutMe}
        multiline={true}
      />
      <Button title="Save Changes" onPress={handleSaveChanges} />
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

export default UserAccountSettings;
