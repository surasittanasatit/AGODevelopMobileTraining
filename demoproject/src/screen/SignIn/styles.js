const React = require("react-native");
const { Platform, Dimensions } = React;
import DeviceInfo from 'react-native-device-info'
import { COLOR, FAMILY, SIZE } from '@theme/typography'
const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");
let isTablet = DeviceInfo.isTablet();

export default {
    layoutFx: {
        flex: 1,
        backgroundColor: '#222222',
    },
    section: {
        width: '100%',
        paddingHorizontal: 30,
        marginTop: 40,
    },
    logo: {
        marginVertical: 20,
        alignItems: 'center',
    },
    boxInput: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        marginVertical: 3,
        borderRadius: 10,
    },
    signBg: {
        width: '100%',
        shadowColor: '#999',
        shadowOpacity: 0.1,
        shadowRadius: 0,
        marginTop: 5,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        width: '90%',
        fontSize: 0.045 * viewportWidth,
        paddingLeft: 10,
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(236, 92, 2, 1)',
        padding: 10,
        borderRadius: 10,
    },
    btn2: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(56, 64, 90, 1)',
        padding: 10,
        borderRadius: 10,
    },
    btnText: {
        fontSize: 0.045 * viewportWidth,
        color: 'rgba(0, 0, 0, 1)',
        alignSelf: 'center'
    },
    loginBtnText: {
        fontSize: 0.045 * viewportWidth,
        color: '#FFFFFF',
        //textTransform: 'uppercase'
    },
    notifyChecked: {
        height: 18,
        width: 18,
    },
    notifyText: {
        color: "#FFFFFF",
        textAlign: 'left',
        fontSize: 0.045 * viewportWidth,
        marginLeft: 10,
    },
    btnEye: {
        position: "absolute",
        right: 10
    },
    iconColor: {
        fontSize: 0.05 * viewportWidth,
        color: 'rgba(0, 0, 0, 1)',
    },
    boxIcon: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        height: 50,
        width: '10%'
    },
    textTitle: {
        color: "#FFFFFF",
        textAlign: 'center',
        fontSize: 0.065 * viewportWidth,
        fontWeight: 'bold',
    },
    iconStatus: {
        color: COLOR.green,
        fontSize: isTablet == false ? SIZE.higantic : SIZE.large,
    },
    txtStatus: {
        fontFamily: FAMILY.bold,
        color: COLOR.green,
        textAlign: 'left',
        fontSize: isTablet == false ? SIZE.compact : SIZE.tiny,
        marginLeft: 5,
    },
}
