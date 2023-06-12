/* eslint-disable prettier/prettier */
import React from 'react';
import {Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const HomeButton = () => {
  const navigation = useNavigation();

  const handleHomePress = () => {
    navigation.navigate('Home');
  };

  return <Button title="Home" onPress={handleHomePress as () => void} />;
};

export default HomeButton;
