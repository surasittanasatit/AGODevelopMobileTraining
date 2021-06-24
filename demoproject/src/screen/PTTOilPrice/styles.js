import DeviceInfo from 'react-native-device-info'
const React = require('react-native')
const { Platform, Dimensions } = React
let isTablet = DeviceInfo.isTablet();
const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

export default {
    layoutFx: {
        flex: 1,
    },
    bgImg: {
        flex: 1
    },
    imageLogoPtt: {
        width: 0.8 * viewportWidth,
        height: 0.09 * viewportHeight
    },
    boxView: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#1b1464',
        borderRadius: 10,
        width: '100%'
    },
    boxViewList: {
        backgroundColor: '#ffffff',
        width: '100%',
        borderWidth: 1,
        borderColor: "#3a393a",
        borderRadius: 10,
    },
    boxViewPTTName: {
        width: '45%',
        height: 80,
        marginHorizontal: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    boxViewPTTPrice: {
        backgroundColor: '#1a0a17',
        width: '50%',
        height: 80,
        marginHorizontal: 5,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
        borderBottomWidth: 0.8,
        borderColor: '#9C9C9C',
        paddingTop: 5,
        paddingBottom: 10,
    },
}
