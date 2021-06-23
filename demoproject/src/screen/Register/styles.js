const React = require('react-native')
const { Dimensions, Platform } = React
const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

export default {
    layoutFx: {
        flex: 1,
        backgroundColor: '#222222',
    },
    headerBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        borderBottomWidth: 0.8,
        borderColor: '#9C9C9C',
        paddingTop: 5,
        paddingBottom: 10,
    },
    adContainer: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.03)',
        marginLeft: 0,
        paddingVertical: 20,
        paddingHorizontal: 15,
        justifyContent: 'center'
    },
    adImg: {
        width: 150,
        height: 100,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        ...Platform.select({
            ios: {
                borderRadius: 0,
            },
        }),
    },
    profile: {
        height: 250
    },
    coverImg: {
        flex: 1,
        height: 250
    },
    bgBlue: {
        width: '100%',
        flex: 1,
        height: 250,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'absolute',
        opacity: 0.95
    },
    owner: {
        flex: 1,
        width: '100%',
        height: 200,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    },
    ownerAvatarImg: {
        width: 150,
        height: 150,
        marginTop: 40
    },
    editIcon: {
        color: '#FFFFFF'
    },
    ownerInfo: {
        alignItems: 'center'
    },
    ownerName: {
        fontSize: 22,
        color: '#FFFFFF',
        marginTop: 20,
        marginBottom: 5
    },
    ownerLocation: {
        fontSize: 22,
        color: '#FFFFFF',
        opacity: 0.7,
        marginBottom: 20
    },
    formBg: {
        width: '100%',
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    formLayout: {
        borderColor: 'rgba(0,0,0,0.5)',
        borderWidth: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    textInputHalf: {
        borderBottomWidth: 1,
        borderColor: '#DDD',
        paddingHorizontal: 10,
        paddingVertical: 10,
        fontSize: 18,
        width: '100%',
        marginBottom: 5,
        color: 'rgba(0,0,0,0.8)',
    },
    btn2: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
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
}
