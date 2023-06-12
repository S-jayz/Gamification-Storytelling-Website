/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

const SearchBar = ({
  term,
  onTermChange,
  onTermSubmit,
}: {
  term: string;
  onTermChange: (term: string) => void;
  onTermSubmit: () => void;
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.inputStyle}
        placeholder="Search..."
        placeholderTextColor="black"
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  // backgroundColor: 'white',
  paddingHorizontal: 10,
},
  inputStyle: {
    fontSize: 18,
    flex: 3,
    marginLeft: 10,
    paddingHorizontal: 10,
  },
});

export default SearchBar;
