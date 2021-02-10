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
import Moment from 'moment'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import ImagePicker from 'react-native-image-crop-picker'
import Geolocation from '@react-native-community/geolocation'
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
    API_KEY,
    BASEURL,
    SALETEAM_LIST
} from '../utils/contants'

import styles from '../style/style'
import Helper from '../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('window').width;

class SaleCheckScreen extends React.Component {

    state = {
        teamlist: [],
        ImageSource: [],
        latitude: '',
        longitude: '',
        currentTime: new Date(),
        appState: AppState.currentState
    }

    getSaleTeam() {

        let that = this
        const props = that.props
        const users = this.props.reducer.userInfo
        let header = {
            // 'Authorization': '',
            'x-api-key': API_KEY
        }
        let formData = new FormData();

        formData.append('teamNo', users.TeamNo);
        formData.append('depid', users.DepID);
        formData.append('fnno', users.FnNo);
        formData.append('fnyear', users.FnYear);

        props.indicatorControll(true)
        Helper.post(BASEURL + SALETEAM_LIST, formData, header, async (results) => {
            // alert(JSON.stringify(results))
            if (results.status == 'SUCCESS') {
                await that.setState({ teamlist: results.data })
                await props.indicatorControll(false)
            } else {
                await props.indicatorControll(false)
                await that.setState({ teamlist: [] })
                await alert(`${results.message}`)
            }
        })
    }

    async onSave() {
        await this.requestLocationPermission()

        let type = ''
        let that = this
        const props = that.props
        type = 'I'
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
        formData.append('version', VersionCheck.getCurrentVersion());
        that.state.ImageSource.map((v, i) => {
            let gallerys = {
                uri: v.url,
                type: v.type,
                name: 'name_' + i + '.jpg',
            };
            formData.append('empimg[' + i + ']', gallerys);
        });

        // props.indicatorControll(true)
        // await Helper.post(BASEURL + CHECK_URL, formData, header, async (results) => {
        //     if (results.status == 'SUCCESS') {
        //         await StorageService.set(CHECK_KEY, JSON.stringify(type))
        //         await StorageService.set(CHECK_TIME, JSON.stringify(new Date()))
        //         await props.CheckTypeControll(type == 'I' ? true : false)
        //         await props.indicatorControll(false)
        //         await Alert.alert(
        //             'ข้อความ',
        //             `${results.message}`,
        //             [
        //                 { text: 'OK', onPress: () => that.handleBack() },
        //             ],
        //             { cancelable: false }
        //         )
        //     } else {
        //         await props.indicatorControll(false)
        //         await Alert.alert(
        //             'คำเตือน',
        //             `${results.message}`,
        //             [
        //                 {
        //                     text: 'OK', onPress: () => {
        //                         if (results.data == 'oldversion') {
        //                             this.onUpdate('https://play.google.com/store/apps/details?id=com.hrmobile');
        //                         } else {
        //                             null
        //                         }
        //                     }
        //                 },
        //             ],
        //             { cancelable: false }
        //         )
        //     }
        // })
    }

    onTakePicture() {

        let that = this

        ImagePicker.openCamera({
            multiple: false,
            useFrontCamera: true,
            includeBase64: true,
            compressImageMaxWidth: 200,
            compressImageMaxHeight: 200
        }).then(images => {
            // alert(JSON.stringify(images));
            let img = []
            img.push({
                url: images.path,
                type: images.mime
            })
            that.setState({
                ImageSource: [...that.state.ImageSource, ...img]
            });
            that.onSave()
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
                <View style={[styles.center, { flex: 0.2 }]}>
                    <Icon name='grav' color={secondaryColor} size={34} />
                </View>
                <View style={[{ flex: 0.65, justifyContent: 'center', paddingLeft: 2 }]}>
                    <Text style={[{ fontSize: 18 }]}>{`ชื่อ : ${item.Fullname}`}</Text>
                    <Text style={[{ fontSize: 18 }]}>{`รหัสพนักงาน : ${item.saleemp}`}</Text>
                    <Text style={[{ fontSize: 16 }]}>{`รหัสเซลล์ : ${item.salecode}`}</Text>
                    <View style={[{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 4, paddingRight: 2 }]} />
                </View>
                <View style={[{ flex: 0.15, justifyContent: 'center', paddingRight: 2 }]}>
                    <TouchableOpacity style={{ borderWidth: 0.3, borderRadius: 25, borderColor: secondaryColor, width: 45, height: 45, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => this.onTakePicture()
                        }>
                        <Icon name='camera' size={18} color={secondaryColor} />
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
                <View style={{ flex: 1, padding: 5 }}>
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
                                keyExtractor={(item) => item.saleemp}
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

export default connect(mapStateToProps, mapDispatchToProps)(SaleCheckScreen)