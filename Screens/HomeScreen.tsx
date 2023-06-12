import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Menu from '../Components/Menu';
import TopNovels from '../Components/PopularNovels';
import SearchBar from '../Components/SearchBar';
import DarkMode from '../Components/DarkMode';
import LoginButton from '../Components/LoginButton';
import HomeButton from '../Components/HomeButton';
import UserAvatar from '../Components/UserAvatar';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import SQLite from 'react-native-sqlite-storage';

const HomeScreen = ({ route }) => {
  const navigation = useNavigation();
  const { isLoggedIn, username } = route.params;
  const [progress, setProgress] = useState(0.7);
  const [story, setStory] = useState('');

  const handleMenuPress = () => {
    // Handle menu button press
  };

  const handleWritePress = () => {
    navigation.navigate('WriteStory', { story });
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile');
  };

  const handleTrashPress = () => {
    navigation.navigate('TrashPage');
  };

  const handleStoryListPress = () => {
    navigation.navigate('StoryList');
  };

  const handleDeleteStory = (storyId) => {
    // Delete the story with the given storyId
    console.log('Delete story with ID:', storyId);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    createTable();
  }, []);

  const createTable = () => {
    const db = SQLite.openDatabase(
      {
        name: 'mydatabase.db',
        location: 'default',
      },
      () => {
        db.transaction((tx) => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS stories (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, story TEXT, is_trashed INTEGER DEFAULT 0);'
          );
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const containerStyle = [
    styles.container,
    isDarkMode && styles.containerDarkMode,
  ];

  const textStyle = [styles.text, isDarkMode && styles.textDarkMode];

  return (
    <View style={[styles.screen, isDarkMode && styles.screenDarkMode]}>
      <View style={containerStyle}>
        <Menu onPress={handleMenuPress} />
        <HomeButton />
        <SearchBar term="" onTermChange={() => {}} onTermSubmit={() => {}} />
        <DarkMode onToggleDarkMode={setIsDarkMode} />
        {isLoggedIn ? (
          <UserAvatar onPress={handleProfilePress} progress={progress} />
        ) : (
          <LoginButton />
        )}
        <TouchableOpacity onPress={handleTrashPress} style={styles.trashButton}>
          <Icon name="trash" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {isLoggedIn ? (
          <View style={styles.avatarContainer}>
            <Text style={styles.welcomeText}>
              Welcome {username}! Have fun reading!
            </Text>
          </View>
        ) : (
          <Text style={textStyle}>NovelSoul!</Text>
        )}
        <TopNovels />
        <TouchableOpacity onPress={handleWritePress} style={styles.writeButton}>
          <Text style={styles.writeButtonText}>Write</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleStoryListPress}
          style={styles.writeButton}
        >
          <Text style={styles.writeButtonText}>Story List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    backgroundColor: 'grey',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerDarkMode: {
    backgroundColor: '#333',
  },
  screenDarkMode: {
    backgroundColor: '#000',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  textDarkMode: {
    color: '#fff',
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  writeButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  writeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  trashButton: {
    padding: 8,
    borderRadius: 16,
    backgroundColor: 'red',
  },
});

export default HomeScreen;
