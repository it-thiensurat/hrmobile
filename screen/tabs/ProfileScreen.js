import React from 'react'
import {
    View,
    Text,
    BackHandler,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor
} from '../../utils/contants'

import styles from '../../style/style'
import StorageService from '../../utils/StorageServies'

class ProfileScreen extends React.Component {

    ComponentLeft = () => {
        return (
            <View>
            </View>
        );
    }

    ComponentCenter = () => {
        const props = this.props.reducer
        return (
            <View style={[styles.center]}>
                <Text style={[styles.bold, { color: primaryColor, fontSize: 26 }]}>{`PROFILE`}</Text>
            </View>
        );
    }

    ComponentRight = () => {
        return (
            <View style={[styles.center, { padding: 6 }]}>
                <TouchableOpacity
                    onPress={
                        async () => {
                            await StorageService.clear()
                            await this.props.navigation.replace('Login')
                        }
                    }>
                    <Icon name="power-off" color={darkColor} size={24} />
                </TouchableOpacity>
            </View>
        );
    }

    handleBack = () => {
        return true
        // if (this.props.navigation.state.routeName == 'Profile') {
        //     return true
        // }
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBack);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <NavigationBar
                    componentLeft={this.ComponentLeft}
                    componentCenter={this.ComponentCenter}
                    componentRight={this.ComponentRight}
                    navigationBarStyle={{
                        backgroundColor: 'white',
                        elevation: 0,
                        shadowOpacity: 0,
                    }}
                    statusBarStyle={{
                        backgroundColor: secondaryColor,
                        elevation: 0,
                        shadowOpacity: 0,
                    }} />
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    reducer: state.fetchReducer
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)