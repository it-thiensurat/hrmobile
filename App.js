/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  View,
  Platform,
  YellowBox,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
console.disableYellowBox = true
import { connect } from 'react-redux'
import Orientation from 'react-native-orientation-locker'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import styles from './style/style'

import {
  secondaryColor
} from './utils/contants'

import {
  setCustomView,
  setCustomTextInput,
  setCustomText,
  setCustomImage,
  setCustomTouchableOpacity,
} from 'react-native-global-props'

const customTextProps = {
  style: {
    fontSize: 22,
    fontFamily: Platform.OS == 'android' ? 'DBYord' : 'DB Yord X',
  }
};

setCustomTextInput(customTextProps);
setCustomText(customTextProps);

const Stack = createStackNavigator();

import Main from './screen/MainScreen'
import Login from './screen/LoginScreen'

function MyStack() {
  return (
    <Stack.Navigator
      headerMode='none'
      initialRouteName='Login'>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={Main} />
    </Stack.Navigator>
  );
}

require('moment/locale/th.js');
class App extends React.Component {

  componentDidMount() {
    Orientation.lockToPortrait();
  }

  render() {
    return (
      <NavigationContainer>
        <MyStack />
        {
          this.props.reducer.indicator ?
            <View style={[styles.loadingIndicator]}>
              <ActivityIndicator size='large' color={secondaryColor} />
            </View>
            :
            null
        }
      </NavigationContainer>
    )
  }
};

const mapStateToProps = (state) => ({
  reducer: state.fetchReducer
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(App)