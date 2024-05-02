/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
    backgroundColor: '#F2F3F4',
    borderRadius: 8,
    width: '100%',
  },
  textContent: {
    marginTop: 5,
    width: 100,
    overflow: 'hidden',
  },
  image: {
    width: 30, // Width of the image
    height: 30, // Height of the image
    marginBottom: 5,
  },
  nestedContainer: {
    marginLeft: 20,
  },
  noChildrenText: {
    fontSize: 14,
    color: '#888',
    paddingVertical: 5,
  },
});
