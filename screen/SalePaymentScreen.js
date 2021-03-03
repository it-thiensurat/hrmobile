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
    PermissionsAndroid
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
    SALETEAM_PAY
} from '../utils/contants'

import styles from '../style/style'
import Helper from '../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('window').width;

class SalePaymentScreen extends React.Component {

    state = {
        teamlist: [],
        workdetail: [],
        amount: '',
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

        formData.append('teamcode', users.TeamNo);
        formData.append('depid', users.DepID);
        formData.append('fnno', users.FnNo);
        formData.append('fnyear', users.FnYear);

        props.indicatorControll(true)
        Helper.post(BASEURL + SALETEAM_PAY, formData, header, async (results) => {
            // alert(JSON.stringify(results))
            // return
            if (results.status == 'SUCCESS') {
                await that.setState({ teamlist: results.data, workdetail: results.data[0].WorkDetail })
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

    async onSave(detailId, saleemp) {
        await this.requestLocationPermission()

        let that = this
        const props = that.props
        const users = props.reducer.userInfo
        const { latitude, longitude, currentTime } = that.state
        let header = {
            'Authorization': props.reducer.token,
            'x-api-key': API_KEY
        }
        let formData = new FormData();
        formData.append('empId', users.empId);
        formData.append('saleEmp', saleemp);
        formData.append('detailId', detailId);
        formData.append('checkTime', moment(currentTime).format('L').split("/").reverse().join("-") + ' ' + moment(currentTime).format('LTS'));
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);
        that.state.ImageSource.map((v, i) => {
            let gallerys = {
                uri: v.url,
                type: v.type,
                name: 'name_' + i + '.jpg',
            };
            formData.append('empimg[' + i + ']', gallerys);
        });

        props.indicatorControll(true)
        await Helper.post(BASEURL + SALETEAM_CHECK, formData, header, async (results) => {
            if (results.status == 'SUCCESS') {
                await props.indicatorControll(false)
                await Alert.alert(
                    'ข้อความ',
                    `${results.message}`,
                    [
                        { text: 'OK', onPress: () => that.getSaleTeam() },
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

    onTakePicture(detailId, saleemp) {

        let that = this

        ImagePicker.openCamera({
            multiple: false,
            useFrontCamera: true,
            includeBase64: true,
            compressImageMaxWidth: 200,
            compressImageMaxHeight: 200
        }).then(async images => {
            // alert(JSON.stringify(images));
            let img = []
            img.push({
                url: images.path,
                type: images.mime
            })
            await that.setState({
                ImageSource: img
            });
            await that.onSave(detailId, saleemp)
        });
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
        return (
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 2, borderWidth: 0.1, borderRadius: 4, padding: 2 }}>
                <View style={[styles.center, { flex: 0.25 }]}>
                    {/* <Icon name='grav' color={item.LeadApproveStatus === 1 ? secondaryColor : darkColor} size={34} /> */}
                    <FastImage
                        style={{ width: 80, height: 80, borderRadius: 4, borderWidth: 1, borderColor: item.SupApproveStatus === 1 ? secondaryColor : darkColor }}
                        source={{
                            uri: item.Image,
                            // headers: { Authorization: 'someAuthToken' },
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                    />
                </View>
                <View style={[{ flex: 0.6, justifyContent: 'center', paddingLeft: 2 }]}>
                    <Text style={[{ fontSize: 20 }]}>{`ชื่อ : ${item.EmpName}`}</Text>
                    <Text style={[{ fontSize: 20 }]}>{`รหัสพนักงาน : ${item.EmpID}`}</Text>
                    <Text style={[{ fontSize: 20 }]}>{`รหัสเซลล์ : ${item.SaleCode}`}</Text>
                    <Text style={[{ fontSize: 20, color: item.SupApproveStatus === 1 ? secondaryColor : darkColor }]}>{`สถานะ : ${item.SupApproveStatus == 1 ? 'ลงเวลาแล้ว' : 'ยังไม่ลงเวลา'}`}</Text>
                    <TextInput style={[styles.inputAmount, styles.shadow, { fontFamily: 'DBYord', fontSize: 20 , textAlign: 'center' }]}
                        // ref={(input) => { this.amount = input; }}
                        placeholder="ระบุเงิน"
                        keyboardType={'number-pad'}
                        returnKeyType='next'
                        onBlur={false}
                        autoCapitalize={false}
                        blurOnSubmit={false}
                        selectTextOnFocus={true}
                        value={item.PaymentAmount}
                        onChangeText={(text) => this.setState({ amount: text })} />
                    <View style={[{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 4, paddingRight: 2 }]} />
                </View>
                <View style={[{ flex: 0.15, justifyContent: 'center', paddingRight: 2 }]}>
                    <TouchableOpacity style={{ borderWidth: 0.3, borderRadius: 25, borderColor: secondaryColor, width: 45, height: 45, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() =>
                            // this.onTakePicture(item.detailId, item.saleemp)
                            null
                        }>
                        <Icon name='camera' size={18} color={item.CostBranch === 1 ? 'gray' : secondaryColor} />
                    </TouchableOpacity>
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
        await this.requestLocationPermission()
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
                        backgroundColor: secondaryColor,
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
                            <Text style={[styles.bold, { color: secondaryColor, fontSize: 26 }]}>{`${users.TeamCode}`}</Text>
                        </View>
                    </View>
                    {
                        this.state.teamlist ?
                            <FlatList
                                style={{ flex: 1, marginTop: 5 }}
                                data={this.state.workdetail}
                                keyExtractor={(item) => item.DetailID}
                                renderItem={this._renderItem} />
                            :
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: 'gray', fontSize: 26 }}>{`ไม่พบข้อมูล`}</Text>
                            </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(SalePaymentScreen)