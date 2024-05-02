/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Menu, Text} from 'react-native-paper';
import {styles} from '../styles/HomeStyles';
import FileListHeading from './FileListHeading';
import FolderContainer from './FolderContainer';
import {convertArray} from '../mock/mockData';
import {sortChildren, sortDataByDate} from '../components/SortFunctions';

const Home = ({navigation}) => {
  const [fileContents, setFileContents] = useState(convertArray());
  const [sortOption, setSortOption] = useState('Select to sort');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSortOptionChange = option => {
    setSortOption(option);
    setIsExpanded(!isExpanded);
    const data = sortChildren(fileContents, option);
    const timebasedData = sortDataByDate(fileContents, option);
    setFileContents(data);
    setFileContents(timebasedData);

    console.log(
      'data after title wise sorting===>',
      JSON.stringify(timebasedData),
    );
  };

  return (
    <ScrollView style={styles.scrollView}>
      <FileListHeading />
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
      <View style={styles.container}>
        {fileContents.flatMap((details, i) => (
          <FolderContainer
            key={i}
            fileContents={fileContents}
            details={details}
            navigation={navigation}
            sortOption={sortOption}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;
