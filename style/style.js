import {
    Platform,
    StyleSheet,
    Dimensions
} from 'react-native'
import {
    darkColor,
    lightColor,
    primaryColor,
    secondaryColor,
    transparentGray
} from '../utils/contants'

const COMPONENT_HIGHT = 50;
const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HIGHT = Dimensions.get('window').height;
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
    inputWithCalendar: {
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
        height: COMPONENT_HIGHT,
        width: DEVICE_WIDTH - 20,
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
    inputVerySmall: {
        paddingLeft: 15,
        alignItems: 'center',
        height: COMPONENT_HIGHT,
        width: 120,
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
    secondaryButtonSmall: {
        height: COMPONENT_HIGHT,
        width: DEVICE_WIDTH / 2,
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
        fontFamily: Platform.OS == 'android' ? 'DBMed' : 'DB Helvethaica X'
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
    },
    bottomTabCircle: {
        top: -20,
        width: 74,
        height: 74,
        borderRadius: 40,
        position: 'absolute',
        backgroundColor: 'white',
    },
    bottomTabCenter: {
        width: 65,
        height: 65,
        borderRadius: 40,
        backgroundColor: transparentGray
    },
    cruveContainer: {
        alignSelf: 'center',
        width: DEVICE_WIDTH,
        overflow: 'hidden',
        height: DEVICE_HIGHT / 4
    },
    cruveView: {
        borderRadius: DEVICE_WIDTH,
        width: DEVICE_WIDTH * 2,
        height: DEVICE_WIDTH * 2,
        marginLeft: -(DEVICE_WIDTH / 2),
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden',
        backgroundColor: primaryColor
    },
    imageCircle: {
        width: 155,
        height: 155,
        borderRadius: 100,
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderWidth: 4,
        borderRadius: 100,
        borderColor: 'white',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: 'white',
        justifyContent: 'center',
        // top: (DEVICE_HIGHT / 4) - 100,
        marginLeft: -(DEVICE_WIDTH / 2),
    },
    buttonCheck: {
        marginTop: 20,
        borderWidth: 8,
        borderColor: 'white',
        width: DEVICE_WIDTH - 80,
        height: DEVICE_WIDTH - 80,
        borderRadius: DEVICE_WIDTH / 2, 
        backgroundColor: secondaryColor,
        // top: (DEVICE_HIGHT / 4) - 100
    },
    loadingIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    }
})

export default styles;