import React from 'react'
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/dist/FontAwesome'

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor
} from '../utils/contants'
import styles from '../style/style'
import image from '../img/image_login.png'

class LoginScreen extends React.Component {

    render() {
        return (
            <View style={[styles.center, { flex: 1, backgroundColor: primaryColor }]}>
                <Image source={image} style={{ resizeMode: 'contain', width: 200, height: '25%', margin: 10 }} />
                <View style={styles.marginBetweenVertical}></View>
                <View style={[styles.shadow, styles.inputWithIcon]}>
                    <Icon name="user" color={secondaryColor} size={26} />
                    <TextInput style={[styles.inputContainer]}
                        ref={(input) => { this.username = input; }}
                        placeholder='Username'
                        keyboardType='email-address'
                        returnKeyType='next'
                        onBlur={false}
                        autoCapitalize={false}
                        onSubmitEditing={() => this.password.focus()} />
                </View>
                <View style={styles.marginBetweenVertical}></View>
                <View style={[styles.shadow, styles.inputWithIcon]}>
                    <Icon name="lock" color={secondaryColor} size={26} />
                    <TextInput style={[styles.inputContainer]}
                        ref={(input) => { this.password = input; }}
                        placeholder='Password'
                        keyboardType='email-address'
                        returnKeyType='done'
                        onBlur={false}
                        autoCapitalize={false}
                        onSubmitEditing={() => null} />
                </View>
                <View style={styles.marginBetweenVertical}></View>
                <TouchableOpacity style={[styles.mainButton, styles.center]}>
                    <Text style={{ color: primaryColor, fontSize: 24 }}>{`เข้าสู่ระบบ`}</Text>
                </TouchableOpacity>
                <View style={[styles.positionBottom, { alignItems: 'center', justifyContent: 'center' }]}>
                    <Text style={{ fontSize: 16, color: lightColor }}>{`Copyright © 2020 by Thiensurat Public Company Limited.`}</Text>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)