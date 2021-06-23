import React, { Component } from 'react';
import { StatusBar, View, Text, SafeAreaView, Image, TouchableOpacity, TextInput } from 'react-native';
import IconsMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import IconsFeather from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-community/async-storage'
import CheckBox from '@react-native-community/checkbox'

import { navigate } from '@utility/navigation'
import styles from './styles';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      user_pass: '',
      isChecked: false,
    };
  }

  removeItemValue = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (exception) {
      console.log("err", exception.message);
      return false;
    }
  };

  render() {
    return (
      <View style={styles.layoutFx} >
        <StatusBar translucent barStyle='light-content' />
        <SafeAreaView style={{ flex: 1 }} >
          <View style={styles.section}>
            <View style={styles.logo}>
              <Image source={require('@asset/images/react-native.png')} resizeMode='contain' style={{ width: 450, height: 200 }} />
            </View>
            <View style={styles.boxInput}>
              <View style={styles.row}>
                <IconsFeather active name='user' size={26} color={'#000000'} />
                <TextInput
                  style={styles.textInput}
                  value={this.state.user_name}
                  placeholder={'Email Address'}
                  keyboardType={'email-address'}
                  onChangeText={(text) => { this.setState({ user_name: text }) }}
                />
              </View>
            </View>
            <View style={styles.boxInput}>
              <View style={styles.row}>
                <IconsFeather active name='key' size={26} color={'#000000'} />
                <TextInput
                  style={styles.textInput}
                  placeholder={'Password'}
                  value={this.state.user_pass}
                  keyboardType={'default'}
                  onChangeText={(text) => { this.setState({ user_pass: text }) }} />
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={this.OnCheckedRemember} >
                <CheckBox
                  disabled={true}
                  value={this.state.isChecked}
                  onValueChange={this.OnCheckedRemember}
                  tintColors={{ true: 'red' }, { false: '#FFFFFF' }}
                  tintColor={'#FFFFFF'}
                  style={styles.notifyChecked}
                />
                <Text style={styles.notifyText}>{'Remember'}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.signBg}>
              <TouchableOpacity
                style={styles.btn} onPress={() => { navigate('Home') }}>
                <Text style={styles.loginBtnText}>{'SignIn'}</Text>
                <IconsMaterialCommunity active name='arrow-right' size={24} color={'#FFFFFF'} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  OnCheckedRemember = e => {
    this.setState({ isChecked: !this.state.isChecked })
  }
}

export default index;
