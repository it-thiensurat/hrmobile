import React from 'react'
import {
    View,
    Text,
    BackHandler,
} from 'react-native'
import { connect } from 'react-redux'

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor
} from '../../utils/contants'

class MenuScreen extends React.Component {

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
        return(
            <View style={{ flex: 1 }}>
                <Text>{`COMING SOON...`}</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen)