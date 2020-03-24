import React from 'react'
import {
    View,
    Text,
    Image,
    Alert,
    BackHandler,
    TouchableOpacity,
    PermissionsAndroid
} from 'react-native'
var moment = require('moment');
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Geolocation from '@react-native-community/geolocation'

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor,
    darknessColor,
    API_KEY,
    BASEURL,
    CHECK_URL,
    CHECK_KEY
} from '../../utils/contants'

import {
    CheckTypeControll,
    indicatorControll
} from '../../actions'

import styles from '../../style/style'

import Helper from '../../utils/Helper'
import StorageService from '../../utils/StorageServies'

class CheckinScreen extends React.Component {

    state = {
        latitude: '13.123',
        longitude: '100.7895',
        currentTime: new Date(),
    }

    onCheck() {
        let type = ''
        let that = this
        const props = that.props
        type = !props.reducer.checkType ? 'I' : 'O'
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
        Helper.post(BASEURL + CHECK_URL, formData, header, (results) => {
            if (results.status == 'SUCCESS') {
                StorageService.set(CHECK_KEY, JSON.stringify(type))
                props.CheckTypeControll(type == 'I' ? true : false)
                props.indicatorControll(false)
            } else {
                props.indicatorControll(false)
                alert(`${results.message}`)
            }
        })
    }

    async requestLocationPermission() {
        try {
            const chckLocationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
                this.getCurrentLocation()
            } else {
                try {
                    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            'title': 'Cool Location App required Location permission',
                            'message': 'We required Location permission in order to get device location ' +
                                'Please grant us.'
                        }
                    )
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        this.getCurrentLocation()
                    } else {
                        alert("You don't have access for the location");
                    }
                } catch (err) {
                    alert(err)
                }
            }
        } catch (err) {
            console.warn(err)
        }
    }

    getCurrentLocation() {
        Geolocation.getCurrentPosition(
            position => {
                // const initialPosition = JSON.stringify(position);
                this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude })
            },
            error => Alert.alert('Error', JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
        this.watchID = Geolocation.watchPosition(position => {
            // const lastPosition = JSON.stringify(position);
            this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude })
        });
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
                <Text style={[styles.bold, { color: 'white', fontSize: 26 }]}>{`${props.checkType ? 'CHECK OUT' : 'CHECK IN'}`}</Text>
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
        if (this.props.navigation.state.routeName == 'Checkin') {
            return true
        }
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                currentTime: new Date()
            })
        }, 1000)
        this.requestLocationPermission()
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
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
                        backgroundColor: props.checkType ? darkColor : primaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }}
                    statusBarStyle={{
                        backgroundColor: props.checkType ? darknessColor : secondaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }} />
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={[styles.cruveContainer]}>
                        <View style={[styles.cruveView, { backgroundColor: props.checkType ? darkColor : primaryColor }]} />
                        <Text style={[styles.bold, { fontSize: 30, color: 'white', top: 10, width: '100%', textAlign: 'center' }]}>{`${props.userInfo.title}${props.userInfo.firstname} ${props.userInfo.lastname}`}</Text>
                        <Text style={{ fontSize: 24, color: 'white', top: 10, width: '100%', textAlign: 'center' }}>{`${props.userInfo.position}`}</Text>
                    </View>
                    <Image source={{ uri: 'https://via.placeholder.com/300' }} style={[styles.imageContainer]} />
                    <View style={[styles.center]}>
                        <TouchableOpacity style={[styles.buttonCheck, styles.shadow, styles.center, { backgroundColor: props.checkType ? darkColor : secondaryColor }]}
                            onPress={() => this.onCheck()
                            }>
                            <Text style={{ fontSize: 24, color: 'white' }}>{`${props.checkType ? 'CHECK OUT' : 'CHECK IN'}`}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(CheckinScreen)