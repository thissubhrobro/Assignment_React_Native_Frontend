/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import {ScrollView, View} from 'react-native';
import {inputArray as inputValue} from '../mock/mockData';
import {styles} from '../styles/HomeStyles';
import FileListHeading from './FileListHeading';
import FolderContainer from './FolderContainer';

const Home = ({navigation}) => {
  function convertArray(inputArray) {
    // Create an object to store files by their parent_id
    const filesByParent = {};

    // Group files by their parent_id
    inputArray.forEach(file => {
      if (!filesByParent[file.parent_id]) {
        filesByParent[file.parent_id] = [];
      }
      filesByParent[file.parent_id].push(file);
    });

    // Function to recursively build the tree structure
    function buildTree(parentId) {
      if (!filesByParent[parentId]) {
        return [];
      }

      return filesByParent[parentId].map(file => {
        const children = buildTree(file.file_id);
        if (children.length > 0) {
          file.children = children;
        }
        return file;
      });
    }

    // Start building the tree from parent_id = 0
    return buildTree(0);
  }

  const generatedArray = convertArray(inputValue);
  // console.log('generated array', JSON.stringify(generatedArray));
  return (
    <ScrollView style={styles.scrollView}>
      <FileListHeading />
      <View style={styles.container}>
        {generatedArray.flatMap((details, i) => (
          <FolderContainer key={i} details={details} navigation={navigation} />
        ))}
      </View>
    </ScrollView>
  );
};

export default Home;
