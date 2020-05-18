import React from 'react'
import {
    View,
    Text,
    Image,
    Platform,
    ScrollView,
    BackHandler,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import { connect } from 'react-redux'
import { NavigationBar } from 'navigationbar-react-native'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

import {
    TOKEN_KEY,
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor
} from '../../utils/contants'

import styles from '../../style/style'
import StorageService from '../../utils/StorageServies'

const DEVICE_WIDTH = Dimensions.get('window').width;

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
            <View>

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

        const props = this.props.reducer

        return (
            <View style={{ flex: 1, backgroundColor: secondaryColor }}>
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
                <View style={{ alignItems: 'center', backgroundColor: primaryColor }}>
                    <View style={[styles.cruveContainer]}>
                        <View style={[styles.cruveView, { backgroundColor: 'white' }]} />
                    </View>
                    <View style={[styles.imageContainer, { borderColor: primaryColor }]}>
                        <Icon name="user" color={secondaryColor} size={60} />
                    </View>

                    {/* <Image source={{ uri: 'https://via.placeholder.com/300' }} style={[styles.imageContainer, { borderColor: primaryColor }]} /> */}
                </View>
                <ScrollView style={{ flex: 1, backgroundColor: primaryColor }}>
                    <View style={{ padding: 10 }}>
                        <View style={{ padding: 4, borderBottomWidth: 0.5, borderBottomColor: 'white', marginBottom: 15 }}>
                            <Text style={[styles.bold, { color: 'white', fontSize: 24 }]}>{`ชื่อ - นามสกุล`}</Text>
                            <Text style={[{ color: 'white', fontSize: 24, textAlignVertical: 'bottom' }]}>{`${props.userInfo.title}${props.userInfo.firstname} ${props.userInfo.lastname}`}</Text>
                        </View>
                        <View style={{ padding: 4, borderBottomWidth: 0.5, borderBottomColor: 'white', marginBottom: 15 }}>
                            <Text style={[styles.bold, { color: 'white', fontSize: 24 }]}>{`ตำแหน่ง`}</Text>
                            <Text style={[{ color: 'white', fontSize: 24, textAlignVertical: 'bottom' }]}>{`${props.userInfo.position}`}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{ height: 50, width: DEVICE_WIDTH - 100, backgroundColor: secondaryColor, borderRadius: 26, alignSelf: 'center', justifyContent: 'center' }}
                            onPress={
                                async () => {
                                    await StorageService.remove(TOKEN_KEY)
                                    await this.props.navigation.replace('Login')
                                }
                            }>
                            <Text style={[{ color: 'white', fontSize: 26, alignSelf: 'center'}, styles.bold]}>{`ออกจากระบบ`}</Text>
                    </TouchableOpacity>
                </ScrollView>
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