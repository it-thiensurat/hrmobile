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
    AppState,
    PermissionsAndroid,
    Switch
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import ImagePicker from 'react-native-image-crop-picker'
import Geolocation from '@react-native-community/geolocation'
import { Picker } from "native-base"
import FastImage from 'react-native-fast-image'
var RNFS = require('react-native-fs');
var numeral = require('numeral');

import {
    indicatorControll
} from '../actions'

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor,
    API_KEY,
    BASEURL,
    GETALLOW100
} from '../utils/contants'

import styles from '../style/style'
import Helper from '../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('window').width;

class SaleApprove100Screen extends React.Component {

    state = {
        teamlist: [],
        cause: [],
        cost: '',
        ImageSource: [],
        latitude: '',
        longitude: '',
        currentTime: new Date(),
        appState: AppState.currentState
    }

    async getSaleTeam() {

        let that = this
        await that.setState({ teamlist: [] })
        const props = that.props
        const users = props.reducer.userInfo

        let header = {
            'Authorization': props.reducer.token,
            'x-api-key': API_KEY
        }
        let formData = new FormData();

        // formData.append('empId', users.empId);
        formData.append('teamno', users.TeamNo100);
        // formData.append('depid', users.DepID);
        // formData.append('fnno', users.FnNo);
        // formData.append('fnyear', users.FnYear);

        props.indicatorControll(true)
        Helper.post(BASEURL + GETALLOW100, formData, header, async (results) => {
            // alert(JSON.stringify(results))
            // return
            if (results.status == 'SUCCESS') {
                await that.setState({ teamlist: results.data })
                await that.setState({ cause: results.cause })
                await props.indicatorControll(false)
            } else {
                await props.indicatorControll(false)
                await that.setState({ teamlist: [] })
                await alert(`${results.message}`)
            }
        })
    }

    async approveSaleTeam() {
        await this.requestLocationPermission()

        let that = this
        const props = that.props
        const users = props.reducer.userInfo
        const { latitude, longitude } = that.state
        let header = {
            'Authorization': props.reducer.token,
            'x-api-key': API_KEY
        }
        let formData = new FormData();

        formData.append('empId', users.empId);
        formData.append('teamNo', users.TeamNo);
        formData.append('depid', users.DepID);
        formData.append('fnno', users.FnNo);
        formData.append('fnyear', users.FnYear);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);

        props.indicatorControll(true)
        await Helper.post(BASEURL + SALETEAM_APPROVE, formData, header, async (results) => {
            // alert(JSON.stringify(results))
            if (results.status == 'SUCCESS') {
                await props.indicatorControll(false)
                await Alert.alert(
                    'ข้อความ',
                    `${results.message}`,
                    [
                        { text: 'OK', onPress: () => that.handleBack() },
                    ],
                    { cancelable: false }
                )
            } else {
                await props.indicatorControll(false)
                await Alert.alert(
                    'คำเตือน',
                    `${results.message}`,
                    [
                        { text: 'OK', onPress: () => null },
                    ],
                    { cancelable: false }
                )
            }
        })
    }

    onSelectCause(value) {
        if (value != '') {
            let CauseList = this.state.cause
            // let CauseList_arr = CauseList.filter((item) => item.id == value)
            this.setState({ cause: value })
        } else {
            this.setState({ cause: '' })
        }
    }

    onChangeValue(item, index, e) {
        let data = this.state.teamlist
        item.SwitchStatus = e ? 1 : 0
        data[index] = item

        this.setState({ teamlist: data })
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
                    'message': 'กรุณาให้แอพพลิเคชั่น TSR HR One เข้าถึงการระบุตำแหน่ง'
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
                        'กรุณาให้แอพพลิเคชั่น TSR HR One เข้าถึงการระบุตำแหน่ง',
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
                    'กรุณาให้แอพพลิเคชั่น TSR HR One เข้าถึงการระบุตำแหน่ง',
                    [
                        { text: 'Cancel', onPress: () => RNExitApp.exitApp(), style: 'cancel' },
                        { text: 'OK', onPress: () => PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION) },
                    ],
                    { cancelable: false }
                )
            }
        }
    }

    _renderItem = ({ item, index }) => {
        const users = this.props.reducer.userInfo
        let Cause_header = [{ id: 0, causeName: 'กรุณาเลือกเหตุผล' }]
        let CauseList = this.state.cause
        CauseList = Cause_header.concat(CauseList)
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 2, borderWidth: 0.1, borderRadius: 4, padding: 2 }}>
                <View style={[{ flex: 0.80, justifyContent: 'center', padding: 6 }]}>
                    <Text style={[{ fontSize: 20 }]}>{`ชื่อ : ${item.fname} ${item.lname}`}</Text>
                    <Text style={[{ fontSize: 20 }]}>{`รหัสเซลล์ : ${item.salecode}`}</Text>
                    <Text style={[{ fontSize: 20 }]}>{`วันเริ่มงาน : ${item.startDate}`}</Text>
                    <Text style={[{ fontSize: 20 }]}>{`จำนวนเงิน : ${numeral(item.amount).format('0,0.00')}`}</Text>
                    <Text style={[{ fontSize: 20, paddingBottom: 8 }]}>{`เหตุผล(กรณีไม่อนุมัติ)`}</Text>
                    <View style={[styles.inputWithButton, styles.shadow, styles.center]}>
                        <Picker
                            mode="dropdown"
                            placeholder=""
                            textStyle={{ fontSize: 18 }}
                            itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                            itemTextStyle={{ color: 'gray', fontSize: 18 }}
                            style={[{ color: 'gray', width: '100%' }]}
                            selectedValue={this.state.cause}
                            onValueChange={(value, index) => this.onSelectCause(value)} >
                            {
                                CauseList.map((value, index) => {
                                    return (<Picker.Item key={index} label={value.causeName} value={value.id} />);
                                })
                            }
                        </Picker>
                    </View>
                    <View style={[{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 4, paddingRight: 2 }]} />
                </View>
                <View style={[{ flex: 0.15, justifyContent: 'center', paddingRight: 2 }]}>
                    <Text style={[{ alignSelf: 'center', fontSize: 20, color: item.SwitchStatus === 1 ? secondaryColor : darkColor }]}>{item.SwitchStatus ? 'อนุมัติ' : 'ไม่อนุมัติ'}</Text>
                    <Switch
                        value={item.SwitchStatus == 1 ? true : false}
                        onValueChange={(e) => this.onChangeValue(item, index, e)} />
                </View>
            </View>
        )
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
        // await this.requestLocationPermission()
        await this.getSaleTeam()
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
                <View style={{ flex: 1, padding: 2, paddingBottom: 65 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                        <View style={[styles.center, { flex: 0.2 }]}>
                            <Icon name='users' color={secondaryColor} size={34} />
                        </View>
                        <View style={{ flex: 0.3, justifyContent: 'center', paddingLeft: 2 }}>
                            <Text style={[styles.bold, { color: secondaryColor, fontSize: 26 }]}>{`Team  :`}</Text>
                        </View>
                        <View style={{ flex: 0.5 }}>
                            <Text style={[styles.bold, { color: secondaryColor, fontSize: 26 }]}>{`${users.TeamNo}`}</Text>
                        </View>
                    </View>
                    {
                        this.state.teamlist ?
                            <FlatList
                                style={{ flex: 1, marginTop: 5 }}
                                data={this.state.teamlist}
                                keyExtractor={(item) => item.citizenid}
                                renderItem={this._renderItem} />
                            :
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: 'gray', fontSize: 26 }}>{`ไม่พบข้อมูล`}</Text>
                            </View>
                    }
                    {
                        this.state.teamlist ?
                            <View style={{ alignItems: 'center', width: DEVICE_WIDTH, position: 'absolute', bottom: 0 }}>
                                <TouchableOpacity style={[styles.shadow, styles.center, { height: 50, width: '90%', alignSelf: 'center', backgroundColor: secondaryColor, borderRadius: 50 / 2, marginBottom: 12 }]}
                                    onPress={() => {
                                        this.approveSaleTeam()
                                    }}>
                                    <Text style={[{ color: 'white', fontSize: 26 }, styles.bold]}>{`ยืนยันข้อมูลการอนุมัติ`}</Text>
                                </TouchableOpacity>
                            </View>
                            :
                            null
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(SaleApprove100Screen)