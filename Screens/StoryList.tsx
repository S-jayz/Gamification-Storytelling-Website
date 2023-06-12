import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StoryList = () => {
  const [stories, setStories] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = () => {
    const db = SQLite.openDatabase(
      {
        name: 'mydatabase.db',
        location: 'default',
      },
      () => {
        db.transaction(tx => {
          tx.executeSql('SELECT * FROM stories;', [], (tx, results) => {
            const len = results.rows.length;
            const stories = [];
            for (let i = 0; i < len; i++) {
              stories.push(results.rows.item(i));
            }
            setStories(stories);
          });
        });
      },
      error => {
        console.log(error);
      }
    );
  };

  const handleWritePress = () => {
    navigation.navigate('WriteStory');
  };

  return (
    <View style={styles.container}>
      {stories.length > 0 ? (
        <Text style={styles.title}>Your Stories</Text>
      ) : (
        <Text style={styles.title}>No Stories Found</Text>
      )}
      <TouchableOpacity onPress={handleWritePress} style={styles.addButton}>
        <Icon name="plus" size={20} color="#000" />
      </TouchableOpacity>
      {/* Render the list of stories */}
      {stories.map(story => (
        <View key={story.id} style={styles.storyContainer}>
          <Text style={styles.storyTitle}>{story.title}</Text>
          <Text style={styles.storyText}>{story.story}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  addButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 8,
  },
  storyContainer: {
    marginBottom: 16,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  storyText: {
    fontSize: 16,
  },
});

export default StoryList;
