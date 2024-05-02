/* eslint-disable react/react-in-jsx-scope */
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import File from './screens/File';
import Home from './screens/Home';

const {Navigator, Screen} = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Home" component={Home} options={{headerShown: false}} />
        <Screen name="File" component={File} options={{headerShown: false}} />
      </Navigator>
    </NavigationContainer>
  );
};

export default App;
