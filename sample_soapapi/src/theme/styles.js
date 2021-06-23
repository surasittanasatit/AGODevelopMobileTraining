import DeviceInfo from 'react-native-device-info'
const React = require('react-native')
const { Platform, Dimensions } = React
let isTablet = DeviceInfo.isTablet();
const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");

export default {
  layout: {
    flexGrow: 1,
  },
  layoutFx: {
    flex: 1,
  },
  layoutFxCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
}
