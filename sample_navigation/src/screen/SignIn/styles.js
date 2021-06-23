const React = require('react-native')
const { Dimensions, Platform } = React
const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

export default {
    layoutFx: {
        flex: 1,
        backgroundColor: '#222222',
    },
    section: {
        width: '100%',
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    logo: {
        marginVertical: 20,
    },
    boxInput: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        marginVertical: 3
    },
    signBg: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        elevation: 10,
        shadowOffset: {
            width: 15,
            height: 15
        },
        shadowColor: '#999',
        shadowOpacity: 0.1,
        shadowRadius: 0,
        marginTop: 5,
        ...Platform.select({
            ios: {
                shadowOffset: {
                    width: 5,
                    height: 5
                },
            },
        }),
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10
    },
    textInput: {
        width: '90%',
        fontSize: 0.045 * viewportWidth,
        paddingVertical: 15,
        paddingLeft: 10,
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(236, 92, 2, 1)',
        padding: 15
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
        height: 20,
        width: 20,
    },
    notifyText: {
        color: "#FFFFFF",
        textAlign: 'left',
        fontSize: 0.045 * viewportWidth,
        marginLeft: 10,
    },
}
