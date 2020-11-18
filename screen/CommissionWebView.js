import React from 'react'
import {
    View,
    Text,
    Image,
    Alert,
    BackHandler,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { WebView } from "react-native-webview"
import Pdf from 'react-native-pdf';
var RNFS = require('react-native-fs');

import {
    primaryColor,
    secondaryColor,
    COMMPDF_CZ,
    COMMPDF_FN,
    COMMPDF_YR,
    COMMPDF_PD
} from '../utils/contants'

import {
    CheckTypeControll,
    indicatorControll
} from '../actions'

import styles from '../style/style'

import Helper from '../utils/Helper'
import StorageService from '../utils/StorageServies'

const DEVICE_WIDTH  = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

class CommissionWebView extends React.Component {

    state = {
        url: ''
    }

    handleUrl = () => {
        var file = RNFS.DownloadDirectoryPath + 'getReportData.pdf'
        if (RNFS.exists(file)) {
            alert('Downloaded')
        }
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
        const props = this.props.reducer
        return (
            <View style={[styles.center]}>
                <Text style={[styles.bold, { color: 'white', fontSize: 26 }]}>{`Commission`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={{ paddingRight: 36 }}>

            </View>
        );
    }

    handleBack = () => {
        this.props.navigation.pop();
        return true
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack)
    }

    componentDidMount() {
        const props = this.props.reducer
        const users = props.userInfo
        let uri = ''
        const { fortnight, year, contno } = this.props.route.params
        uri = COMMPDF_CZ + users.cardid + COMMPDF_FN + fortnight + COMMPDF_YR + year + COMMPDF_PD + contno
        this.setState({ url: uri })
        BackHandler.addEventListener('hardwareBackPress', this.handleBack)
    }

    render() {

        const props = this.props.reducer
        const users = props.userInfo
        let uri = ''
        const { fortnight, year, contno } = this.props.route.params
        uri = COMMPDF_CZ + users.cardid + COMMPDF_FN + fortnight + COMMPDF_YR + year + COMMPDF_PD + contno
        const source = {uri: uri ,cache:true};

        return (
            <View style={{ flex: 1 }}>
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
                <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        // console.log(`number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        // console.log(`current page: ${page}`);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    onPressLink={(uri)=>{
                        // console.log(`Link presse: ${uri}`)
                    }}
                    style={{flex:1, width: DEVICE_WIDTH, height: DEVICE_HEIGHT}}/>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {
    CheckTypeControll,
    indicatorControll
}

export default connect(mapStateToProps, mapDispatchToProps)(CommissionWebView)