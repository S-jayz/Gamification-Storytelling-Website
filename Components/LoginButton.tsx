/* eslint-disable prettier/prettier */
import React from 'react';
import {Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LoginButton = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  return <Button title="Login" onPress={handleLoginPress} />;
};

export default LoginButton;
