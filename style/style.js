import { 
    Platform, 
    StyleSheet,
    Dimensions 
} from 'react-native'
import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor
} from '../utils/contants'

const COMPONENT_HIGHT = 50;
const DEVICE_WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
    inputWithIcon: {
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        height: COMPONENT_HIGHT,
        width: DEVICE_WIDTH - 40,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        borderRadius: COMPONENT_HIGHT / 2
    },
    input: {
        paddingLeft: 15,
        alignItems: 'center',
        height: COMPONENT_HIGHT,
        width: DEVICE_WIDTH - 20,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        borderRadius: COMPONENT_HIGHT / 2
    },
    inputSmall: {
        paddingLeft: 15,
        alignItems: 'center',
        height: COMPONENT_HIGHT,
        width: DEVICE_WIDTH / 2,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        borderRadius: COMPONENT_HIGHT / 2
    },
    inputContainer: {
        width: DEVICE_WIDTH - 80,
        height: COMPONENT_HIGHT - 5,
        backgroundColor: 'transparent',
    },
    mainButton: {
        height: COMPONENT_HIGHT,
        width: DEVICE_WIDTH - 40,
        backgroundColor: secondaryColor,
        borderRadius: COMPONENT_HIGHT / 2
    },
    secondaryButton: {
        height: COMPONENT_HIGHT,
        width: DEVICE_WIDTH - 20,
        backgroundColor: primaryColor,
        borderRadius: COMPONENT_HIGHT / 2
    },
    shadow: {
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    marginBetweenVertical: {
        height: 10
    },
    bold: {
        fontFamily: 'DBMed'
    },
    positionBottom: {
        bottom: 0,
        position: 'absolute'
    },
    customTabContainner: {
        position: 'absolute',
        top: -20,
        bottom: 0,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomTab: {
        top: 5,
        width: 50,
        alignItems: 'center', 
        justifyContent: 'center',
    }
})

export default styles;