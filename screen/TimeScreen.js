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
                <Text style={[styles.bold, { color: 'white', fontSize: 26 }]}>{`เวลาเข้า/ออก`}</Text>
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
                                    onValueChange={(value, index) => this.onSelectYear(value)} >
                                    {
                                        // title.map((value, index) => {
                                        //     return (<Picker.Item key={index} label={value.NameTh} value={value.Id} />);
                                        // })
                                    }
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
                                    onValueChange={(value, index) => this.onSelectMonth(value)} >
                                    {
                                        // title.map((value, index) => {
                                        //     return (<Picker.Item key={index} label={value.NameTh} value={value.Id} />);
                                        // })
                                    }
                                </Picker>
                            </View>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', height: 50, alignItems: 'center', backgroundColor: '#F5F5F5' }}>
                        <View style={{ flex: 30, paddingLeft: 8 }}>
                            <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>Date</Text>
                        </View>
                        <View style={{ flex: 30, paddingLeft: 8 }}>
                            <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>From</Text>
                        </View>
                        <View style={{ flex: 30 }}>
                            <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>To</Text>
                        </View>
                        <View style={{ flex: 30 }}>
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