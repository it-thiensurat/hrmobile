import React from 'react'
import {
    View,
    Text,
    Platform,
    BackHandler,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Dimensions
} from 'react-native'
import Moment from 'moment'
import { Picker } from "native-base"
import { connect } from 'react-redux'
import VersionCheck from 'react-native-version-check'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { RadioGroup, RadioButton } from "react-native-flexi-radio-button"

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor,
    grayColor
} from '../utils/contants'

import styles from '../style/style'

const DEVICE_WIDTH = Dimensions.get('window').width;

class ConsiderScreen extends React.Component {

    state = {
        isDatePickerVisible: false,
        comment: ''
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
                <Text style={[styles.bold, { color: 'white', fontSize: 26 }]}>{`พิจารณาอนุมัติการลา`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={{ paddingRight: 36 }}>

            </View>
        );
    }

    _showDateTimePicker = () =>
        this.setState({ isDatePickerVisible: true });

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

    handleBack = () => {
        this.props.navigation.pop();
        return true;
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    componentDidMount() {
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
                <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps={'never'} keyboardDismissMode='on-drag'>
                    <View style={{ flex: 1, padding: 10 }}>
                        <View style={{ width: DEVICE_WIDTH - 20, height: 500, borderBottomWidth: 1, borderColor: 'gray' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 4 }}>
                                    <Text style={{ flex: 0.5, fontSize: 28, fontFamily: 'DBMed' }}>{`ชื่อ-สกุล :`}</Text>
                                    <Text style={{ flex: 0.5, fontSize: 28, fontFamily: 'DBMed' }}>{`นาย สวัสดีวัน จันทร์`}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 4 }}>
                                <Text style={{ flex: 0.5, fontSize: 28, fontFamily: 'DBMed' }}>{`ประเภทการลา :`}</Text>
                                <Text style={{ flex: 0.5, fontSize: 28, fontFamily: 'DBMed' }}>{`ลากิจ`}</Text>
                            </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 4 }}>
                                <Text style={{ flex: 0.5, fontSize: 28, fontFamily: 'DBMed' }}>{`ลาตั้งแต่วันที่ :`}</Text>
                                <Text style={{ flex: 0.5, fontSize: 28, fontFamily: 'DBMed' }}>{`12/05/2563`}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', padding: 4 }}>
                                <Text style={{ flex: 0.5, fontSize: 28, fontFamily: 'DBMed' }}>{`ถึงวันที่ :`}</Text>
                                <Text style={{ flex: 0.5, fontSize: 28, fontFamily: 'DBMed' }}>{`12/05/2563`}</Text>
                        </View>
                    </View>

                    <View style={styles.marginBetweenVertical}></View>
                    <View style={{ flexDirection: 'row', alignSelf: 'center', padding: 10 }}>
                        <TouchableOpacity style={[styles.shadow, styles.center, { height: 50, width: 180, backgroundColor: 'red', borderRadius: 50 / 2 }]}
                            onPress={() => {
                                // this.onSaveLeave()
                            }}>
                            <Text style={[{ color: 'white', fontSize: 26 }, styles.bold]}>{`ไม่อนุมัติ`}</Text>
                        </TouchableOpacity>
                        <View style={{ width: 20 }} />
                        <TouchableOpacity style={[styles.shadow, styles.center, { height: 50, width: 180, backgroundColor: secondaryColor, borderRadius: 50 / 2 }]}
                            onPress={() => {
                                // this.onSaveLeave()
                            }}>
                            <Text style={[{ color: 'white', fontSize: 26 }, styles.bold]}>{`อนุมัติ`}</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </ScrollView>
            </View >
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ConsiderScreen)