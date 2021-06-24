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
        height: 360,
    },
    adContainer: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#000000'
    },
    adPrice: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#000000'
    },
    adLocation: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    locationIcon: {
        fontSize: 20,
        color: 'rgba(0,0,0,0.5)'
    },
    locationInfo: {
        fontSize: 18,
        color: 'rgba(0,0,0,0.5)',
        marginVertical: 5
    },
    locationTopIcon: {
        color: 'rgba(0,0,0,0.5)',
        fontSize: 20,
        marginLeft: 10
    },
    locationTopInfo: {
        color: 'rgba(0,0,0,0.5)',
        fontSize: 18,
        marginTop: 3,
        marginLeft: 5
    },
}
