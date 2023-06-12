import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';

const WriteStory = () => {
  const [title, setTitle] = useState('');
  const [story, setStory] = useState('');
  const navigation = useNavigation();

  const handleSaveStory = () => {
    if (title && story) {
      // Save the story to the database
      const db = SQLite.openDatabase(
        {
          name: 'mydatabase.db',
          location: 'default',
        },
        () => {
          db.transaction(tx => {
            tx.executeSql(
              'INSERT INTO stories (title, story) VALUES (?, ?);',
              [title, story],
              (tx, results) => {
                if (results.rowsAffected > 0) {
                  // Story saved successfully
                  console.log('Story saved successfully!');
                  navigation.navigate('StoryList'); // Navigate to the story list page
                } else {
                  // Failed to save the story
                  console.log('Failed to save the story.');
                }
              }
            );
          });
        },
        error => {
          console.log(error);
        }
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.titleInput}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.storyInput}
        placeholder="Enter your story"
        value={story}
        onChangeText={setStory}
        multiline
      />
      <Button title="Save" onPress={handleSaveStory} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titleInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  storyInput: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    paddingTop: 8,
  },
});

export default WriteStory;
