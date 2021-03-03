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
    Alert,
    Switch
} from 'react-native'
import moment from 'moment'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { Picker } from "native-base"
import ToggleSwitch from 'toggle-switch-react-native'
import FastImage from 'react-native-fast-image'
var RNFS = require('react-native-fs');

import {
    indicatorControll
} from '../actions'

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor,
    API_KEY,
    BASEURL,
    SUPTEAM_LIST,
    SUPSUBMIT,
    INSERTZKTIME
} from '../utils/contants'

import styles from '../style/style'
import Helper from '../utils/Helper'

const DEVICE_WIDTH = Dimensions.get('window').width;

class SupApproveScreen extends React.Component {

    state = {
        teamfilter: [{ team: 'กรุณาเลือกทีมขาย' }],
        teamselect: '',
        team_data: [],
        switchValue: false
    }

    getTeamSelect(value) {

        let that = this
        const props = that.props
        const users = props.reducer.userInfo
        let header = {
            'Authorization': props.reducer.token,
            'x-api-key': API_KEY
        }
        let formData = new FormData();

        formData.append('teamcode', value);
        formData.append('depid', users.DepID);
        formData.append('fnno', users.FnNo);
        formData.append('fnyear', users.FnYear);

        props.indicatorControll(true)
        Helper.post(BASEURL + SUPTEAM_LIST, formData, header, async (results) => {
            // alert(JSON.stringify(results))
            // return
            if (results.status == 'SUCCESS') {
                await that.setState({ team_data: results.data })
                await props.indicatorControll(false)
            } else {
                await props.indicatorControll(false)
                await that.setState({ team_data: [] })
                await alert(`${results.message}`)
            }
        })
    }

    async approveTeam() {

        let that = this
        const props = that.props
        const users = props.reducer.userInfo
        let header = {
            'Authorization': props.reducer.token,
            'x-api-key': API_KEY
        }
        let formData = new FormData();

        formData.append('empid', users.empId);
        formData.append('teamcheck', JSON.stringify(that.state.team_data));

        props.indicatorControll(true)
        await Helper.post(BASEURL + SUPSUBMIT, formData, header, async (results) => {
            // alert(JSON.stringify(results))
            if (results.status == 'SUCCESS') {
                await props.indicatorControll(false)
                await Alert.alert(
                    'ข้อความ',
                    `${results.message}`,
                    [
                        {
                            text: 'OK', onPress: () => that.InsertZKTime()
                        },
                    ],
                    { cancelable: false }
                )
            } else {
                await props.indicatorControll(false)
                await Alert.alert(
                    'คำเตือน',
                    `${results.message}`,
                    [
                        { text: 'OK', onPress: () => null },
                    ],
                    { cancelable: false }
                )
            }
        })
    }

    InsertZKTime() {
        let that = this
        const props = that.props
        let header = {
            'Authorization': props.reducer.token,
            'x-api-key': API_KEY
        }
        let formData = new FormData();
        formData.append('workdetail', JSON.stringify(that.state.team_data[0].WorkDetail));

        props.indicatorControll(true)
        Helper.post(BASEURL + INSERTZKTIME, formData, header, (results) => {
            props.indicatorControll(false)
            that.setState({ teamselect: 'กรุณาเลือกทีมขาย', team_data: [] })
        })
    }

    onSelectTeam(value) {
        if (value != 'กรุณาเลือกทีมขาย') {
            const users = this.props.reducer.userInfo
            let TeamList = users.SupTeamList
            let TeamList_arr = TeamList.filter((item) => item.TeamNo == value)
            this.setState({ teamselect: value })
            this.getTeamSelect(value)
        } else {
            this.setState({ teamselect: '' })
        }
    }

    onChangeValue(v, i, item, index, e) {
        let data = this.state.team_data
        v.SwitchStatus = e ? 1 : 0
        item.WorkDetail[i] = v
        data[index] = item

        this.setState({ team_data: data })
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
                <Text style={[styles.bold, { color: 'white', fontSize: 26 }]}>{`อนุมัติเวลาทีมขาย`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={{ paddingRight: 36 }}>

            </View>
        );
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

    async componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
        // await this.getTeam()
    }

    render() {
        const users = this.props.reducer.userInfo
        let TeamNo_header = [{ TeamNo: 'กรุณาเลือกทีมขาย' }]
        let TeamList = users.SupTeamList
        TeamList = TeamNo_header.concat(TeamList)
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
                <View style={{ flex: 1, padding: 2, paddingBottom: 65 }}>
                    <View style={{ marginBottom: 10, padding: 8 }}>
                        <View style={{ marginBottom: 5 }}>
                            <Text style={{ fontSize: 20, fontFamily: 'DBMed', color: secondaryColor }}>{`เลือกทีมขาย`}</Text>
                        </View>
                        <View style={[styles.input, styles.shadow, styles.center]}>
                            <Picker
                                mode="dropdown"
                                placeholder=""
                                textStyle={{ fontSize: 18 }}
                                itemStyle={{ marginLeft: 0, paddingLeft: 10 }}
                                itemTextStyle={{ color: 'gray', fontSize: 18 }}
                                style={[{ color: 'gray', width: '100%' }]}
                                selectedValue={this.state.teamselect}
                                onValueChange={(value, index) => this.onSelectTeam(value)} >
                                {
                                    TeamList.map((value, index) => {
                                        return (<Picker.Item key={index} label={value.TeamNo} value={value.TeamNo} />);
                                    })
                                }
                            </Picker>
                        </View>
                    </View>
                    {
                        this.state.team_data.map((item, index) => (
                            item.TeamID != '' ?
                                <ScrollView>
                                    <View key={index} style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={{ marginBottom: 5, alignItems: 'center', margin: 2, padding: 2 }}>
                                            <Text style={{ fontSize: 22, fontFamily: 'DBMed', color: secondaryColor }}>{`รายชื่อพนักงานขายทีม :  ${item.TeamCode}`}</Text>
                                        </View>
                                        {
                                            item.WorkDetail.map((v, i) => (
                                                v.DetailID != '' ?
                                                    <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 2, borderWidth: 0.1, borderRadius: 4, padding: 2 }}>
                                                        <View style={[styles.center, { flex: 0.25 }]}>
                                                            {/* <Icon name='grav' color={v.LeadApproveStatus === 1 ? secondaryColor : darkColor} size={34} /> */}
                                                            {/* <Image source={{ uri: v.Image }} style={{ width: 80, height: 80, resizeMode: 'cover', borderRadius: 4, borderWidth: 1, borderColor: v.SwitchStatus === 1 ? secondaryColor : darkColor }} /> */}
                                                            <FastImage
                                                                style={{ width: 80, height: 80, borderRadius: 4, borderWidth: 1, borderColor: v.SwitchStatus === 1 ? secondaryColor : darkColor }}
                                                                source={{
                                                                    uri: v.Image,
                                                                    // headers: { Authorization: 'someAuthToken' },
                                                                    priority: FastImage.priority.normal,
                                                                }}
                                                                resizeMode={FastImage.resizeMode.cover}
                                                            />
                                                        </View>
                                                        <View style={[{ flex: 0.6, justifyContent: 'center', paddingLeft: 4 }]}>
                                                            <Text style={[{ fontSize: 20 }]}>{`ชื่อ : ${v.EmpName}`}</Text>
                                                            <Text style={[{ fontSize: 20 }]}>{`รหัสพนักงาน : ${v.EmpID}`}</Text>
                                                            <Text style={[{ fontSize: 20 }]}>{`รหัสเซลล์ : ${v.SaleCode}`}</Text>
                                                            <Text style={[{ fontSize: 20 }]}>{`ลงเวลาตอน : ${v.LeadCheckTime != null ? moment(v.LeadCheckTime).format('LTS') : ''}`}</Text>
                                                            <Text style={[{ fontSize: 20, color: v.LeadApproveStatus === 1 ? secondaryColor : darkColor }]}>{`สถานะ : ${v.LeadApproveStatus == 1 ? 'ลงเวลาแล้ว' : 'ยังไม่ลงเวลา'}`}</Text>
                                                            <View style={[{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 4, paddingRight: 2 }]} />
                                                        </View>
                                                        <View style={[{ flex: 0.15, justifyContent: 'center', paddingRight: 2 }]}>
                                                            <Text style={[{ alignSelf: 'center', fontSize: 20, color: v.SwitchStatus === 1 ? secondaryColor : darkColor }]}>{v.SwitchStatus ? 'อนุมัติ' : 'ไม่อนุมัติ'}</Text>
                                                            <Switch
                                                                // value={this.state.switchValue}
                                                                // onValueChange={(switchValue) => this.setState({ switchValue })} />
                                                                value={v.SwitchStatus == 1 ? true : false}
                                                                onValueChange={(e) => this.onChangeValue(v, i, item, index, e)} />
                                                        </View>
                                                    </View>
                                                    :
                                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                                        <Text style={{ color: 'red', fontSize: 26 }}>{`ไม่พบข้อมูล`}</Text>
                                                    </View>
                                            ))
                                        }
                                    </View>
                                </ScrollView>
                                :
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <Text style={{ color: 'red', fontSize: 26 }}>{`ไม่พบข้อมูล`}</Text>
                                </View>
                        ))
                    }
                    {
                        this.state.team_data != '' ?
                            this.state.team_data[0].CostBranch != 1 ?
                                <View style={{ alignItems: 'center', width: DEVICE_WIDTH, position: 'absolute', bottom: 0 }}>
                                    <TouchableOpacity style={[styles.shadow, styles.center, { height: 50, width: '90%', alignSelf: 'center', backgroundColor: secondaryColor, borderRadius: 50 / 2, marginBottom: 12 }]}
                                        onPress={() => {
                                            this.approveTeam()
                                        }}>
                                        <Text style={[{ color: 'white', fontSize: 26 }, styles.bold]}>{`ยืนยันข้อมูลการลงเวลา`}</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                null
                            // <View style={{ alignItems: 'center', width: DEVICE_WIDTH, position: 'absolute', bottom: 0 }}>
                            //     <TouchableOpacity style={[styles.shadow, styles.center, { height: 50, width: '90%', alignSelf: 'center', backgroundColor: secondaryColor, borderRadius: 50 / 2, marginBottom: 12 }]}
                            //         onPress={() => {
                            //             this.approveTeam()
                            //         }}>
                            //         <Text style={[{ color: 'white', fontSize: 26 }, styles.bold]}>{`ยืนยันข้อมูลการลงเวลา`}</Text>
                            //     </TouchableOpacity>
                            // </View>
                            :
                            null
                    }
                </View>
            </View >
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {
    indicatorControll
}

export default connect(mapStateToProps, mapDispatchToProps)(SupApproveScreen)