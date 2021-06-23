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
    bookmarkIcon: {
        position: 'absolute',
        alignSelf: 'flex-end',
        color: '#ED5D02',
        paddingRight: 10,
        fontSize: 18,
    },
    adInfo: {
        flex: 1,
        paddingHorizontal: 15
    },
    adTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000000',
    },
    adPrice: {
        fontWeight: 'bold',
        fontSize: 22,
        color: '#000000',
        marginBottom: 0
    },
    adLocation: {
        fontSize: 13,
        color: 'rgba(0, 0, 0, 0.5)',
        marginBottom: 5,
        lineHeight: 16
    },
    itemPosted: {
        marginTop: 10,
        flexDirection: 'row'
    },
    calendarIcon: {
        color: 'rgba(0,0,0,0.3)',
        marginRight: 5,
        fontSize: 14,
    },
    itemDate: {
        color: 'rgba(0,0,0,0.5)',
        fontSize: 13,
        paddingLeft: 5,
    }
}
