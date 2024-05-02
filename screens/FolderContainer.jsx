/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../styles/FileContainerStyles';

const FolderContainer = ({
  fileContents,
  details,
  navigation,
  currentPath = ['Home'],
}) => {
  const [noChildrenMessage, setNoChildrenMessage] = useState('');
  const [lastPressTime, setLastPressTime] = useState(0);
  const DOUBLE_CLICK_DELAY = 200;

  const handlePress = () => {
    const currentTime = Date.now();
    if (currentTime - lastPressTime < DOUBLE_CLICK_DELAY) {
      handleDoubleClick();
    }
    setLastPressTime(currentTime);
  };

  const handleDoubleClick = () => {
    let newPath = [];
    if (details.children && details.children.length > 0) {
      if (!currentPath.includes(details.title)) {
        newPath = [...currentPath, details.title];
      } else {
        newPath = [...currentPath];
      }
      navigation.navigate('File', {
        fileContents,
        folderId: details.file_id,
        path: newPath,
      });
    } else {
      setNoChildrenMessage('No child contents found');
    }
  };

  const convertDate = dateString => {
    const date = new Date(dateString);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedDate = `${day}-${month}-${year}`;
    const formattedTime = `${hours}:${minutes}`;

    return `${formattedDate} ${formattedTime}`;
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
          <Text variant="labelSmall" style={styles.textContent}>
            {convertDate(details.created_on)}
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
