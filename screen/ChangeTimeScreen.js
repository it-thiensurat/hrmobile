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
    secondaryColor
} from '../utils/contants'

import styles from '../style/style'

const DEVICE_WIDTH = Dimensions.get('window').width;

class ChangeTimeScreen extends React.Component {

    state = {
        isDatePickerVisible: false,
        ChangeDate: new Date(),
        ChangeDateFrom: new Date(),
        ChangeDateTo: new Date(),
        ChangeTimeFrom: '',
        ChangeTimeTo: '',
        scheduleCode: '',
        scheduleFrom: '',
        scheduleTo: '',
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
                <Text style={[styles.bold, { color: 'white', fontSize: 26 }]}>{`ขออนุมัติแก้ไขเวลางาน`}</Text>
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

    onSelectSchedule(value) {
        // if (value != '999') {
        //     const props = this.props.reducer
        //     let title = props.title
        //     let title_arr = title.filter((item) => item.Id == value)
        //     // console.log(title_arr)
        //     this.setState({ titleId: value, titleName: title_arr[0].NameTh })
        //     // alert(JSON.stringify(this.state.titleName))
        // } else {
        //     this.setState({ titleId: '', titleName: '' })
        // }
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
                        backgroundColor: secondaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }} />
                <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps={'never'} keyboardDismissMode='on-drag'>
                    <View style={{ flex: 1, padding: 10 }}>
                        <View style={{ marginBottom: 10 }}>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={{ fontSize: 20, fontFamily: 'DBMed', color: secondaryColor }}>{`วันที่ต้องการปรับปรุงเวลา`}</Text>
                            </View>
                            <TouchableOpacity style={[styles.shadow, styles.inputWithCalendar, { justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }]}
                                onPress={
                                    () => this._showDateTimePicker()
                                }>
                                <Icon name={'calendar'} size={26} color={secondaryColor} style={{ marginRight: 14 }} />
                                <TextInput
                                    placeholder='วันที่ต้องการปรับปรุงเวลา'
                                    ref={(input) => { this.ChangeTime = input; }}
                                    autoCapitalize={'none'}
                                    returnKeyType={'next'}
                                    value={Moment(this.state.ChangeTime).format("DD/MM/YYYY")}
                                    style={{ color: 'black' }}
                                    editable={false} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={{ fontSize: 20, fontFamily: 'DBMed', color: secondaryColor }}>{`รหัสกะ`}</Text>
                            </View>
                            <View style={[styles.input, styles.shadow, styles.center]}>
                                <Picker
                                    mode="dropdown"
                                    placeholder=""
                                    textStyle={{ fontSize: 18 }}
                                    itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                                    itemTextStyle={{ color: 'gray', fontSize: 18 }}
                                    style={[{ color: 'gray', width: '100%' }]}
                                    selectedValue={this.state.scheduleCode}
                                    onValueChange={(value, index) => this.onSelectSchedule(value)} >
                                    {
                                        // title.map((value, index) => {
                                        //     return (<Picker.Item key={index} label={value.NameTh} value={value.Id} />);
                                        // })
                                    }
                                </Picker>
                            </View>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={{ fontSize: 20, fontFamily: 'DBMed', color: secondaryColor }}>{`วันที่เริ่ม`}</Text>
                            </View>
                            <TouchableOpacity style={[styles.shadow, styles.inputWithCalendar, { justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }]}
                                onPress={
                                    () => this._showDateTimePicker()
                                }>
                                <Icon name={'calendar'} size={26} color={secondaryColor} style={{ marginRight: 14 }} />
                                <TextInput
                                    placeholder='วันที่เริ่ม'
                                    ref={(input) => { this.ChangeDateFrom = input; }}
                                    autoCapitalize={'none'}
                                    returnKeyType={'next'}
                                    value={Moment(this.state.ChangeDateFrom).format("DD/MM/YYYY")}
                                    style={{ color: 'black' }}
                                    editable={false} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={{ fontSize: 20, fontFamily: 'DBMed', color: secondaryColor }}>{`เวลาเริ่ม`}</Text>
                            </View>
                            <View style={[styles.input, styles.shadow, styles.center]}>
                                <Picker
                                    mode="dropdown"
                                    placeholder=""
                                    textStyle={{ fontSize: 18 }}
                                    itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                                    itemTextStyle={{ color: 'gray', fontSize: 18 }}
                                    style={[{ color: 'gray', width: '100%' }]}
                                    selectedValue={this.state.ChangeTimeFrom}
                                    onValueChange={(value, index) => this.onSelectChangeTimeFrom(value)} >
                                    {
                                        // title.map((value, index) => {
                                        //     return (<Picker.Item key={index} label={value.NameTh} value={value.Id} />);
                                        // })
                                    }
                                </Picker>
                            </View>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={{ fontSize: 20, fontFamily: 'DBMed', color: secondaryColor }}>{`วันที่สิ้นสุด`}</Text>
                            </View>
                            <TouchableOpacity style={[styles.shadow, styles.inputWithCalendar, { justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }]}
                                onPress={
                                    () => this._showDateTimePicker()
                                }>
                                <Icon name={'calendar'} size={26} color={secondaryColor} style={{ marginRight: 14 }} />
                                <TextInput
                                    placeholder='วันที่สิ้นสุด'
                                    ref={(input) => { this.ChangeDateTo = input; }}
                                    autoCapitalize={'none'}
                                    returnKeyType={'next'}
                                    value={Moment(this.state.ChangeDateTo).format("DD/MM/YYYY")}
                                    style={{ color: 'black' }}
                                    editable={false} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={{ fontSize: 20, fontFamily: 'DBMed', color: secondaryColor }}>{`เวลาสิ้นสุด`}</Text>
                            </View>
                            <View style={[styles.input, styles.shadow, styles.center]}>
                                <Picker
                                    mode="dropdown"
                                    placeholder=""
                                    textStyle={{ fontSize: 18 }}
                                    itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                                    itemTextStyle={{ color: 'gray', fontSize: 18 }}
                                    style={[{ color: 'gray', width: '100%' }]}
                                    selectedValue={this.state.ChangeTimeTo}
                                    onValueChange={(value, index) => this.onSelectChangeTimeTo(value)} >
                                    {
                                        // title.map((value, index) => {
                                        //     return (<Picker.Item key={index} label={value.NameTh} value={value.Id} />);
                                        // })
                                    }
                                </Picker>
                            </View>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={{ fontSize: 20, fontFamily: 'DBMed', color: secondaryColor }}>{`หมายเหตุ`}</Text>
                            </View>
                            <TextInput style={[styles.input, styles.shadow, styles.center]}
                                ref={(input) => { this.comment = input; }}
                                placeholder=""
                                returnKeyType='next'
                                onBlur={false}
                                autoCapitalize={false}
                                value={this.state.comment}
                                onChangeText={(text) => this.setState({ comment: text })} />
                        </View>
                        <View style={styles.marginBetweenVertical}></View>
                        <TouchableOpacity style={[styles.shadow, styles.center, { height: 50, width: DEVICE_WIDTH - 20, backgroundColor: secondaryColor, borderRadius: 50 / 2 }]}
                            onPress={() => this.onSaveLeave()} >
                            <Text style={[{ color: 'white', fontSize: 26 }, styles.bold]}>{`บันทึกข้อมูลการขอปรับปรุงเวลา`}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <DateTimePickerModal
                    mode="date"
                    is24Hour={true}
                    isVisible={this.state.isDatePickerVisible}
                    onConfirm={this._handleDatePicked}
                    onCancel={this._hideDateTimePicker} />
            </View >
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeTimeScreen)