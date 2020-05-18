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
    Alert
} from 'react-native'
import Moment from 'moment'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { Picker } from "native-base"
import DateTimePickerModal from "react-native-modal-datetime-picker"

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor
} from '../utils/contants'

import styles from '../style/style'

const DEVICE_WIDTH = Dimensions.get('window').width;

class TimeScreen extends React.Component {

    state = {
        isDatePickerVisible: false,
        yearfilter: '',
        monthfilter: ''
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
                <Text style={[styles.bold, { color: 'white', fontSize: 26 }]}>{`เวลาเข้า/ออก`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={{ paddingRight: 36 }}>

            </View>
        );
    }

    onSelectYear(value) {
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

    async testSelectYear(value) {
        await this.setState({ yearfilter: value });
        // alert(JSON.stringify(this.state.month))
    }

    onSelectMonth(value) {
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

    async testSelectMonth(value) {
        await this.setState({ monthfilter: value });
        // alert(JSON.stringify(this.state.month))
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity key={index} style={{ flexDirection: 'row' }}
                onPress={
                    () => {
                        this.props.navigation.navigate('ChangeTime')
                    }
                }>
                <View style={{ flex: 30, paddingLeft: 8 }}>
                    <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>Date</Text>
                </View>
                <View style={{ flex: 30, paddingLeft: 8 }}>
                    <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>Time From</Text>
                </View>
                <View style={{ flex: 30 }}>
                    <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>Time To</Text>
                </View>
                <View style={{ flex: 30 }}>
                    <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>Status</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _showDateTimePicker = () =>
        this.setState({
            isDatePickerVisible: true
        });

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

                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'row', height: 65, alignItems: 'center', padding: 10 }}>
                            <Text style={{ fontSize: 24, fontFamily: 'DBMed', marginRight: 15 }}>ปี</Text>
                            <View style={[styles.inputVerySmall, styles.shadow, styles.center]}>
                                <Picker
                                    mode="dropdown"
                                    placeholder=""
                                    textStyle={{ fontSize: 24 }}
                                    itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                                    itemTextStyle={{ color: 'gray', fontSize: 24 }}
                                    style={[{ color: 'gray', width: '100%' }]}
                                    selectedValue={this.state.yearfilter}
                                    // onValueChange={(value, index) => this.onSelectYear(value)} >
                                    // {
                                    //     title.map((value, index) => {
                                    //         return (<Picker.Item key={index} label={value.NameTh} value={value.Id} />);
                                    //     })
                                    // }
                                    onValueChange={this.testSelectYear.bind(this)} >
                                    <Picker.Item label="2563" value="2563" />
                                </Picker>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', height: 65, alignItems: 'center', padding: 10 }}>
                            <Text style={{ fontSize: 24, fontFamily: 'DBMed', marginRight: 15 }}>เดือน</Text>
                            <View style={[styles.inputVerySmall, styles.shadow, styles.center]}>
                                <Picker
                                    mode="dropdown"
                                    placeholder=""
                                    textStyle={{ fontSize: 24 }}
                                    itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                                    itemTextStyle={{ color: 'gray', fontSize: 24 }}
                                    style={[{ color: 'gray', width: '100%' }]}
                                    selectedValue={this.state.monthfilter}
                                    // onValueChange={(value, index) => this.onSelectMonth(value)} >
                                    // {
                                    //     title.map((value, index) => {
                                    //         return (<Picker.Item key={index} label={value.NameTh} value={value.Id} />);
                                    //     })
                                    // }
                                    onValueChange={this.testSelectMonth.bind(this)} >
                                    <Picker.Item label="เลือกเดือน" value="00" />
                                    <Picker.Item label="มกราคม" value="01" />
                                    <Picker.Item label="กุมภาพันธ์" value="02" />
                                    <Picker.Item label="มีนาคม" value="03" />
                                    <Picker.Item label="เมษายน" value="04" />
                                    <Picker.Item label="พฤษภาคม" value="05" />
                                    <Picker.Item label="มิถุนายน" value="06" />
                                    <Picker.Item label="กรกฎาคม" value="07" />
                                    <Picker.Item label="สิงหาคม" value="08" />
                                    <Picker.Item label="กันยายน" value="09" />
                                    <Picker.Item label="ตุลาคม" value="10" />
                                    <Picker.Item label="พฤศจิกายน" value="11" />
                                    <Picker.Item label="ธันวาคม" value="12" />
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', height: 50, alignItems: 'center', backgroundColor: '#F5F5F5' }}>
                        <View style={{ flex: 35, paddingLeft: 8 }}>
                            <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>Date</Text>
                        </View>
                        <View style={{ flex: 15, paddingLeft: 4 }}>
                            <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>From</Text>
                        </View>
                        <View style={{ flex: 15, paddingLeft: 4 }}>
                            <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>To</Text>
                        </View>
                        <View style={{ flex: 40, paddingLeft: 4 }}>
                            <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>Status</Text>
                        </View>
                    </View>

                    <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps={'never'} keyboardDismissMode='on-drag'>
                        <FlatList
                            data={[]}
                            renderItem={this._renderItem}
                            initialNumToRender={10}
                            style={{ padding: 2 }}
                        />

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 35, paddingLeft: 8 }}>
                                <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>15/05/2563</Text>
                            </View>
                            <View style={{ flex: 15, paddingLeft: 4 }}>
                                <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>8:15</Text>
                            </View>
                            <View style={{ flex: 15, paddingLeft: 4 }}>
                                <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>17:30</Text>
                            </View>
                            <View style={{ flex: 40, paddingLeft: 4 }}>
                                <Text style={{ fontSize: 16, fontFamily: 'DBMed', color: 'red' }}></Text>
                            </View>
                        </View>
                        <View style={{ height: 10 }} />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 35, paddingLeft: 8 }}>
                                <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>16/05/2563</Text>
                            </View>
                            <View style={{ flex: 15, paddingLeft: 4 }}>
                                <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}></Text>
                            </View>
                            <View style={{ flex: 15, paddingLeft: 4 }}>
                                <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}></Text>
                            </View>
                            <View style={{ flex: 40, paddingLeft: 4 }}>
                                <Text style={{ fontSize: 18, fontFamily: 'DBMed', color: 'gray' }}>วันหยุดประจำสัปดาห์</Text>
                            </View>
                        </View>
                        <View style={{ height: 10 }} />
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 35, paddingLeft: 8 }}>
                                <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>17/05/2563</Text>
                            </View>
                            <View style={{ flex: 15, paddingLeft: 4 }}>
                                <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}></Text>
                            </View>
                            <View style={{ flex: 15, paddingLeft: 4 }}>
                                <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}></Text>
                            </View>
                            <View style={{ flex: 40, paddingLeft: 4 }}>
                                <Text style={{ fontSize: 18, fontFamily: 'DBMed', color: 'gray' }}>วันหยุดประจำสัปดาห์</Text>
                            </View>
                        </View>
                        <View style={{ height: 10 }} />
                        <TouchableOpacity style={{ flexDirection: 'row' }}
                            onPress={
                                () => {
                                    this.props.navigation.navigate('ChangeTime')
                                }
                            }>
                            <View style={{ flex: 35, paddingLeft: 8 }}>
                                <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>18/05/2563</Text>
                            </View>
                            <View style={{ flex: 15, paddingLeft: 4 }}>
                                <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>7:52</Text>
                            </View>
                            <View style={{ flex: 15, paddingLeft: 4 }}>
                                <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}></Text>
                            </View>
                            <View style={{ flex: 40, paddingLeft: 4 }}>
                                <Text style={{ fontSize: 18, fontFamily: 'DBMed', color: 'red' }}>ลืมรูดบัตรออก</Text>
                            </View>
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            </View >
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(TimeScreen)