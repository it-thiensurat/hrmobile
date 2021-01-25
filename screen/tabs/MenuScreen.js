import React from 'react'
import {
    View,
    Text,
    Platform,
    BackHandler,
    TouchableOpacity,
    Linking,
    Dimensions,
    ScrollView
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
    LEAVE03,
    LEAVE05,
    OT02,
    OT07,
    OTHER01,
    OTHER02
} from '../../utils/contants'

import styles from '../../style/style'

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

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
                    <ScrollView>
                        <View style={{ width: DEVICE_WIDTH }}>
                            <Text style={[styles.bold, { fontSize: 22, backgroundColor: '#D1F2EB', borderRadius: 20, color: secondaryColor, alignSelf: 'flex-start', paddingLeft: 12, marginTop: 10 }]}>การลา / แก้ไขการลงเวลา    </Text>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 2, marginTop: 5, marginLeft: 8 }}>
                            <View style={{ flex: 0.35 }}>
                                <TouchableOpacity style={{ width: 105, height: 105 }}
                                    onPress={
                                        () => {
                                            this.props.navigation.navigate('Webview', { pageid: LEAVE01 })
                                        }
                                    }>
                                    <LinearGradient colors={['#6BB588', '#419B89', '#2B7F83']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                        <Icon name="plane" color={'white'} size={45} />
                                        <Text style={[styles.bold, { fontSize: 20, color: 'white', marginTop: 5 }]}>ขออนุมัติลา</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: 5 }} />
                            <View style={{ flex: 0.35 }}>
                                <TouchableOpacity style={{ width: 105, height: 105 }}
                                    onPress={
                                        () => {
                                            this.props.navigation.navigate('Webview', { pageid: OT02 })
                                        }
                                    }>
                                    <LinearGradient colors={['#6BB588', '#419B89', '#2B7F83']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                        <Icon name="history" color={'white'} size={45} />
                                        <Text style={[styles.bold, { fontSize: 18, color: 'white', marginTop: 5 }]}>ขอแก้ไขการลงเวลา</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: 5 }} />
                            <View style={{ flex: 0.35 }}>
                                <TouchableOpacity style={{ width: 105, height: 105 }}
                                    onPress={
                                        () => {
                                            // this.props.navigation.navigate('Webview', { pageid: LEAVE03 })
                                            let uri = ''
                                            uri = WEBURL + COMPCODE + users.companyId + EMPID + users.empForWeb + PAGEID + LEAVE03 + VERIFY
                                            Linking.openURL(uri)
                                        }
                                    }>
                                    <LinearGradient colors={['#6BB588', '#419B89', '#2B7F83']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                        <Icon name="address-book" color={'white'} size={45} />
                                        <Text style={[styles.bold, { fontSize: 16, color: 'white', marginTop: 5 }]}>ตรวจสอบสิทธิ์การลา</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 2, marginLeft: 8 }}>
                            <View style={{ flex: 0.35 }}>
                                <TouchableOpacity style={{ width: 105, height: 105 }}
                                    onPress={
                                        () => {
                                            // this.props.navigation.navigate('Webview', { pageid: OTHER02 })
                                            let uri = ''
                                            uri = WEBURL + COMPCODE + users.companyId + EMPID + users.empForWeb + PAGEID + OTHER02 + VERIFY
                                            Linking.openURL(uri)
                                        }
                                    }>
                                    <LinearGradient colors={['#6BB588', '#419B89', '#2B7F83']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                        <Icon name="calendar" color={'white'} size={45} />
                                        <Text style={[styles.bold, { fontSize: 15, color: 'white', marginTop: 5 }]}>รายงานการมาปฎิบัติงาน</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: 5 }} />
                            <View style={{ flex: 0.35 }}>
                                <View style={{ width: 105, height: 105 }} />
                            </View>
                            <View style={{ width: 5 }} />
                            <View style={{ flex: 0.3 }}>
                                <View style={{ width: 105, height: 105 }} />
                            </View>
                        </View>
                        <View style={{ width: DEVICE_WIDTH }}>
                            <Text style={[styles.bold, { fontSize: 22, backgroundColor: '#D6EAF8', borderRadius: 20, color: secondaryColor, alignSelf: 'flex-start', paddingLeft: 12, marginTop: 10 }]}>การอนุมัติ    </Text>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 2, marginTop: 5, marginLeft: 8 }}>
                            <View style={{ flex: 0.35 }}>
                                <TouchableOpacity style={{ width: 105, height: 105 }}
                                    onPress={
                                        () => {
                                            this.props.navigation.navigate('Webview', { pageid: LEAVE05 })
                                        }
                                    }>
                                    <LinearGradient colors={['#86A8E7', '#5C7EC1', '#496499']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                        <Icon name="edit" color={'white'} size={45} />
                                        <Text style={[styles.bold, { fontSize: 18, color: 'white', marginTop: 5 }]}>อนุมัติการลา</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: 5 }} />
                            <View style={{ flex: 0.35 }}>
                                <TouchableOpacity style={{ width: 105, height: 105 }}
                                    onPress={
                                        () => {
                                            this.props.navigation.navigate('Webview', { pageid: OT07 })
                                        }
                                    }>
                                    <LinearGradient colors={['#86A8E7', '#5C7EC1', '#496499']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                        <Icon name="edit" color={'white'} size={45} />
                                        <Text style={[styles.bold, { fontSize: 16, color: 'white', marginTop: 5 }]}>อนุมัติแก้ไขการลงเวลา</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: 5 }} />
                            <View style={{ flex: 0.35 }}>
                                <View style={{ width: 105, height: 105 }} />
                            </View>
                        </View>
                        <View style={{ width: DEVICE_WIDTH }}>
                            <Text style={[styles.bold, { fontSize: 22, backgroundColor: '#FFA0A0', borderRadius: 20, color: secondaryColor, alignSelf: 'flex-start', paddingLeft: 12, marginTop: 10 }]}>การรับรู้รายรับ    </Text>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 2, marginTop: 5, marginLeft: 8 }}>
                            <View style={{ flex: 0.35 }}>
                                <TouchableOpacity style={{ width: 105, height: 105 }}
                                    onPress={
                                        () => {
                                            // this.props.navigation.navigate('Webview', { pageid: OTHER01 })
                                            let uri = ''
                                            uri = WEBURL + COMPCODE + users.companyId + EMPID + users.empForWeb + PAGEID + OTHER01 + VERIFY
                                            Linking.openURL(uri)
                                        }
                                    }>
                                    <LinearGradient colors={['#F1948A', '#EC7063', '#E74C3C']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                        <Icon name="money" color={'white'} size={45} />
                                        <Text style={[styles.bold, { fontSize: 18, color: 'white', marginTop: 5 }]}>ใบสำคัญรับเงินเดือน</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: 5 }} />
                            <View style={{ flex: 0.35 }}>
                                <TouchableOpacity style={{ width: 105, height: 105 }}
                                    onPress={
                                        () => {
                                            this.props.navigation.navigate('Commission')
                                        }
                                    }>
                                    <LinearGradient colors={['#F1948A', '#EC7063', '#E74C3C']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                        <Icon name="paste" color={'white'} size={45} />
                                        <Text style={[styles.bold, { fontSize: 18, color: 'white', marginTop: 5 }]}>รายงาน</Text>
                                        <Text style={[styles.bold, { fontSize: 16, color: 'white'}]}>ค่าคอมมิชชั่น / หนี้สูญ</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: 5 }} />
                            <View style={{ flex: 0.35 }}>
                                <View style={{ width: 105, height: 105 }} />
                            </View>
                        </View>
                        <View style={{ width: DEVICE_WIDTH }}>
                            <Text style={[styles.bold, { fontSize: 22, backgroundColor: '#54EFD1', borderRadius: 20, color: secondaryColor, alignSelf: 'flex-start', paddingLeft: 12, marginTop: 10 }]}>ฝ่ายขาย    </Text>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 2, marginTop: 5, marginLeft: 8 }}>
                            <View style={{ flex: 0.35 }}>
                            <TouchableOpacity style={{ width: 105, height: 105 }}
                                    onPress={
                                        () => {
                                            this.props.navigation.navigate('SaleCheck')
                                        }
                                    }>
                                    <LinearGradient colors={['#54EFD1', '#10E2E6', '#00D3F3']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                        <Icon name="check-square" color={'white'} size={45} />
                                        <Text style={[styles.bold, { fontSize: 18, color: 'white', marginTop: 5 }]}>ลงเวลาทีมขาย</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: 5 }} />
                            <View style={{ flex: 0.35 }}>
                                <TouchableOpacity style={{ width: 105, height: 105 }}
                                    onPress={
                                        () => {
                                            this.props.navigation.navigate('SupApprove')
                                        }
                                    }>
                                    <LinearGradient colors={['#54EFD1', '#10E2E6', '#00D3F3']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                        <Icon name="edit" color={'white'} size={45} />
                                        <Text style={[styles.bold, { fontSize: 18, color: 'white', marginTop: 5 }]}>อนุมัติเวลาทีมขาย</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: 5 }} />
                            <View style={{ flex: 0.35 }}>
                                <View style={{ width: 105, height: 105 }} />
                            </View>
                        </View>
                        <View style={{ width: DEVICE_WIDTH }}>
                            <Text style={[styles.bold, { fontSize: 22, backgroundColor: '#FFE4E1', borderRadius: 20, color: secondaryColor, alignSelf: 'flex-start', paddingLeft: 12, marginTop: 10 }]}>อื่นๆ    </Text>
                        </View>
                        <View style={{ flexDirection: 'row', padding: 2, marginTop: 5, marginBottom: 15, marginLeft: 8 }}>
                            <View style={{ flex: 0.35 }}>
                                <TouchableOpacity style={{ width: 105, height: 105 }}
                                    onPress={
                                        () => {
                                            // this.props.navigation.navigate('Webview', { pageid: OTHER01 })
                                            // let uri = ''
                                            // uri = WEBURL + COMPCODE + users.companyId + EMPID + users.empForWeb + PAGEID + OTHER01 + VERIFY
                                            Linking.openURL('moodlemobile://com.moodle.moodlemobile')
                                        }
                                    }>
                                    <LinearGradient colors={['#FFB6A2', '#FFACB9', '#EEA8C7']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                        <Icon name="graduation-cap" color={'white'} size={45} />
                                        <Text style={[styles.bold, { fontSize: 20, color: 'white', marginTop: 5 }]}>KM</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: 5 }} />
                            <View style={{ flex: 0.35 }}>
                                <TouchableOpacity style={{ width: 105, height: 105 }}
                                    onPress={
                                        () => {
                                            this.props.navigation.navigate('Webview', { pageid: 'PMS' })
                                        }
                                    }>
                                    <LinearGradient colors={['#FFB6A2', '#FFACB9', '#EEA8C7']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                        <Icon name="star" color={'white'} size={45} />
                                        <Text style={[styles.bold, { fontSize: 18, color: 'white', marginTop: 5 }]}>PMS</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: 5 }} />
                            <View style={{ flex: 0.35 }}>
                                <View style={{ width: 105, height: 105 }} />
                            </View>
                        </View>
                        {/* <View style={[styles.center, { padding: 10 }]}>
                        <Text style={[styles.bold, { fontSize: 16 }]}>{`\tแอพพลิเคชั่น สร้างขึ้นเพื่อใช้เป็นแผนสำรองสำหรับ บริษัท เธียรสุรัตน์ จำกัด (มหาชน) โดยมีขั้นตอนการใช้งาน ดังนี้\n`}</Text>
                        <Text style={{ fontSize: 18 }}>{`1. เมื่อถึงเวลาเข้างานที่กำหนด ให้พนักงานกดปุ่ม CHECK IN / ลงเวลาเข้างาน เพื่อเข้าหน้าลงเวลาเข้างาน (หน้าจอสีเขียว) แล้วกดที่ปุ่ม กดปุ่มเพื่อลงเวลาเข้างาน (บันทึกเวลาเข้างาน)\n2. เมื่อบันทึกเวลาเข้างานแล้ว หน้าจอจะแสดงข้อความ "บันทึกเวลางานเรียบร้อย" แล้วจะพากลับมาที่หน้าหลัก (หน้าจอจะแสดงเวลาที่กดเข้างาน)\n3. เมื่อถึงเวลาเลิกงาน ให้พนักงานกดปุ่ม CHECK OUT เพื่อเข้าหน้าลงเวลาออกงาน (หน้าจอสีแดง) แล้วกดที่ปุ่ม กดปุ่มเพื่อลงเวลาออกงาน (บันทึกเวลาออกงาน)\n4. เมื่อบันทึกเวลาออกงานแล้ว หน้าจอจะแสดงข้อความ "บันทึกเวลางานเรียบร้อย" แล้วจะพากลับมาที่หน้าหลัก (หน้าจอจะแสดงเวลาที่กดออกงาน)\n5. ไม่ควรกดปุ่ม CHECK IN หรือ CHECK OUT ซ้ำๆ กันหลายครั้ง เพราะจะทำให้ข้อมูลเกิดความผิดพลาดได้\n6. แอพพลิเคชั่นจะมีการบันทึกตำแหน่งล่าสุดของคุณด้วย`}</Text>
                        <Text style={{ fontSize: 14, color: primaryColor }}>{`v ${VersionCheck.getCurrentVersion()}`}</Text>
                        <Text style={{ fontSize: 14, color: primaryColor }}>{`Powered by IT of Thiensurat Public Company Limited`}</Text>
                    </View> */}
                    </ScrollView>
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