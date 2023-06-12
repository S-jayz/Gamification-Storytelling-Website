/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  ScrollView,
  Modal,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/Ionicons';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface MenuProps {
  onPress: () => void;
}

const Menu = ({}: MenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuAnimation = useRef(new Animated.Value(-0.4 * screenWidth)).current;

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const handleBackdropPress = () => {
    if (isOpen) {
      handleCloseMenu();
    }
  };

  useEffect(() => {
    Animated.timing(menuAnimation, {
      toValue: isOpen ? 0 : -0.4 * screenWidth,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen, menuAnimation]);

  return (
    <>
      <TouchableOpacity style={styles.button} onPress={handleToggleMenu}>
        <View style={styles.buttonIconContainer}>
          <MaterialIcons name="menu" size={30} color="white" />
        </View>
      </TouchableOpacity>
      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={handleCloseMenu}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={handleBackdropPress}
        >
          <Animated.View
            style={[
              styles.menu,
              {
                transform: [{ translateX: menuAnimation }],
                width: screenWidth * 0.4,
              },
            ]}
          >
            <ScrollView>
            <TouchableOpacity style={styles.menuItem}>
                <Text style={styles.textColor}>Home</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Text>Bookmark</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Text>Write!</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Text>Surprise me!</Text>
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  menu: {
    position: 'absolute',
    top: 40,
    left: 0,
    bottom: 0,
    backgroundColor: 'grey',
    paddingTop: 50,
  },
  menuItem: {
    padding: 10,
  },
  textColor: {
    color: '#FF0000',
  },
});

export default Menu;
