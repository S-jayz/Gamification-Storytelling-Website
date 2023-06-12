import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const TrashPage = () => {
  const [trashedStories, setTrashedStories] = useState([]);

  useEffect(() => {
    fetchTrashedStories();
  }, []);

  const fetchTrashedStories = () => {
    const db = SQLite.openDatabase(
      {
        name: 'mydatabase.db',
        location: 'default',
      },
      () => {
        db.transaction(tx => {
          tx.executeSql(
            'SELECT * FROM stories WHERE is_trashed = 1;',
            [],
            (tx, results) => {
              const len = results.rows.length;
              const trashedStories = [];
              for (let i = 0; i < len; i++) {
                trashedStories.push(results.rows.item(i));
              }
              setTrashedStories(trashedStories);
            }
          );
        });
      },
      error => {
        console.log(error);
      }
    );
  };

  const handleRestoreStory = storyId => {
    const db = SQLite.openDatabase(
      {
        name: 'mydatabase.db',
        location: 'default',
      },
      () => {
        db.transaction(tx => {
          tx.executeSql(
            'UPDATE stories SET is_trashed = 0 WHERE id = ?;',
            [storyId],
            (tx, results) => {
              if (results.rowsAffected > 0) {
                console.log('Story restored successfully!');
                fetchTrashedStories();
              } else {
                console.log('Failed to restore the story.');
              }
            }
          );
        });
      },
      error => {
        console.log(error);
      }
    );
  };

  const handleDeleteStory = storyId => {
    const db = SQLite.openDatabase(
      {
        name: 'mydatabase.db',
        location: 'default',
      },
      () => {
        db.transaction(tx => {
          tx.executeSql(
            'DELETE FROM stories WHERE id = ?;',
            [storyId],
            (tx, results) => {
              if (results.rowsAffected > 0) {
                console.log('Story deleted successfully!');
                fetchTrashedStories();
              } else {
                console.log('Failed to delete the story.');
              }
            }
          );
        });
      },
      error => {
        console.log(error);
      }
    );
  };

  return (
    <View style={styles.container}>
      {trashedStories.length > 0 ? (
        <>
          <Text style={styles.title}>Trashed Stories</Text>
          {trashedStories.map(story => (
            <View key={story.id} style={styles.storyContainer}>
              <Text style={styles.storyTitle}>{story.title}</Text>
              <Text style={styles.storyText}>{story.story}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity
                  onPress={() => handleRestoreStory(story.id)}
                  style={styles.restoreButton}
                >
                  <Text style={styles.buttonText}>Restore</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleDeleteStory(story.id)}
                  style={styles.deleteButton}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </>
      ) : (
        <Text style={styles.title}>No Trashed Stories Found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  storyContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    marginBottom: 16,
  },
  storyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  storyText: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  restoreButton: {
    backgroundColor: '#2ecc71',
    padding: 8,
    marginRight: 8,
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TrashPage;
