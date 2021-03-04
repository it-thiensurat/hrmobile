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
    TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import ImagePicker from 'react-native-image-crop-picker'
import { Picker } from "native-base"
import FastImage from 'react-native-fast-image'
import SignatureCapture from 'react-native-signature-capture'
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
    SALEPERSON_PAY
} from '../utils/contants'

import styles from '../style/style'
import Helper from '../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('window').width;

class SaleSignatureScreen extends React.Component {

    state = {
        signimage: []
    }

    onSave() {
        // alert(JSON.stringify(this.state.signimage))
        // return
        let that = this
        const props = that.props
        const { signimage } = that.state
        const { DetailID, Amount, Img } = props.route.params
        const users = props.reducer.userInfo
        let header = {
            'Authorization': props.reducer.token,
            'x-api-key': API_KEY
        }
        let formData = new FormData();
        formData.append('DetailID', DetailID);
        formData.append('empId', users.empId);
        formData.append('PaymentAmount', Amount);
        Img.map((v, i) => {
            let gallerys = {
                uri: v.url,
                type: v.type,
                name: 'name_' + i + '.jpg',
            };
            formData.append('paymentimg[' + i + ']', gallerys);
        });

        // signimage.map((v, i) => {
            // let signature = {
            //     uri: signimage[0].pathName,
            //     type: 'image/*',
            //     name: 'name_' + i + '.jpg',
            // };
            // formData.append('signimg['+ 0 +']', signature);
        // });
        formData.append('signimg', signimage[0].encoded);
        // alert(JSON.stringify(signimage))
        // return

        props.indicatorControll(true)
        Helper.post(BASEURL + SALEPERSON_PAY, formData, header, async (results) => {
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

    saveSign() {
        this.refs["sign"].saveImage();
    }

    resetSign() {
        this.refs["sign"].resetImage();
    }

    _onSaveEvent = async (result) => {
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        // console.log(result);
        // let sign = this.state.signimage
        const { signimage } = this.state
        signimage.push(result)
        await this.setState({ signimage })
        await this.onSave()
        // alert(JSON.stringify(result))
    }

    _onDragEvent() {
        // This callback will be called when the user enters signature
        // console.log("dragged");
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
                <Text style={[styles.bold, { color: 'white', fontSize: 26 }]}>{`ลายเซ็นต์`}</Text>
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
    }

    render() {
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
                <View style={{ flex: 1, padding: 5 }}>
                    <SignatureCapture
                        style={[{ flex: 1 }, styles.signature]}
                        ref="sign"
                        onSaveEvent={this._onSaveEvent}
                        onDragEvent={this._onDragEvent}
                        saveImageFileInExtStorage={false}
                        showNativeButtons={false}
                        showTitleLabel={false}
                        backgroundColor="#FEF9E7"
                        strokeColor="black"
                        minStrokeWidth={4}
                        maxStrokeWidth={4}
                        viewMode={"portrait"} />

                    <View style={{ flexDirection: "row" }}>
                        <TouchableHighlight style={{ flex: 1, justifyContent: "center", alignItems: "center", height: 50, backgroundColor: "#eeeeee", margin: 10, borderWidth: 0.1, borderRadius: 4 }}
                            onPress={() => {
                                this.saveSign()
                                // await this.onSave()
                            }} >
                            <Text style={[{ fontSize: 24 }]}>บันทึก</Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={{ flex: 1, justifyContent: "center", alignItems: "center", height: 50, backgroundColor: "#eeeeee", margin: 10, borderWidth: 0.1, borderRadius: 4 }}
                            onPress={() => { this.resetSign() }} >
                            <Text style={[{ fontSize: 24 }]}>ลบ</Text>
                        </TouchableHighlight>

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

export default connect(mapStateToProps, mapDispatchToProps)(SaleSignatureScreen)