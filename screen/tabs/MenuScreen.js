import React from 'react'
import {
    View,
    Text,
    Platform,
    BackHandler,
    TouchableOpacity,
    Linking
} from 'react-native'
import { connect } from 'react-redux'
import VersionCheck from 'react-native-version-check'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import LinearGradient from 'react-native-linear-gradient'

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor,
    WEBURL,
    COMPCODE,
    EMPID,
    PAGEID,
    VERIFY,
    LEAVE01,
    LEAVE05,
    OT02,
    OT07,
    OTHER01
} from '../../utils/contants'

import styles from '../../style/style'

class MenuScreen extends React.Component {

    ComponentLeft = () => {
        return (
            <View>

            </View>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center]}>
                <Text style={[styles.bold, { color: 'white', fontSize: 26 }]}>{`เมนู`}</Text>
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
        // if (this.props.navigation.state.routeName == 'Profile') {
        //     return true
        // }
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    render() {
        const users = this.props.reducer.userInfo
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
                    <View style={{ flexDirection: 'row', padding: 10, marginTop: 10 }}>
                        <TouchableOpacity style={{ width: 150, height: 150 }}
                            onPress={
                                () => {
                                    this.props.navigation.navigate('Webview', { pageid: LEAVE01 })
                                }
                            }>
                            <LinearGradient colors={['#6BB588', '#419B89', '#2B7F83']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                <Icon name="address-book" color={'white'} size={50} />
                                <Text style={[styles.bold, { color: 'white' }]}>ขออนุมัติลา</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={{ width: 20 }} />
                        <TouchableOpacity style={{ width: 150, height: 150 }}
                            onPress={
                                () => {
                                    this.props.navigation.navigate('Webview', { pageid: OT02 })
                                }
                            }>
                            <LinearGradient colors={['#86A8E7', '#5C7EC1', '#496499']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                <Icon name="history" color={'white'} size={50} />
                                <Text style={[styles.bold, { color: 'white' }]}>ขอแก้ไขการลงเวลา</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{ flexDirection: 'row', padding: 10 }}>
                        <TouchableOpacity style={{ width: 150, height: 150 }}
                            onPress={
                                () => {
                                    this.props.navigation.navigate('Leave')
                                }
                            }>
                            <LinearGradient colors={['#FFB6A2', '#FFACB9', '#EEA8C7']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                <Icon name="calendar" color={'white'} size={50} />
                                <Text style={[styles.bold, { color: 'white' }]}>ปฏิทิน</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={{ width: 20 }} />
                        <TouchableOpacity style={{ width: 150, height: 150 }}
                            onPress={
                                () => {
                                    this.props.navigation.navigate('Leave')
                                }
                            }>
                            <LinearGradient colors={['#54EFD1', '#10E2E6', '#00D3F3']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                <Icon name="sitemap" color={'white'} size={50} />
                                <Text style={[styles.bold, { color: 'white' }]}>องค์กร</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <TouchableOpacity style={{ width: 150, height: 150 }}
                            onPress={
                                () => {
                                    this.props.navigation.navigate('Webview', { pageid: LEAVE05 })
                                }
                            }>
                            <LinearGradient colors={['#AD82F7', '#8867C1', '#523E74']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                <Icon name="check" color={'white'} size={50} />
                                <Text style={[styles.bold, { color: 'white' }]}>อนุมัติการลา</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={{ width: 20 }} />
                        <TouchableOpacity style={{ width: 150, height: 150 }}
                            onPress={
                                () => {
                                    this.props.navigation.navigate('Webview', { pageid: OT07 })
                                }
                            }>
                            <LinearGradient colors={['#0099cc', '#0077cc', '#0066cc']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                <Icon name="check" color={'white'} size={50} />
                                <Text style={[styles.bold, { color: 'white' }]}>อนุมัติแก้ไขการลงเวลา</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <TouchableOpacity style={{ width: 150, height: 150 }}
                            onPress={
                                () => {
                                    // this.props.navigation.navigate('Webview', { pageid: OTHER01 })
                                    let uri = ''
                                    uri = WEBURL + COMPCODE + users.companyId + EMPID + users.empForWeb + PAGEID + OTHER01 + VERIFY
                                    Linking.openURL(uri)
                                }
                            }>
                            <LinearGradient colors={['#F1948A', '#EC7063', '#E74C3C']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                <Icon name="money" color={'white'} size={50} />
                                <Text style={[styles.bold, { color: 'white' }]}>ใบสำคัญรับเงินเดือน</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={{ width: 20 }} />
                        <View style={{ width: 150, height: 150 }}></View>
                        {/* <TouchableOpacity style={{ width: 150, height: 150 }}
                            onPress={
                                () => {
                                    this.props.navigation.navigate('Webview', { pageid: OT07 })
                                }
                            }>
                            <LinearGradient colors={['#0099cc', '#0077cc', '#0066cc']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                <Icon name="check" color={'white'} size={50} />
                                <Text style={[styles.bold, { color: 'white' }]}>อนุมัติแก้ไขการลงเวลา</Text>
                            </LinearGradient>
                        </TouchableOpacity> */}
                    </View>
                    {/* <View style={[styles.center, { padding: 10 }]}>
                        <Text style={[styles.bold, { fontSize: 16 }]}>{`\tแอพพลิเคชั่น สร้างขึ้นเพื่อใช้เป็นแผนสำรองสำหรับ บริษัท เธียรสุรัตน์ จำกัด (มหาชน) โดยมีขั้นตอนการใช้งาน ดังนี้\n`}</Text>
                        <Text style={{ fontSize: 18 }}>{`1. เมื่อถึงเวลาเข้างานที่กำหนด ให้พนักงานกดปุ่ม CHECK IN / ลงเวลาเข้างาน เพื่อเข้าหน้าลงเวลาเข้างาน (หน้าจอสีเขียว) แล้วกดที่ปุ่ม กดปุ่มเพื่อลงเวลาเข้างาน (บันทึกเวลาเข้างาน)\n2. เมื่อบันทึกเวลาเข้างานแล้ว หน้าจอจะแสดงข้อความ "บันทึกเวลางานเรียบร้อย" แล้วจะพากลับมาที่หน้าหลัก (หน้าจอจะแสดงเวลาที่กดเข้างาน)\n3. เมื่อถึงเวลาเลิกงาน ให้พนักงานกดปุ่ม CHECK OUT เพื่อเข้าหน้าลงเวลาออกงาน (หน้าจอสีแดง) แล้วกดที่ปุ่ม กดปุ่มเพื่อลงเวลาออกงาน (บันทึกเวลาออกงาน)\n4. เมื่อบันทึกเวลาออกงานแล้ว หน้าจอจะแสดงข้อความ "บันทึกเวลางานเรียบร้อย" แล้วจะพากลับมาที่หน้าหลัก (หน้าจอจะแสดงเวลาที่กดออกงาน)\n5. ไม่ควรกดปุ่ม CHECK IN หรือ CHECK OUT ซ้ำๆ กันหลายครั้ง เพราะจะทำให้ข้อมูลเกิดความผิดพลาดได้\n6. แอพพลิเคชั่นจะมีการบันทึกตำแหน่งล่าสุดของคุณด้วย`}</Text>
                        <Text style={{ fontSize: 14, color: primaryColor }}>{`v ${VersionCheck.getCurrentVersion()}`}</Text>
                        <Text style={{ fontSize: 14, color: primaryColor }}>{`Powered by IT of Thiensurat Public Company Limited`}</Text>
                    </View> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen)