import React, { Component } from 'react';
import { StatusBar, View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import IconsMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import IconsFeather from 'react-native-vector-icons/Feather'
import IconIonicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-community/async-storage'
import CheckBox from '@react-native-community/checkbox'
import { connect } from 'react-redux'

import { userAction } from '../../actions'

import { navigate } from '@utility/navigation'
import styles from './styles';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      user_pass: '',
      isChecked: false,
      showPass: true,
    };
  }

  async componentDidMount() {
    const checkedvalue = await AsyncStorage.getItem("onremember");
    if (checkedvalue !== null) {
      checkedvalue === "1" ? this.setState({ isChecked: false }) : null;
    }
    if (checkedvalue === "0") {
      const user_name = await AsyncStorage.getItem("user_name");
      const user_pass = await AsyncStorage.getItem("user_pass");
      this.setState({ user_name, user_pass, isChecked: true, })
    }
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
            <View style={{ alignItems: 'center', marginBottom: 20 }} >
              <Text style={styles.textTitle}>{'Welcome'}</Text>
            </View>
            <View style={styles.boxInput}>
              <View style={styles.row}>
                <View style={styles.boxIcon} >
                  <IconsFeather active name='user' size={26} color={'#FFFFFF'} />
                </View>
                <TextInput
                  returnKeyType={"next"}
                  onSubmitEditing={() => { this.PasswordTextInput.focus(); }}
                  blurOnSubmit={false}
                  style={styles.textInput}
                  value={this.state.user_name}
                  placeholder={'Username'}
                  keyboardType={'email-address'}
                  onChangeText={(text) => { this.setState({ user_name: text }) }}
                  maxLength={100}
                />
              </View>
            </View>
            <View style={styles.boxInput}>
              <View style={styles.row}>
                <View style={styles.boxIcon} >
                  <IconsFeather active name='key' size={26} color={'#FFFFFF'} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                  <TextInput
                    ref={(input) => { this.PasswordTextInput = input; }}
                    blurOnSubmit={false}
                    style={styles.textInput}
                    placeholder={'Password'}
                    value={this.state.user_pass}
                    keyboardType={'default'}
                    secureTextEntry={this.state.showPass}
                    onChangeText={(text) => { this.setState({ user_pass: text }) }}
                    maxLength={20}
                  />
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.btnEye}
                    onPress={this.showPass}>
                    <IconIonicons name={'eye'} type={'Ionicons'} size={24} color={'rgba(0, 0, 0, 0.7)'} />
                  </TouchableOpacity>
                </View>
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
                style={styles.btn} onPress={this.onClickSingIn}>
                <Text style={styles.loginBtnText}>{'SignIn'}</Text>
                <IconsMaterialCommunity active name='arrow-right' size={24} color={'#FFFFFF'} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  onClickSingIn = e => {
    const { user_name, user_pass, isChecked } = this.state;
    if (user_name == '') {
      Alert.alert('ข้อความแจ้งเตือน', 'กรุณากรอก Username');
      return;
    }
    if (user_pass == '') {
      Alert.alert('ข้อความแจ้งเตือน', 'กรุณากรอก Password');
      return;
    }

    if (isChecked === true) {
      AsyncStorage.setItem("user_name", user_name);
      AsyncStorage.setItem("user_pass", user_pass);
      isChecked === true
        ? AsyncStorage.setItem("onremember", "0")
        : AsyncStorage.setItem("onremember", "1");
    } else {
      this.removeItemValue("user_name");
      this.removeItemValue("user_pass");
      this.removeItemValue("onremember");
    }
    let objdate = {
      fname: 'Surasit',
      lname: 'Tanasatit',
      fullname: 'Surasit Tanasatit',
      username: user_name,
      position: 'Programmer',
      tel: '0822956266',
      email: 'S.Tanasatit@hotmail.com',
      lineid: 'STanasatit'
    };

    this.props.setActionUserData(objdate)
    navigate('Home');
  }

  OnCheckedRemember = e => {
    this.setState({ isChecked: !this.state.isChecked })
  }

  showPass = e => {
    this.setState({ showPass: !this.state.showPass })
  }
}

const mapDispatchToProp = dispath => {
  return {
    setActionUserData: userdata => {
      dispath(userAction.getActionUserData(userdata));
    },
  };
};


export default connect(null, mapDispatchToProp)(index);
