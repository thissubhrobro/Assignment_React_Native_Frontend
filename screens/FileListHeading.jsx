/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, StyleSheet} from 'react-native';

const FileListHeading = () => {
  return <Text style={styles.heading}>Files and Folders</Text>;
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: '2%',
    marginBottom: 10,
  },
});

export default FileListHeading;
