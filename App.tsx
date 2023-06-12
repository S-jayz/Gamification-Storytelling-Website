import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SQLite from 'react-native-sqlite-storage';
import LoginScreen from './Screens/LoginScreen';
import Homescreen from './Screens/HomeScreen';
import CreateAccount from './Screens/CreateAccount';
import ForgotPasswordScreen from './Screens/ForgotPasswordScreen';
import ProfileScreen from './Screens/ProfileScreen';
import UserAccountSettings from './Screens/UserAccountSettings';
import UserProfile from './Screens/UserProfile';
import WriteStory from './Screens/WriteStory';
import StoryList from './Screens/StoryList';
import TrashPage from './Screens/TrashPage';

const Stack = createStackNavigator();

const App = () => {
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
        db.transaction(tx => {
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT, username TEXT);'
          );
          tx.executeSql(
            'CREATE TABLE IF NOT EXISTS stories (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, story TEXT);'
          );
        });
      },
      error => {
        console.log(error);
      }
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          component={Homescreen}
          initialParams={{ isLoggedIn: false, username: '' }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen
          name="UserAccountSettings"
          component={UserAccountSettings}
          initialParams={{ isLoggedIn: false, username: '' }}
        />
        <Stack.Screen name="WriteStory" component={WriteStory} />
        <Stack.Screen name="StoryList" component={StoryList} />
        <Stack.Screen name="TrashPage" component={TrashPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
