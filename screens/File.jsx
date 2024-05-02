/* eslint-disable prettier/prettier */
import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import FolderContainer from './FolderContainer';
import {inputArray as mockData} from '../mock/mockData';
import Home from './Home';
import {styles} from '../styles/FileStyles';

const File = ({route, navigation}) => {
  const {folderId, path} = route.params;
  const [childrenData, setChildrenData] = useState([]);
  useEffect(() => {
    const fetchChildren = () => {
      const children = mockData.filter(item => item.parent_id === folderId);
      setChildrenData(children);
    };

    fetchChildren();
  }, [folderId]);

  const handlePathClick = () => {
    if (path.length >= 1) {
      let lastFolder = [];
      const lastTitle = path[path.length - 2];
      if (lastTitle !== 'Home') {
        lastFolder = mockData.find(item => item.title === lastTitle);
      }
      console.log('path', path, lastTitle, lastFolder);
      if (lastFolder) {
        console.log('last folder', lastFolder, path.pop());
        navigation.navigate('File', {folderId: lastFolder.file_id, path});
      }
    }
  };

  return (
    <ScrollView style={styles.scrollView}>
      <TouchableOpacity onPress={handlePathClick} activeOpacity={0.7}>
        {path.length > 1 && (
          <Text style={styles.pathText}>{path.join(' > ')}</Text>
        )}
      </TouchableOpacity>
      <View style={styles.container}>
        {childrenData.length > 0 ? (
          childrenData.map(child => (
            <FolderContainer
              key={child.file_id}
              details={child}
              navigation={navigation}
              currentPath={path}
            />
          ))
        ) : (
          <Home navigation={navigation} />
        )}
      </View>
    </ScrollView>
  );
};

export default File;
