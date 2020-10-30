import React from 'react'
import {
    View,
    Text,
    Image,
    Alert,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'
import { WebView } from "react-native-webview"

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

class CommissionWebView extends React.Component {

    state = {
        url: ''
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
                <WebView
                        source={{ uri: 'https://drive.google.com/viewerng/viewer?embedded=true&url=' + this.state.url }}
                        // scalesPageToFit
                        originWhitelist={['*']}
                        javaScriptEnabled={true}
                        // scalesPageToFit={true}
                        scrollEnabled={true}
                        onLoad={() => this.props.indicatorControll(true)}
                        onLoadEnd={() => this.props.indicatorControll(false)}
                        onLoadStart={() => this.props.indicatorControll(true)}
                        onResponderStart={() => this.props.indicatorControll(true)}
                    />
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