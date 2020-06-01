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

class ListConsiderScreen extends React.Component {

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
                <Text style={[styles.bold, { color: 'white', fontSize: 26 }]}>{`รายการขออนุมัติการลา`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            // <View style={{ paddingRight: 36 }}>

            // </View>
            <View style={[styles.center, { paddingRight: 4 }]}>
                <TouchableOpacity style={{ width: 35, height: 35, alignItems: 'center', justifyContent: 'center' }}
                    onPress={
                        null
                        // async () => {
                        //     await this.setState({ register: [], reg_month: '0', reg_all: '0' });
                        //     await this.getData();
                        //     await this.getPeriod();
                        // }
                    }>
                    <Icon name="retweet" size={26} color={secondaryColor} />
                </TouchableOpacity>
            </View>
        );
    }

    _renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity key={index} style={{ flexDirection: 'row' }}
                onPress={
                    () => {
                        // this.props.navigation.navigate('ChangeTime')
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
                    {/* <View style={{ flexDirection: 'row', height: 50, alignItems: 'center', backgroundColor: '#F5F5F5' }}>
                        <View style={{ flex: 30, paddingLeft: 8 }}>
                            <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>Name</Text>
                        </View>
                        <View style={{ flex: 30, paddingLeft: 4 }}>
                            <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>Leave</Text>
                        </View>
                        <View style={{ flex: 35, paddingLeft: 4 }}>
                            <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>From</Text>
                        </View>
                        <View style={{ flex: 35, paddingLeft: 4 }}>
                            <Text style={{ fontSize: 24, fontFamily: 'DBMed' }}>To</Text>
                        </View>
                    </View> */}

                    <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps={'never'} keyboardDismissMode='on-drag'>
                        <FlatList
                            data={[]}
                            renderItem={this._renderItem}
                            initialNumToRender={10}
                            style={{ padding: 2 }}
                        />

                        <View style={{ height: 10 }} />
                        <TouchableOpacity style={[styles.shadow, { height: 90, width: DEVICE_WIDTH - 10, backgroundColor: '#E8F8F5', borderWidth: 1, borderColor: primaryColor, borderRadius: 4, alignSelf: 'center' }]}
                            onPress={
                                () => {
                                    this.props.navigation.navigate('Consider')
                                }
                            }>
                            <View style={{ paddingLeft: 8 }}>
                                <Text style={{ fontSize: 22, fontFamily: 'DBMed' }}>{`ชื่อ-สกุล : นาย สวัสดีวัน จันทร์`}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 4 }}>
                                <View style={{ flex: 1, paddingLeft: 4 }}>
                                    <Text style={{ fontSize: 22, fontFamily: 'DBMed' }}>{`ประเภทการลา : ลากิจ`}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 4 }}>
                                <View style={{ flex: 0.5, paddingLeft: 4 }}>
                                    <Text style={{ fontSize: 20, fontFamily: 'DBMed' }}>{`ลาตั้งแต่วันที่ : 12/05/2563`}</Text>
                                </View>
                                <View style={{ flex: 0.5, paddingLeft: 4 }}>
                                    <Text style={{ fontSize: 20, fontFamily: 'DBMed' }}>{`ถึงวันที่ : 12/05/2563`}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ height: 10 }} />
                        <TouchableOpacity style={[styles.shadow, { height: 90, width: DEVICE_WIDTH - 10, backgroundColor: '#E8F8F5', borderWidth: 1, borderColor: primaryColor, borderRadius: 4, alignSelf: 'center' }]}
                            onPress={
                                () => {
                                    this.props.navigation.navigate('Consider')
                                }
                            }>
                            <View style={{ paddingLeft: 8 }}>
                                <Text style={{ fontSize: 22, fontFamily: 'DBMed' }}>{`ชื่อ-สกุล : นาง สวัสดีวัน อังคาร`}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 4 }}>
                                <View style={{ flex: 1, paddingLeft: 4 }}>
                                    <Text style={{ fontSize: 22, fontFamily: 'DBMed' }}>{`ประเภทการลา : ลาป่วย`}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 4 }}>
                                <View style={{ flex: 0.5, paddingLeft: 4 }}>
                                    <Text style={{ fontSize: 20, fontFamily: 'DBMed' }}>{`ลาตั้งแต่วันที่ : 14/05/2563`}</Text>
                                </View>
                                <View style={{ flex: 0.5, paddingLeft: 4 }}>
                                    <Text style={{ fontSize: 20, fontFamily: 'DBMed' }}>{`ถึงวันที่ : 14/05/2563`}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={{ height: 10 }} />
                        <TouchableOpacity style={[styles.shadow, { height: 90, width: DEVICE_WIDTH - 10, backgroundColor: '#E8F8F5', borderWidth: 1, borderColor: primaryColor, borderRadius: 4, alignSelf: 'center' }]}
                            onPress={
                                () => {
                                    this.props.navigation.navigate('Consider')
                                }
                            }>
                            <View style={{ paddingLeft: 8 }}>
                                <Text style={{ fontSize: 22, fontFamily: 'DBMed' }}>{`ชื่อ-สกุล : นางสาว สวัสดีวัน พุธ`}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 4 }}>
                                <View style={{ flex: 1, paddingLeft: 4 }}>
                                    <Text style={{ fontSize: 22, fontFamily: 'DBMed' }}>{`ประเภทการลา : ลาพักร้อน`}</Text>
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 4 }}>
                                <View style={{ flex: 0.5, paddingLeft: 4 }}>
                                    <Text style={{ fontSize: 20, fontFamily: 'DBMed' }}>{`ลาตั้งแต่วันที่ : 22/05/2563`}</Text>
                                </View>
                                <View style={{ flex: 0.5, paddingLeft: 4 }}>
                                    <Text style={{ fontSize: 20, fontFamily: 'DBMed' }}>{`ถึงวันที่ : 22/05/2563`}</Text>
                                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(ListConsiderScreen)