import React from 'react'
import {
    View,
    Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor,
    transparentGray
} from '../utils/contants'
import styles from '../style/style'

import Checkin from './tabs/CheckinScreen'
import Menu from './tabs/MenuScreen'
import Profile from './tabs/ProfileScreen'

const Tab = createBottomTabNavigator();
export default function MainTab() {
    return (
        <Tab.Navigator
            initialRouteName="Checkin"
            tabBarOptions={{
                activeTintColor: primaryColor,
                inactiveTintColor: 'gray'
            }}
            style={{ backgroundColor: 'white' }}>
            <Tab.Screen
                name="Menu"
                component={Menu}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <View style={[styles.bottomTab]}>
                            <Icon name="bars" color={color} size={25} />
                        </View> 
                    ),
                }} />
            <Tab.Screen
                name="Checkin"
                component={Checkin}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <View style={[styles.bottomTabCircle, styles.center ]}>
                            <View style={[styles.bottomTabCenter, styles.center]}>
                                <Icon name="map-marker" color={color} size={58} />
                            </View>
                        </View>
                    ),
                }} />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <View style={[styles.bottomTab]}>
                            <Icon name="user" color={color} size={25} />
                        </View>
                    ),
                }} />
        </Tab.Navigator>
    )
}