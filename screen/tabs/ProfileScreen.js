import React from 'react'
import {
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux'

import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor
} from '../../utils/contants'

class ProfileScreen extends React.Component {

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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)