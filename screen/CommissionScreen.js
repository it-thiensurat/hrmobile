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
    Alert,
    Linking
} from 'react-native'
import Moment from 'moment'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { Picker } from "native-base"
import DateTimePickerModal from "react-native-modal-datetime-picker"
var RNFS = require('react-native-fs');

import {
    indicatorControll
} from '../actions'

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor,
    grayColor,
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

class CommissionScreen extends React.Component {

    state = {
        isDatePickerVisible: false,
        yearfilter: [{ year: 'กรุณาเลือกปี' }],
        yearselect: '',
        fortnight: [{ fnno: 'กรุณาเลือกปักษ์' }],
        fortnightselect: '',
        contno: '',
        linkpdf: ''
    }

    // deleteFile = () => {
    //     let file = RNFS.DownloadDirectoryPath + '/getReportData.pdf'
    //     if (RNFS.exists(file)) {
    //         RNFS.unlink(file)
    //             .then(() => {
    //                 console.log('FILE DELETED');
    //             }).catch((err) => {
    //                 console.log(err.message);
    //             });
    //     }
    // }

    getYear() {

        let that = this
        const props = that.props

        props.indicatorControll(true)
        Helper.get(YEARCOMM, async (results) => {
            // alert(JSON.stringify(results))
            await that.setState({ yearfilter: that.state.yearfilter.concat(results) })
            await props.indicatorControll(false)
        })
    }

    getFortnight(value) {

        let that = this
        const props = that.props

        props.indicatorControll(true)
        Helper.get(FORTNIGHTCOMM + value, async (results) => {
            // alert(JSON.stringify(results))
            await that.setState({ fortnight: that.state.fortnight.concat(results) })
            await props.indicatorControll(false)
        })
    }

    getContno(fn, yr) {

        let that = this
        const props = that.props

        props.indicatorControll(true)
        Helper.get(CONTNO_FN + fn + CONTNO_YR + yr, async (results) => {
            // alert(JSON.stringify(results))
            await that.setState({ contno: results[0].contno })
            await props.indicatorControll(false)
        })
    }

    // getCommission(fn, yr, cn) {

    //     let that = this
    //     const props = that.props
    //     let cardID = props.reducer.userInfo.cardid
    //     let link = COMMPDF_CZ + cardID + COMMPDF_FN + fn + COMMPDF_YR + yr + COMMPDF_PD + cn
    //     if (cn) {
    //         this.setState({ linkpdf: link })
    //     } else {
    //         Alert.alert(
    //             'ข้อความ',
    //             `Test`,
    //             [
    //                 { text: 'OK', onPress: () => null },
    //             ],
    //             { cancelable: false }
    //         )
    //     }
    // }

    async onSelectYear(value) {
        if (value != 'กรุณาเลือกปี') {
            await this.setState({ yearselect: value })
            await this.getFortnight(value)
        }
    }

    async onSelectFortnight(value) {
        if (value != 'กรุณาเลือกปักษ์') {
            await this.setState({ fortnightselect: value })
            await this.getContno(value, this.state.yearselect)
        }
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
                <Text style={[styles.bold, { color: 'white', fontSize: 26 }]}>{`รายงานค่าคอมมิชชั่น / หนี้สูญ`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={{ paddingRight: 36 }}>

            </View>
            // <View style={[styles.center, { paddingRight: 4 }]}>
            //     <TouchableOpacity style={{ width: 35, height: 35, alignItems: 'center', justifyContent: 'center' }}
            //         onPress={
            //             null
            //         }>
            //         <Icon name="retweet" size={26} color={secondaryColor} />
            //     </TouchableOpacity>
            // </View>
        );
    }

    _showDateTimePicker = () =>
        this.setState({
            isDatePickerVisible: true
        });

    _hideDateTimePicker = (date) => {
        this.setState({
            isDatePickerVisible: false
        });
    }

    _handleDatePicked = (date) => {
        this.setState({
            leaveDate: date
        });
        this._hideDateTimePicker();
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
        // await this.deleteFile()
        await this.getYear()
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
                        backgroundColor: primaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }} />

                <View style={{ flex: 1, padding: 10 }}>
                    <View style={{ marginBottom: 10 }}>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'DBMed', color: primaryColor }}>{`เลือกปี`}</Text>
                        </View>
                        <View style={[styles.input, styles.shadow, styles.center]}>
                            <Picker
                                mode="dropdown"
                                placeholder=""
                                textStyle={{ fontSize: 18 }}
                                itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                                itemTextStyle={{ color: 'gray', fontSize: 18 }}
                                style={[{ color: 'gray', width: '100%' }]}
                                selectedValue={this.state.yearselect}
                                onValueChange={(value, index) => this.onSelectYear(value)} >
                                {
                                    this.state.yearfilter.map((value, index) => {
                                        return (<Picker.Item key={index} label={value.year} value={value.year} />);
                                    })
                                }
                            </Picker>
                        </View>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'DBMed', color: primaryColor }}>{`เลือกปักษ์`}</Text>
                        </View>
                        <View style={[styles.input, styles.shadow, styles.center]}>
                            <Picker
                                mode="dropdown"
                                placeholder=""
                                textStyle={{ fontSize: 18 }}
                                itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                                itemTextStyle={{ color: 'gray', fontSize: 18 }}
                                style={[{ color: 'gray', width: '100%' }]}
                                selectedValue={this.state.fortnightselect}
                                onValueChange={(value, index) => this.onSelectFortnight(value)} >
                                {
                                    this.state.fortnight.map((value, index) => {
                                        return (<Picker.Item key={index} label={value.fnno} value={value.fnno} />);
                                    })
                                }
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.marginBetweenVertical}></View>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', width: DEVICE_WIDTH, position: 'absolute', bottom: 0 }}>
                    <View style={{ width: DEVICE_WIDTH / 2 }}>
                        <TouchableOpacity style={[styles.shadow, styles.center, { height: 50, width: '90%', alignSelf: 'center', backgroundColor: secondaryColor, borderRadius: 50 / 2, marginBottom: 20 }]}
                            onPress={() => {
                                // this.getCommission(this.state.fortnightselect, this.state.yearselect, this.state.contno)
                                // let uri = ''
                                // uri = COMMPDF_CZ + users.cardid + COMMPDF_FN + this.state.fortnightselect + COMMPDF_YR + this.state.yearselect + COMMPDF_PD + this.state.contno
                                // Linking.openURL(uri)
                                // alert(JSON.stringify(this.state.contno))
                                this.props.navigation.push('CommissionWebView', { fortnight: this.state.fortnightselect, year: this.state.yearselect, contno: this.state.contno, type: 'COMM' })
                            }}>
                            <Text style={[{ color: 'white', fontSize: 26 }, styles.bold]}>{`รายงานค่าคอมฯ`}</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{ width: DEVICE_WIDTH / 2 }}>
                        <TouchableOpacity style={[styles.shadow, styles.center, { height: 50, width: '90%', alignSelf: 'center', backgroundColor: secondaryColor, borderRadius: 50 / 2, marginBottom: 20 }]}
                            onPress={() => {
                                // this.getCommission(this.state.fortnightselect, this.state.yearselect, this.state.contno)
                                // let uri = ''
                                // uri = COMMPDF_CZ + users.cardid + COMMPDF_FN + this.state.fortnightselect + COMMPDF_YR + this.state.yearselect + COMMPDF_PD + this.state.contno
                                // Linking.openURL(uri)
                                // alert(JSON.stringify(this.state.contno))
                                this.props.navigation.push('CommissionWebView', { fortnight: this.state.fortnightselect, year: this.state.yearselect, contno: this.state.contno, type: 'DEBT' })
                            }}>
                            <Text style={[{ color: 'white', fontSize: 26 }, styles.bold]}>{`รายงานหนี้สูญ`}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(CommissionScreen)