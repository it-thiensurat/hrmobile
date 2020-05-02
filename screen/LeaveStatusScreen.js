import React from 'react'
import {
    View,
    Text,
    Image,
    Platform,
    BackHandler,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Alert
} from 'react-native'
import Moment from 'moment'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
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
                <Text style={[styles.bold, { color: 'white', fontSize: 26 }]}>{`สถานะการลา`}</Text>
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

                <View style={{ flex: 0.15, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 80, height: 80, backgroundColor: 'red', margin: 4 }}></View>
                        <View style={{ width: 80, height: 80, backgroundColor: 'green', margin: 4 }}></View>
                        <View style={{ width: 80, height: 80, backgroundColor: 'blue', margin: 4 }}></View>
                        <View style={{ width: 80, height: 80, backgroundColor: 'pink', margin: 4 }}></View>
                    </View>
                </View>
                <View style={{ flex: 0.85 }}>

                    <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps={'never'} keyboardDismissMode='on-drag'>
                        
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