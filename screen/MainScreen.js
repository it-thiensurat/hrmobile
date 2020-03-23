import React from 'react'
import {
    View,
    Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor
} from '../utils/contants'
import styles from '../style/style'

import Checkin from './tabs/CheckinScreen'

const Tab = createMaterialBottomTabNavigator();
export default function MainTab() {
    return (
        <Tab.Navigator
            initialRouteName="Checkin"
            inactiveColor={darkColor}
            activeColor={secondaryColor}
            barStyle={{ backgroundColor: primaryColor }}>
            <Tab.Screen
                name="Checkin"
                component={Checkin}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <View style={[ styles.bottomTab ]}>
                            <Icon name="user" color={color} size={20} />
                            <Text style={[{ color: color, fontSize: 18 }]}>{`บันทึกเวลางาน`}</Text>
                        </View>
                    ),
                }} />
        </Tab.Navigator>
    )
}