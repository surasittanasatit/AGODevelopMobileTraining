import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { requestNotifications } from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  async componentDidMount() {
    await this.PermissionsRequest();
  }

  PermissionsRequest = async () => {
    const authorizationStatus = await messaging().requestPermission({
      provisional: true,
    });
    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
    } else if (authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
    }
    await requestNotifications(['alert', 'sound', 'badge']).then(({ status, settings }) => { console.log('Notification', status) });
    await this.getToken();
  }

  getToken = async () => {
    let fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
      this.setState({ token: fcmToken })
    }
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }} >
        <Text style={{ fontSize: 18, color: '#222222', paddingVertical: 5, fontWeight: 'bold' }} >{'FCM Token'}</Text>
        <Text style={{ fontSize: 18, color: '#222222' }} >{this.state.token}</Text>
      </View>
    )
  }
}

export default App

