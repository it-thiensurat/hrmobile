import React from 'react'
import {
    View,
    Text,
    Platform,
    BackHandler,
    TextInput,
    TouchableOpacity,
    ScrollView
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

class MenuScreen extends React.Component {

    state = {
        isDatePickerVisible: false,
        leaveCode: '',
        leaveDate: new Date(),
        leaveFrom: new Date(),
        leaveTo: new Date(),
        scheduleCode: '',
        scheduleFrom: '',
        scheduleTo: '',
        comment: ''
    }

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
                <Text style={[styles.bold, { color: 'white', fontSize: 26 }]}>{`ขออนุมัติลา`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={{ paddingRight: 8 }}>

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
                <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps={'never'} keyboardDismissMode='on-drag'>
                    <View style={{ flex: 1, padding: 10 }}>
                        <View style={{ marginBottom: 10 }}>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={{ fontSize: 20, fontFamily: 'DBMed', color: 'white' }}>{`วันที่ขอลา`}</Text>
                            </View>
                            <TouchableOpacity style={[styles.shadow, styles.inputContainer, { justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }]}
                                onPress={
                                    () => this._showDateTimePicker()
                                }>
                                <Icon name={'calendar'} size={30} color={primaryColor} style={{ marginRight: 10 }} />
                                <TextInput
                                    placeholder='วันที่ขอลา'
                                    ref={(input) => { this.leaveDate = input; }}
                                    autoCapitalize={'none'}
                                    returnKeyType={'next'}
                                    value={Moment(this.state.leaveDate).format("DD/MM/YYYY")}
                                    style={[styles.inputSmall, { color: 'black' }]}
                                    editable={false} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={{ fontSize: 20, fontFamily: 'DBMed', color: 'white' }}>{`รหัสกะ`}</Text>
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
                                <Text style={{ fontSize: 20, fontFamily: 'DBMed', color: 'white' }}>{`ลาตั้งแต่วันที่`}</Text>
                            </View>
                            <TouchableOpacity style={[styles.shadow, styles.inputContainer, { justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }]}
                                onPress={
                                    () => this._showDateTimePicker()
                                }>
                                <Icon name={'calendar'} size={30} color={primaryColor} style={{ marginRight: 10 }} />
                                <TextInput
                                    placeholder='ลาตั้งแต่วันที่'
                                    ref={(input) => { this.leaveFrom = input; }}
                                    autoCapitalize={'none'}
                                    returnKeyType={'next'}
                                    value={Moment(this.state.leaveFrom).format("DD/MM/YYYY")}
                                    style={[styles.inputSmall, { color: 'black' }]}
                                    editable={false} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={{ fontSize: 20, fontFamily: 'DBMed', color: 'white' }}>{`ถึงวันที่`}</Text>
                            </View>
                            <TouchableOpacity style={[styles.shadow, styles.inputContainer, { justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }]}
                                onPress={
                                    () => this._showDateTimePicker()
                                }>
                                <Icon name={'calendar'} size={30} color={primaryColor} style={{ marginRight: 10 }} />
                                <TextInput
                                    placeholder='ถึงวันที่'
                                    ref={(input) => { this.leaveTo = input; }}
                                    autoCapitalize={'none'}
                                    returnKeyType={'next'}
                                    value={Moment(this.state.leaveTo).format("DD/MM/YYYY")}
                                    style={[styles.inputSmall, { color: 'black' }]}
                                    editable={false} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <RadioGroup
                                size={25}
                                thickness={2}
                                color={'white'}
                                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}
                                highlightColor='transparent'
                                onSelect={(index, value) => this.onSelectLeave(index, value)}>
                                <RadioButton value={"1"}>
                                    <Text style={{ fontSize: 20, color: 'white' }}>{`เต็มวัน`}</Text>
                                </RadioButton>
                                <RadioButton value={"2"}>
                                    <Text style={{ fontSize: 20, color: 'white' }}>{`ครึ่งเช้า`}</Text>
                                </RadioButton>
                                <RadioButton value={"3"}>
                                    <Text style={{ fontSize: 20, color: 'white' }}>{`ครึ่งบ่าย`}</Text>
                                </RadioButton>
                                <RadioButton value={"4"}>
                                    <Text style={{ fontSize: 20, color: 'white' }}>{`กำหนดเอง`}</Text>
                                </RadioButton>
                            </RadioGroup>
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={{ fontSize: 20, fontFamily: 'DBMed', color: 'white' }}>{`ตั้งแต่เวลา`}</Text>
                            </View>
                            <View style={[styles.inputSmall, styles.shadow, styles.center]}>
                                <Picker
                                    mode="dropdown"
                                    placeholder=""
                                    textStyle={{ fontSize: 18 }}
                                    itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                                    itemTextStyle={{ color: 'gray', fontSize: 18 }}
                                    style={[{ color: 'gray', width: '100%' }]}
                                    selectedValue={this.state.scheduleFrom}
                                    onValueChange={(value, index) => this.onSelectScheduleFrom(value)} >
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
                                <Text style={{ fontSize: 20, fontFamily: 'DBMed', color: 'white' }}>{`ถึงเวลา`}</Text>
                            </View>
                            <View style={[styles.inputSmall, styles.shadow, styles.center]}>
                                <Picker
                                    mode="dropdown"
                                    placeholder=""
                                    textStyle={{ fontSize: 18 }}
                                    itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                                    itemTextStyle={{ color: 'gray', fontSize: 18 }}
                                    style={[{ color: 'gray', width: '100%' }]}
                                    selectedValue={this.state.scheduleTo}
                                    onValueChange={(value, index) => this.onSelectScheduleTo(value)} >
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
                                <Text style={{ fontSize: 20, fontFamily: 'DBMed', color: 'white' }}>{`รหัสการลา`}</Text>
                            </View>
                            <View style={[styles.input, styles.shadow, styles.center]}>
                                <Picker
                                    mode="dropdown"
                                    placeholder=""
                                    textStyle={{ fontSize: 18 }}
                                    itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                                    itemTextStyle={{ color: 'gray', fontSize: 18 }}
                                    style={[{ color: 'gray', width: '100%' }]}
                                    selectedValue={this.state.scheduleTo}
                                    onValueChange={(value, index) => this.onSelectLeaveCode(value)} >
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
                                <Text style={{ fontSize: 20, fontFamily: 'DBMed', color: 'white' }}>{`รายละเอียด`}</Text>
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
                        <View style={{ marginBottom: 10 }}>
                            <View style={{ marginBottom: 5 }}>
                                <Text style={{ fontSize: 20, fontFamily: 'DBMed', color: 'white' }}>{`เอกสารแนบ`}</Text>
                            </View>
                            <TouchableOpacity style={[styles.secondaryButtonSmall, styles.shadow, styles.center]}
                                onPress={() => this.onSelectedFile()} >
                                    <Text style={[{ color: secondaryColor, fontSize: 26 }, styles.bold]}>{`Choose File`}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.marginBetweenVertical}></View>
                        <TouchableOpacity style={[styles.secondaryButton, styles.shadow, styles.center]}
                            onPress={() => this.onSaveLeave()} >
                            <Text style={[{ color: secondaryColor, fontSize: 26 }, styles.bold]}>{`บันทึกข้อมูลการลา`}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen)