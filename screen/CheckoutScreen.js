import React from 'react'
import {
    View,
    Text,
    Image,
    Alert,
    Linking,
    AppState,
    Platform,
    BackHandler,
    TouchableOpacity,
    PermissionsAndroid
} from 'react-native'
var moment = require('moment')
import { connect } from 'react-redux'
import RNExitApp from 'react-native-exit-app'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import Geolocation from '@react-native-community/geolocation'
import RNAndroidLocationEnabler from 'react-native-android-location-enabler'

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor,
    darknessColor,
    API_KEY,
    BASEURL,
    CHECK_URL,
    CHECK_KEY,
    CHECK_TIME,
    TIMESTAMP
} from '../utils/contants'

import {
    CheckTypeControll,
    indicatorControll
} from '../actions'

import styles from '../style/style'

import Helper from '../utils/Helper'
import StorageService from '../utils/StorageServies'

class CheckoutScreen extends React.Component {

    state = {
        latitude: '',
        longitude: '',
        checkTime: 600000,
        currentTime: new Date(),
        check: false,
        appState: AppState.currentState
    }

    async onCheck() {
        await this.requestLocationPermission()

        let type = ''
        let that = this
        const props = that.props
        // type = !props.reducer.checkType ? 'I' : 'O'
        type = 'O'
        const { latitude, longitude, currentTime } = that.state
        let header = {
            'Authorization': props.reducer.token,
            'x-api-key': API_KEY
        }
        let formData = new FormData();
        formData.append('checkTime', moment(currentTime).format('L').split("/").reverse().join("-") + ' ' + moment(currentTime).format('LTS'));
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        formData.append('type', type);

        props.indicatorControll(true)
        await Helper.post(BASEURL + CHECK_URL, formData, header, async (results) => {
            if (results.status == 'SUCCESS') {
                await StorageService.set(CHECK_KEY, JSON.stringify(type))
                await StorageService.set(CHECK_TIME, JSON.stringify(moment(new Date()).format('L')))
                await props.CheckTypeControll(type == 'I' ? true : false)
                await props.indicatorControll(false)
                await that.setState({ check: true })
            } else {
                props.indicatorControll(false)
                alert(`${results.message}`)
            }
        })
    }

    checkLocationEnable() {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval: 10000, fastInterval: 5000})
            .then(data => {
                this.requestLocationPermission()
            }).catch(err => {
                RNExitApp.exitApp()
            });
    }

    async checkIOSLocationEnable() {
        const locationServicesAvailable = await ConnectivityManager.areLocationServicesEnabled()
        if (!locationServicesAvailable) {
            Alert.alert(
                'คำเตือน',
                'กรุณาให้แอพพลิเคชั่น TSR HR Mobile เข้าถึงการระบุตำแหน่ง',
                [
                    { text: 'Cancel', onPress: () => RNExitApp.exitApp(), style: 'cancel' },
                    { text: 'OK', onPress: () => Linking.openURL('app-settings:') },
                ],
                { cancelable: false }
            )
        }
    }

    async requestLocationPermission() {
        if (Platform.OS == 'ios') {
            this.watchID = Geolocation.watchPosition(position => {
                this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude })
            }, (error) => null,
                { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000, distanceFilter: 10 },
            );
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                    'title': 'Location Access Required',
                    'message': 'กรุณาให้แอพพลิเคชั่น TSR HR Mobile เข้าถึงการระบุตำแหน่ง'
                })

                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    this.watchID = Geolocation.watchPosition(position => {
                        this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude })
                    }, (error) => null,
                        { enableHighAccuracy: true, timeout: 2000, maximumAge: 1000, distanceFilter: 10 },
                    );

                    Geolocation.getCurrentPosition(position => {
                        this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude })
                    })
                } else {
                    Alert.alert(
                        'คำเตือน',
                        'กรุณาให้แอพพลิเคชั่น TSR HR Mobile เข้าถึงการระบุตำแหน่ง',
                        [
                            { text: 'Cancel', onPress: () => RNExitApp.exitApp(), style: 'cancel' },
                            { text: 'OK', onPress: () => PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) },
                        ],
                        { cancelable: false }
                    )
                }
            } catch (err) {
                Alert.alert(
                    'คำเตือน',
                    'กรุณาให้แอพพลิเคชั่น TSR HR Mobile เข้าถึงการระบุตำแหน่ง',
                    [
                        { text: 'Cancel', onPress: () => RNExitApp.exitApp(), style: 'cancel' },
                        { text: 'OK', onPress: () => PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) },
                    ],
                    { cancelable: false }
                )
            }
        }
    }

    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('IF: ' + nextAppState)
            StorageService.get(TIMESTAMP).then(obj => {
                if (obj !== null) {
                    let time = JSON.parse(obj)
                    this.setState({ checkTime: time, check: time > 0 ? true : false })
                }
            }).catch(function (error) {
                console.log(error);
            });
        } else {
            console.log('ELSE: ' + nextAppState)
            if (this.state.check) {
                StorageService.set(TIMESTAMP, JSON.stringify(this.state.checkTime))
            }
        }
        this.setState({ appState: nextAppState });
    }

    ComponentLeft = () => {
        return (
            <View>
                <TouchableOpacity onPress={() => this.handleBack()} style={{ paddingLeft: 10 }}>
                    <Icon name='chevron-left' size={22} color='white' />
                </TouchableOpacity>
            </View>
        );
    }

    ComponentCenter = () => {
        const props = this.props.reducer
        return (
            <View style={[styles.center]}>
                <Text style={[styles.bold, { color: 'white', fontSize: 26 }]}>{`CHECK OUT`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={{ paddingRight: 25 }}>

            </View>
        );
    }

    handleBack = () => {
        this.props.navigation.pop();
        return true
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange)
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack)
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                currentTime: new Date(),
                checkTime: this.state.check ? this.state.checkTime - 1 : 600000
            })
        }, 1000)

        setInterval(() => {
            this.setState({
                check: false
            })
        }, this.state.checkTime)

        if (Platform.OS == 'android') {
            this.checkLocationEnable()
        } else {
            this.requestLocationPermission()
        }
        
        AppState.addEventListener('change', this._handleAppStateChange)
        BackHandler.addEventListener('hardwareBackPress', this.handleBack)
    }

    render() {

        const props = this.props.reducer

        return (
            <View style={{ flex: 1 }}>
                <NavigationBar
                    componentLeft={this.ComponentLeft}
                    componentCenter={this.ComponentCenter}
                    componentRight={this.ComponentRight}
                    navigationBarStyle={{
                        backgroundColor: darkColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }}
                    statusBarStyle={{
                        backgroundColor: darknessColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }} />
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={[styles.cruveContainer]}>
                        <View style={[styles.cruveView, { backgroundColor: darkColor }]} />
                    </View>
                    <View style={[styles.imageContainer, { borderColor: 'white' }]}>
                        <Icon name="user" color={darkColor} size={60} />
                    </View>
                    <Text style={[styles.bold, { fontSize: 30, color: darkColor, width: '100%', textAlign: 'center' }]}>{`${props.userInfo.title}${props.userInfo.firstname} ${props.userInfo.lastname}`}</Text>
                    <Text style={{ fontSize: 24, color: darkColor, width: '100%', textAlign: 'center' }}>{`${props.userInfo.position}`}</Text>
                    <View style={[styles.center]}>
                        <TouchableOpacity style={[styles.buttonCheck, styles.shadow, styles.center, { backgroundColor: darkColor }]}
                            onPress={() => this.onCheck()
                            }>
                            <Text style={{ fontSize: 24, color: 'white' }}>{`CHECK OUT / ลงเวลาออกงาน`}</Text>
                            <View style={styles.marginBetweenVertical}></View>
                            <Text style={{ fontSize: 28, color: 'white' }}>{`${moment(new Date()).format('LL')}`}</Text>
                            <View style={styles.marginBetweenVertical}></View>
                            <Text style={{ fontSize: 75, color: 'white' }}>{`${moment(this.state.currentTime).format('LT')}`}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {
    CheckTypeControll,
    indicatorControll
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen)