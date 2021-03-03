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
import CheckIn from './screen/CheckinScreen'
import CheckOut from './screen/CheckoutScreen'
import Leave from './screen/LeaveScreen'
import LeaveStatus from './screen/LeaveStatusScreen'
import Times from './screen/TimeScreen'
import ChangeTime from './screen/ChangeTimeScreen'
import ListConsider from './screen/ListConsiderScreen'
import Consider from './screen/ConsiderScreen'
import Webview from './screen/WebViewScreen'
import Commission from './screen/CommissionScreen'
import CommissionWebView from './screen/CommissionWebView'
import SaleCheck from './screen/SaleCheckScreen'
import SupApprove from './screen/SupApproveScreen'
import SalePayment from './screen/SalePaymentScreen'

function MyStack() {
  return (
    <Stack.Navigator
      headerMode='none'
      initialRouteName='Login'>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Main" component={Main} />
      <Stack.Screen name="CheckIn" component={CheckIn} />
      <Stack.Screen name="CheckOut" component={CheckOut} />
      <Stack.Screen name="Leave" component={Leave} />
      <Stack.Screen name="LeaveStatus" component={LeaveStatus} />
      <Stack.Screen name="Times" component={Times} />
      <Stack.Screen name="ChangeTime" component={ChangeTime} />
      <Stack.Screen name="ListConsider" component={ListConsider} />
      <Stack.Screen name="Consider" component={Consider} />
      <Stack.Screen name="Webview" component={Webview} />
      <Stack.Screen name="Commission" component={Commission} />
      <Stack.Screen name="CommissionWebView" component={CommissionWebView} />
      <Stack.Screen name="SaleCheck" component={SaleCheck} />
      <Stack.Screen name="SupApprove" component={SupApprove} />
      <Stack.Screen name="SalePayment" component={SalePayment} />
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