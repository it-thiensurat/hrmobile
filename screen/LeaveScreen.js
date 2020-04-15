import React from 'react'
import {
    View,
    Text,
    Platform,
    BackHandler,
    TouchableOpacity
} from 'react-native'
var moment = require('moment');
import { connect } from 'react-redux'
import VersionCheck from 'react-native-version-check'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor
} from '../utils/contants'

import styles from '../style/style'

class MenuScreen extends React.Component {

    ComponentLeft = () => {
        return (
            <View>
                <TouchableOpacity onPress={() => this.handleBack()} style={{ paddingLeft: 8 }}>
                    <Icon name='chevron-left' size={22} color='white' />
                </TouchableOpacity>
            </View>
        );
    }

    ComponentCenter = () => {
        return (
            <View style={[styles.center]}>
                <Text style={[styles.bold, { color: 'white', fontSize: 26 }]}>{`การลางาน`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={{ paddingRight: 8 }}>

            </View>
        );
    }

    handleBack = () => {
        this.props.navigation.pop();
            return true;
        // if (this.props.navigation.state.routeName == 'Leave') {
        //     this.props.navigation.pop();
        //     return true;
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
                <View style={{ flex: 1 }}>
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