import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image } from 'react-native';

const novels = [
  { title: 'Dark', image: require('../Assets/dark.jpg') },
  { title: 'Frin', image: require('../Assets/frin.jpg') },
  { title: 'Helltaker', image: require('../Assets/Helltaker.jpg') },
  { title: 'Pokemon', image: require('../Assets/pokemon.jpg') },
];

const TopNovels = () => {
  return (
    <View style={styles.container}>
      <View style={styles.novelsContainer}>
        {novels.map((novel, index) => (
          <TouchableOpacity style={styles.novelItem} key={index}>
            <Image source={novel.image} style={styles.novelImage} />
            <Text style={styles.novelTitle}>{novel.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  novelsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: 10,
    position: 'relative',
    zIndex: 1, // Set a higher zIndex for the novels container
  },
  novelItem: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  novelImage: {
    flex: 1,
    resizeMode: 'cover',
    maxHeight: '100%',
  },
  novelTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
});

export default TopNovels;
