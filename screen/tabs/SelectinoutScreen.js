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
import VersionCheck from 'react-native-version-check';

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
    TIMESTAMP,
    CHECK_OUT
} from '../../utils/contants'

import {
    CheckTypeControll,
    indicatorControll
} from '../../actions'

import styles from '../../style/style'

import Helper from '../../utils/Helper'
import StorageService from '../../utils/StorageServies'

class SelectinoutScreen extends React.Component {

    state = {
        latitude: '',
        longitude: '',
        checkInTime: '',
        checkOutTime: '',
        checkTime: 600000,
        currentTime: new Date(),
        check: false,
        appState: AppState.currentState
    }

    onUpdate(url) {
        Linking.openURL(url);
    }

    checkVersion = async () => {
        let current = await VersionCheck.getCurrentVersion();
        if (Platform.OS == 'android') {
            await VersionCheck.getLatestVersion({
                provider: 'playStore'
            }).then(latestVersion => {
                if (latestVersion > current) {
                    Alert.alert(
                        `คำเตือน`,
                        `แอพฯ ของคุณเก่าเกินไป กรุณาอัพเดท`,
                        [
                            {
                                text: 'ไม่, ขอบคุณ',
                                onPress: () => { RNExitApp.exitApp() },
                                style: 'cancel',
                            },
                            {
                                text: 'อัพเดท', onPress: () => {
                                    this.onUpdate('https://play.google.com/store/apps/details?id=com.hrmobile');
                                }
                            },
                        ],
                        { cancelable: false },
                    );
                }
            });
        } else {
            await VersionCheck.getLatestVersion({
                provider: 'appStore'
            }).then(latestVersion => {
                if (latestVersion > current) {
                    Alert.alert(
                        `คำเตือน`,
                        `แอพฯ ของคุณเก่าเกินไป กรุณาอัพเดท`,
                        [
                            {
                                text: 'ไม่, ขอบคุณ',
                                onPress: () => { RNExitApp.exitApp() },
                                style: 'cancel',
                            },
                            {
                                text: 'อัพเดท', onPress: () => {
                                    this.onUpdate('https://itunes.apple.com/');
                                }
                            },
                        ],
                        { cancelable: false },
                    );
                }
            });
        }
    }

    checkLocationEnable() {
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({ interval: 10000, fastInterval: 5000 })
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

    checkInDate() {
        let that = this
        try {
            StorageService.get(CHECK_TIME).then(obj => {
                if (obj !== null) {
                    let date = (JSON.parse(obj))
                    let now = moment(new Date()).format('L')
                    let chkIn = moment(date).format('LT')
                    // alert(JSON.stringify(test))
                    // return
                    if (date < now) {
                        // console.log('Check date < : true')
                        StorageService.remove(CHECK_TIME)
                    } else {
                        that.setState({ checkInTime: chkIn })
                        // console.log('Check date < : false')
                    }
                } else {
                    null
                }
            }).catch(function (error) {

            });
        } catch (error) {

        }
    }

    checkOutDate() {
        let that = this
        try {
            StorageService.get(CHECK_OUT).then(obj => {
                if (obj !== null) {
                    let date = (JSON.parse(obj))
                    let now = moment(new Date()).format('L')
                    let chkOut = moment(date).format('LT')
                    // alert(JSON.stringify(test))
                    // return
                    if (date < now) {
                        // console.log('Check date < : true')
                        StorageService.remove(CHECK_OUT)
                    } else {
                        that.setState({ checkOutTime: chkOut })
                        // console.log('Check date < : false')
                    }
                } else {
                    null
                }
            }).catch(function (error) {

            });
        } catch (error) {

        }
    }

    ComponentLeft = () => {
        return (
            <View>

            </View>
        );
    }

    ComponentCenter = () => {
        const props = this.props.reducer
        return (
            <View style={[styles.center]}>
                <Text style={[styles.bold, { color: 'white', fontSize: 26 }]}>{`ลงเวลาเข้า/ออกงาน`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View>

            </View>
        );
    }

    handleBack = () => {
        return true
    }

    componentWillUpdate() {
        this.props.navigation.addListener('focus', () => {
            this.checkInDate()
            this.checkOutDate()
        })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack)
    }

    async componentDidMount() {
        await this.checkVersion();
        if (Platform.OS == 'android') {
            this.checkLocationEnable()
        } else {
            this.requestLocationPermission()
        }
        this.checkInDate()
        this.checkOutDate()

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
                        backgroundColor: primaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }}
                    statusBarStyle={{
                        backgroundColor: secondaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }} />
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={[styles.cruveContainer]}>
                        <View style={[styles.cruveView, { backgroundColor: primaryColor }]} />
                    </View>
                    <View style={[styles.imageContainer, { borderColor: 'white' }]}>
                        <Icon name="user" color={primaryColor} size={60} />
                    </View>
                    <Text style={[styles.bold, { fontSize: 30, color: primaryColor, width: '100%', textAlign: 'center' }]}>{`${props.userInfo.title}${props.userInfo.firstname} ${props.userInfo.lastname}`}</Text>
                    <Text style={{ fontSize: 24, color: primaryColor, width: '100%', textAlign: 'center' }}>{`${props.userInfo.position}`}</Text>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View>
                            <Text style={{ fontSize: 20, color: secondaryColor, width: '100%', textAlign: 'center' }}>
                                {`${(this.state.checkInTime) ? 'เวลาเข้างานที่บันทึก' : ''}`}
                            </Text>
                            <Text style={{ fontSize: 22, color: secondaryColor, width: '100%', textAlign: 'center', marginBottom: 15 }}>
                                {`${(this.state.checkInTime) ? this.state.checkInTime : ' '}`}
                            </Text>
                            <TouchableOpacity style={[styles.buttonCheckSmall, styles.shadow, styles.center, { backgroundColor: 'white' }]}
                                onPress={
                                    () => {
                                        this.props.navigation.navigate('CheckIn')
                                    }
                                }>
                                <Text style={{ fontSize: 26, color: secondaryColor }}>{`CHECK IN`}</Text>
                                <Text style={{ fontSize: 24, color: secondaryColor }}>{`ลงเวลาเข้างาน`}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: 20 }} />
                        <View>
                            <Text style={{ fontSize: 20, color: darkColor, width: '100%', textAlign: 'center' }}>
                                {`${(this.state.checkOutTime) ? 'เวลาออกงานที่บันทึก' : ''}`}
                            </Text>
                            <Text style={{ fontSize: 22, color: darkColor, width: '100%', textAlign: 'center', marginBottom: 15 }}>
                                {`${(this.state.checkOutTime) ? this.state.checkOutTime : ' '}`}
                            </Text>
                            <TouchableOpacity style={[styles.buttonCheckSmall, styles.shadow, styles.center, { backgroundColor: 'white' }]}
                                onPress={
                                    () => {
                                        this.props.navigation.navigate('CheckOut')
                                    }
                                }>
                                <Text style={{ fontSize: 26, color: darkColor }}>{`CHECK OUT`}</Text>
                                <Text style={{ fontSize: 24, color: darkColor }}>{`ลงเวลาออกงาน`}</Text>
                            </TouchableOpacity>
                        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SelectinoutScreen)