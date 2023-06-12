import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Image, Modal, TouchableWithoutFeedback, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {ProgressBar} from '@react-native-community/progress-bar-android';
import {ProgressView} from "@react-native-community/progress-view";

const UserAvatar = ({ onPress, progress }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigation = useNavigation();

  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleProfilePress = () => {
    setIsDropdownVisible(false);
    navigation.navigate('UserProfile');
  };

  const handleAccountSettingsPress = () => {
    setIsDropdownVisible(false);
    navigation.navigate('UserAccountSettings');
  };

  const handleLogoutPress = () => {
    setIsDropdownVisible(false);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home', params: { isLoggedIn: false, username: '' } }],
    });
  };

  const handleModalClose = () => {
    setIsDropdownVisible(false);
  };

  const renderProgressBar = () => {
    if (progress >= 0 && progress <= 1) {
      return (
        <View style={styles.progressBarContainer}>
          {Platform.OS === 'ios' ? (
            <ProgressView
              style={styles.progressBar}
              progress={progress}
              progressTintColor="#00FF00"
            />
          ) : (
            <ProgressBar
              styleAttr="Horizontal"
              indeterminate={false}
              progress={progress}
              color="#00FF00"
            />
          )}
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.avatarContainer}>
      <TouchableOpacity style={styles.avatarIconContainer} onPress={handleDropdownToggle}>
        <View style={styles.avatarIcon}></View>
        {renderProgressBar()}
      </TouchableOpacity>
      <Modal visible={isDropdownVisible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={styles.modalBackground}>
            <View style={styles.dropdownContainer}>
              <TouchableOpacity style={styles.dropdownItem} onPress={handleProfilePress}>
                <Text style={styles.dropdownItemText}>Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={handleAccountSettingsPress}>
                <Text style={styles.dropdownItemText}>Account Settings</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.dropdownItem} onPress={handleLogoutPress}>
                <Text style={[styles.dropdownItemText, styles.logoutText]}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarIconContainer: {
    marginRight: 10,
  },
  avatarIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#bbb',
  },
  progressBarContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  dropdownItem: {
    paddingVertical: 8,
  },
  dropdownItemText: {
    fontSize: 16,
  },
  logoutText: {
    color: 'red',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
});

export default UserAvatar;
