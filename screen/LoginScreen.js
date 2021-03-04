import React from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    BackHandler,
    TouchableOpacity
} from 'react-native'
var moment = require('moment')
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor,
    grayColor,
    API_KEY,
    BASEURL,
    LOGIN_URL,
    TOKEN_KEY,
    CHECK_KEY,
    CHECK_TIME
} from '../utils/contants'

import {
    tokenControll,
    userInfoControll,
    indicatorControll,
    CheckTypeControll
} from '../actions'


import styles from '../style/style'
import image from '../img/logo.png'

import Helper from '../utils/Helper'
import StorageService from '../utils/StorageServies'

class LoginScreen extends React.Component {

    state = {
        username: '',
        password: '',
        currentDate: new Date(),
    }

    onLogin() {
        let that = this
        const props = that.props
        const { username, password } = that.state
        let header = {
            // 'Authorization': '',
            'x-api-key': API_KEY
        }
        let formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        props.indicatorControll(true)
        Helper.post(BASEURL + LOGIN_URL, formData, header, (results) => {
            if (results.status == 'SUCCESS') {
                props.tokenControll('save', results.token)
                props.userInfoControll('save', results.data)
                StorageService.set(TOKEN_KEY, results.token)
                props.CheckTypeControll(false)
                props.indicatorControll(false)
                props.navigation.replace('Main')
            } else {
                props.indicatorControll(false)
                alert(`${results.message}`)
            }
        })
    }

    onLoginToken(token) {
        let that = this
        const props = that.props
        let header = {
            'Authorization': token,
            'x-api-key': API_KEY
        }

        props.indicatorControll(true)
        Helper.post(BASEURL + LOGIN_URL, '', header, (results) => {
            if (results.status == 'SUCCESS') {
                props.tokenControll('save', results.token)
                props.userInfoControll('save', results.data)
                StorageService.set(TOKEN_KEY, results.token)
                // props.CheckTypeControll(false)
                props.indicatorControll(false)
                props.navigation.replace('Main')
            } else {
                props.indicatorControll(false)
                alert(`${results.message}`)
            }
        })
    }

    getStorageToken() {
        let that = this
        try {
            StorageService.get(TOKEN_KEY).then(obj => {
                if (obj !== null) {
                    that.onLoginToken(obj)
                }
            }).catch(function (error) {
                console.log(error);
            });
        } catch (error) {

        }
    }

    getStorageCheck() {
        let that = this
        const props = that.props
        try {
            StorageService.get(CHECK_KEY).then(obj => {
                if (obj !== null) {
                    let check = JSON.parse(obj)
                    props.CheckTypeControll(check == 'I' ? true : false)
                } else {
                    props.CheckTypeControll(false)
                }
            }).catch(function (error) {
                console.log(error);
            });
        } catch (error) {

        }
    }

    checkDate() {
        let that = this
        try {
            StorageService.get(CHECK_TIME).then(obj => {
                if (obj !== null) {
                    let date = (JSON.parse(obj))
                    let now = moment(new Date()).format('L')
                    console.log('Yesterday: ' + date + ', Now: ' + now)
                    if (date < now) {
                        console.log('Check date < : true')
                        StorageService.remove(CHECK_KEY)
                    } else {
                        this.getStorageCheck()
                        console.log('Check date < : false')
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        } catch (error) {

        }
    }

    handleBack = () => {
        return true
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    async componentDidMount() {
        await this.checkDate()
        // await this.getStorageCheck()
        await this.getStorageToken()
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    render() {
        return (
            <View style={[styles.center, { flex: 1, backgroundColor: primaryColor }]}>
                <Image source={image} style={{ resizeMode: 'contain', width: 180, height: '25%', margin: 10 }} />
                <View style={styles.marginBetweenVertical}></View>
                <View style={[styles.shadow, styles.inputWithIcon]}>
                    <Icon name="user" color={grayColor} size={26} />
                    <TextInput style={[styles.inputContainer]}
                        ref={(input) => { this.username = input; }}
                        placeholder='Username'
                        keyboardType='email-address'
                        returnKeyType='next'
                        autoCapitalize='none'
                        value={this.state.username}
                        onChangeText={(text) => this.setState({ username: text })}
                        onSubmitEditing={() => this.password.focus()} />
                </View>
                <View style={styles.marginBetweenVertical}></View>
                <View style={[styles.shadow, styles.inputWithIcon]}>
                    <Icon name="lock" color={grayColor} size={26} />
                    <TextInput style={[styles.inputContainer]}
                        ref={(input) => { this.password = input; }}
                        placeholder='Password'
                        keyboardType='number-pad'
                        returnKeyType='done'
                        autoCapitalize='none'
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(text) => this.setState({ password: text })}
                        onSubmitEditing={() => this.onLogin()} />
                </View>
                <View style={styles.marginBetweenVertical}></View>
                <View style={styles.marginBetweenVertical}></View>
                <TouchableOpacity style={[styles.mainButton, styles.center]}
                    onPress={
                        () => this.onLogin()
                    }>
                    <Text style={{ color: primaryColor, fontSize: 26, color: 'white' }}>{`เข้าสู่ระบบ`}</Text>
                </TouchableOpacity>
                <View style={[styles.positionBottom, { alignItems: 'center', justifyContent: 'center' }]}>
                    <Text style={{ fontSize: 16, color: 'white' }}>{`Copyright © 2020 by Thiensurat Public Company Limited.`}</Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {
    tokenControll,
    userInfoControll,
    indicatorControll,
    CheckTypeControll
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)