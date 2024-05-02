/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../styles/FileContainerStyles';

const FolderContainer = ({details, navigation, currentPath = ['Home']}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [noChildrenMessage, setNoChildrenMessage] = useState('');
  const [lastPressTime, setLastPressTime] = useState(0);
  const DOUBLE_CLICK_DELAY = 300;

  const handlePress = () => {
    const currentTime = Date.now();

    if (currentTime - lastPressTime < DOUBLE_CLICK_DELAY) {
      handleDoubleClick();
    }

    setLastPressTime(currentTime);
  };

  const handleDoubleClick = () => {
    setIsExpanded(!isExpanded);
    let newPath = [];
    if (details.children && details.children.length > 0) {
      if (!currentPath.includes(details.title)) {
        newPath = [...currentPath, details.title];
      } else {
        newPath = [...currentPath];
      }
      navigation.navigate('File', {folderId: details.file_id, path: newPath});
    } else {
      setNoChildrenMessage('No child contents found');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri:
                details.children && details.children.length > 0
                  ? 'https://www.iconpacks.net/icons/2/free-folder-icon-1437-thumb.png'
                  : 'https://www.iconpacks.net/icons/2/free-file-icon-1453-thumb.png',
            }}
          />
        </View>
        <View>
          <Text variant="labelSmall" style={styles.textContent}>
            Parent id {details.parent_id}
          </Text>
          <Text variant="labelSmall" style={styles.textContent}>
            {details.title}
          </Text>
        </View>
      </TouchableOpacity>

      {noChildrenMessage && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{noChildrenMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default FolderContainer;
