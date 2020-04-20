import React from 'react'
import {
    View,
    Text,
    Platform,
    BackHandler,
    TouchableOpacity
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
    secondaryColor
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
                <Text style={[styles.bold, { color: 'white', fontSize: 26 }]}>{`เมนูใช้งาน`}</Text>
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
        return (
            <View style={{ flex: 1, backgroundColor: secondaryColor }}>
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
                <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        {/* <View style={{ width: 150, height: 150, borderColor: primaryColor, borderWidth: 1, borderRadius: 10 }}>
                            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center' }}
                                onPress={
                                    async () => {
                                        // await this.props.navigation.replace('Login')
                                    }
                                }>
                                <Icon name="briefcase" color={darkColor} size={50} />
                            </TouchableOpacity>
                        </View> */}
                        <TouchableOpacity style={{ width: 150, height: 150 }}
                            onPress={
                                () => {
                                    this.props.navigation.navigate('Leave')
                                }
                            }>
                            <LinearGradient colors={['#A2D9CE', '#36D2C7', '#76D7C4']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                <Icon name="briefcase" color={'white'} size={50} />
                                <Text style={[styles.bold, { color: 'white' }]}>ขออนุมัติลา</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <View style={{ width: 20 }} />
                        {/* <TouchableOpacity style={{ width: 150, height: 150 }}
                            onPress={
                                () => {
                                    this.props.navigation.navigate('Leave')
                                }
                            }>
                            <LinearGradient colors={['#A2D9CE', '#36D2C7', '#76D7C4']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                                <Icon name="briefcase" color={'white'} size={50} />
                            </LinearGradient>
                        </TouchableOpacity> */}
                        <View style={{ width: 150, height: 150 }}>
                            
                        </View>
                    </View>
                    <View style={[styles.center, { position: 'absolute', bottom: 20 }]}>
                        <Text style={[styles.bold, { fontSize: 12 }]}>{`\tแอพพลิเคชั่น สร้างขึ้นเพื่อใช้เป็นแผนสำรองสำหรับ บริษัท เธียรสุรัตน์ จำกัด (มหาชน) โดยมีขั้นตอนการใช้งาน ดังนี้\n`}</Text>
                        <Text style={{ fontSize: 12 }}>{`1. เมื่อถึงเวลางานที่กำหนด ให้พนักงานกดปุ่ม CHECK IN เพื่อบันทึกเวลาเข้างาน (หน้าจอสีเขียว)`}</Text>
                        <Text style={{ fontSize: 12 }}>{`2. เมื่อบันทึกเวลาเข้างานแล้ว หน้าจอจะเปลี่ยนเป็นสีแดง`}</Text>
                        <Text style={{ fontSize: 12 }}>{`3. ไม่ควรกดปุ่ม CHECK IN หรือ CHECK OUT ซ้ำๆ กันหลายครั้ง เพราะจะทำให้ข้อมูลเกิดความผิดพลาดได้`}</Text>
                        <Text style={{ fontSize: 12 }}>{`4. เมื่อถึงเวลาเลิกงาน ให้พนักงานกดปุ่ม CHECK OUT เพื่อบันทึกเวลาเลิกงาน (หน้าจอสีแดง)`}</Text>
                        <Text style={{ fontSize: 12 }}>{`5. แอพพลิเคชั่นจะมีการบันทึกตำแหน่งล่าสุดของคุณด้วย`}</Text>
                        <Text style={{ fontSize: 14, color: primaryColor }}>{`v ${VersionCheck.getCurrentVersion()}`}</Text>
                        <Text style={{ fontSize: 14, color: primaryColor }}>{`Powered by IT of Thiensurat Public Company Limited`}</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen)