import React from 'react'
import {
    View,
    Text,
    Image,
    BackHandler,
    TouchableOpacity
} from 'react-native'
var moment = require('moment');
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor
} from '../../utils/contants'
import styles from '../../style/style'

class CheckinScreen extends React.Component {

    state = {
        latitude: '',
        longitude: '',
        currentTime: new Date()
    }

    onCheck() {
        let that = this
        const props = that.props
        const { currentTime, latitude, longitude } = that.state
        let header = {
            'Authorization': props.reducer.token,
            'x-api-key': API_KEY
        }
        let formData = new FormData();
        // formData.append('username', username);
        // formData.append('password', password);

        props.indicatorControll(true)
        // Helper.post(BASEURL + LOGIN_URL, formData, header, (results) => {
        //     if (results.status = 'SUCCESS') {
        //         props.tokenControll('save', results.token)
        //         props.userInfoControll('save', results.data)
        //         props.indicatorControll(false)
        //         props.navigation.replace('Main')
        //     } else {
        //         props.indicatorControll(false)
        //         alert(`${results.message}`)
        //     }
        // })
    }

    ComponentLeft = () => {
        return (
            <View>

            </View>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center]}>
                <Text style={[styles.bold, { color: 'white', fontSize: 26 }]}>{`CHECK IN`}</Text>
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
                        <View style={[styles.cruveView]} />
                        <Text style={[styles.bold, { fontSize: 30, color: 'white', top: 10, width: '100%', textAlign: 'center' }]}>{`${props.userInfo.title}${props.userInfo.firstname} ${props.userInfo.lastname}`}</Text>
                        <Text style={{ fontSize: 24, color: 'white', top: 10, width: '100%', textAlign: 'center' }}>{`${props.userInfo.position}`}</Text>
                    </View>
                    <Image source={{ uri: 'https://via.placeholder.com/300' }} style={[styles.imageContainer]} />
                    <View style={[styles.center]}>
                        <TouchableOpacity style={[styles.buttonCheck, styles.shadow, styles.center]}
                            onPress={() => {

                            }}>
                            <Text style={{ fontSize: 24, color: 'white' }}>{`CHECK IN`}</Text>
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

}

export default connect(mapStateToProps, mapDispatchToProps)(CheckinScreen)