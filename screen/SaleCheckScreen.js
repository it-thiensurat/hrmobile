import React from 'react'
import {
    View,
    Text,
    Image,
    Platform,
    BackHandler,
    TextInput,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Dimensions,
    Alert
} from 'react-native'
import Moment from 'moment'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { Picker } from "native-base"
var RNFS = require('react-native-fs');

import {
    indicatorControll
} from '../actions'

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor,
    YEARCOMM,
    FORTNIGHTCOMM,
    CONTNO_FN,
    CONTNO_YR,
    COMMPDF_CZ,
    COMMPDF_FN,
    COMMPDF_YR,
    COMMPDF_PD
} from '../utils/contants'

import styles from '../style/style'
import Helper from '../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('window').width;

class SaleCheckScreen extends React.Component {

    state = {

    }

    ComponentLeft = () => {
        return (
            <View style={[styles.center, { paddingLeft: 4 }]}>
                <TouchableOpacity style={{ width: 35, height: 35, alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => this.handleBack()}>
                    <Icon name='chevron-left' size={28} color={secondaryColor} />
                </TouchableOpacity>
            </View>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center]}>
                <Text style={[styles.bold, { color: 'white', fontSize: 26 }]}>{`ลงเวลาทีมขาย`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={{ paddingRight: 36 }}>

            </View>
        );
    }

    _handleClickButton = () => {

        Alert.alert("Floating Button Clicked");

    }

    handleBack = () => {
        this.props.navigation.pop();
        return true;
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
        // await this.getYear()
    }

    render() {
        const users = this.props.reducer.userInfo
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
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

                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ marginBottom: 10 }}>

                    </View>
                    <View style={styles.marginBetweenVertical}></View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', width: DEVICE_WIDTH, position: 'absolute', bottom: 0 }}>
                        <View style={{ width: DEVICE_WIDTH }}>
                            <TouchableOpacity style={[styles.shadow, styles.center, { height: 50, width: '90%', alignSelf: 'center', backgroundColor: secondaryColor, borderRadius: 50 / 2, marginBottom: 20 }]}
                                onPress={() => {
                                    this.props.navigation.push('CommissionWebView', { fortnight: this.state.fortnightselect, year: this.state.yearselect, contno: this.state.contno, type: 'COMM' })
                                }}>
                                <Text style={[{ color: 'white', fontSize: 26 }, styles.bold]}>{`รายงานค่าคอมฯ`}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View >
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {
    indicatorControll
}

export default connect(mapStateToProps, mapDispatchToProps)(SaleCheckScreen)