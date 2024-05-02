/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import FolderContainer from './FolderContainer';
import {inputArray as mockData} from '../mock/mockData';
import Home from './Home';
import {styles} from '../styles/FileStyles';
import {sortChildren, sortDataByDate} from '../components/SortFunctions';
import {Menu} from 'react-native-paper';

const File = ({route, navigation}) => {
  const {fileContents, folderId, path} = route.params;
  const [childrenData, setChildrenData] = useState([]);
  const [sortOption, setSortOption] = useState('Select to sort');
  const [isExpanded, setIsExpanded] = useState(false);
  const [updatedContents, setUpdatedContents] = useState(fileContents);

  const handleSortOptionChange = option => {
    setSortOption(option);
    setIsExpanded(false);
    const data = sortChildren(childrenData, option);
    const timebasedData = sortDataByDate(childrenData, option);
    setUpdatedContents(data);
    setUpdatedContents(timebasedData);

    console.log(
      'data after title wise sorting===>',
      JSON.stringify(timebasedData),
    );
  };
  useEffect(() => {
    const fetchChildren = () => {
      const children = mockData.filter(item => item.parent_id === folderId);
      setChildrenData(children);
    };

    fetchChildren();
    handleSortOptionChange('title');
  }, [sortOption, folderId]);

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
      {childrenData.length > 0 && (
        <View style={styles.menuContainer}>
          <Menu
            visible={isExpanded}
            onDismiss={() => setIsExpanded(false)}
            anchor={
              <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                <Text style={styles.menuButtonText}>Sort By: {sortOption}</Text>
              </TouchableOpacity>
            }>
            <Menu.Item
              onPress={() => handleSortOptionChange('title')}
              title="Title"
            />
            <Menu.Item
              onPress={() => handleSortOptionChange('created_on')}
              title="Created On"
            />
          </Menu>
        </View>
      )}
      <View style={styles.container}>
        {childrenData.length > 0 ? (
          childrenData.map(child => (
            <FolderContainer
              fileContents={updatedContents}
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
