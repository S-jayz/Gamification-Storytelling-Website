/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, Switch} from 'react-native';

interface Props {
  onToggleDarkMode: (value: boolean) => void;
}

const DarkMode = ({onToggleDarkMode}: Props) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    onToggleDarkMode(!isDarkMode);
  };

  return (
    <Switch
      style={styles.switch}
      value={isDarkMode}
      onValueChange={handleToggleDarkMode}
    />
  );
};

const styles = StyleSheet.create({
  switch: {
    margin: 10,
  },
});

export default DarkMode;
