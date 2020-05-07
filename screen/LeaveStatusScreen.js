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
import circleplus from "../img/circleplus.png"

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor
} from '../utils/contants'

import styles from '../style/style'

const DEVICE_WIDTH = Dimensions.get('window').width;

class LeaveStatusScreen extends React.Component {

    state = {
        isDatePickerVisible: false,
        yearfilter: '',
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
                <Text style={[styles.bold, { color: 'white', fontSize: 26 }]}>{`ข้อมูลการลา`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={{ paddingRight: 8 }}>

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

    _renderItem = ({ item, index }) => {
        return (
            <View key={index} style={{ flexDirection: 'row' }}>
                <View style={{ flex: 30, paddingLeft: 8 }}>
                    <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>Date From</Text>
                </View>
                <View style={{ flex: 30 }}>
                    <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>Date To</Text>
                </View>
                <View style={{ flex: 40 }}>
                    <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>Leave Type</Text>
                </View>
            </View>
        )
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

                <View style={{ flex: 0.17, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ flex: 30, width: 90, height: 90, backgroundColor: '#339966', alignItems: 'center', justifyContent: 'center', margin: 4, borderRadius: 6 }}>
                            <Text style={{ fontSize: 38, fontFamily: 'DBMed', color: 'white' }}>1/7</Text>
                            <Text style={{ fontSize: 24, fontFamily: 'DBMed', color: 'white' }}>ลากิจ</Text>
                        </View>
                        <View style={{ flex: 30, width: 90, height: 90, backgroundColor: '#347C98', alignItems: 'center', justifyContent: 'center', margin: 4, borderRadius: 6 }}>
                            <Text style={{ fontSize: 38, fontFamily: 'DBMed', color: 'white' }}>2/30</Text>
                            <Text style={{ fontSize: 24, fontFamily: 'DBMed', color: 'white' }}>ลาป่วย</Text>
                        </View>
                        <View style={{ flex: 30, width: 90, height: 90, backgroundColor: '#CC0000', alignItems: 'center', justifyContent: 'center', margin: 4, borderRadius: 6 }}>
                            <Text style={{ fontSize: 38, fontFamily: 'DBMed', color: 'white' }}>0/7</Text>
                            <Text style={{ fontSize: 24, fontFamily: 'DBMed', color: 'white' }}>ลาพักร้อน</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 0.83 }}>
                    <View style={{ flexDirection: 'row', height: 65, alignItems: 'center', padding: 30 }}>
                        <Text style={{ fontSize: 24, fontFamily: 'DBMed', marginRight: 30 }}>สถิติการขอลา</Text>
                        <View style={[styles.inputSmall, styles.shadow, styles.center]}>
                            <Picker
                                mode="dropdown"
                                placeholder=""
                                textStyle={{ fontSize: 24 }}
                                itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                                itemTextStyle={{ color: 'gray', fontSize: 24 }}
                                style={[{ color: 'gray', width: '100%' }]}
                                selectedValue={this.state.yearfilter}
                                onValueChange={(value, index) => this.onSelectYear(value)} >
                                {
                                    // title.map((value, index) => {
                                    //     return (<Picker.Item key={index} label={value.NameTh} value={value.Id} />);
                                    // })
                                }
                            </Picker>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', height: 50, alignItems: 'center', backgroundColor: '#F5F5F5' }}>
                        <View style={{ flex: 30, paddingLeft: 8 }}>
                            <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>From</Text>
                        </View>
                        <View style={{ flex: 30 }}>
                            <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>To</Text>
                        </View>
                        <View style={{ flex: 40 }}>
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
                    </ScrollView>

                    <TouchableOpacity activeOpacity={0.5} style={{ position: 'absolute', width: 55, height: 55, alignItems: 'center', justifyContent: 'center', right: 25, bottom: 25 }}
                        onPress={
                            () => {
                                this.props.navigation.navigate('Leave')
                            }
                        }>

                        {/* <Icon name={'plus-circle'} size={55} color={secondaryColor} style={{ resizeMode: 'contain' }} /> */}

                        <Image source={circleplus}
                            style={{ resizeMode: 'contain', width: 50, height: 50 }} />
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LeaveStatusScreen)