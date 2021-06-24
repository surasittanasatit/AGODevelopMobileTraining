import React, { Component } from 'react';
import { StatusBar, SafeAreaView, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { View, Text, Icon } from 'native-base';

import IconsMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import IconsFeather from 'react-native-vector-icons/Feather'
import IconIonicons from 'react-native-vector-icons/Ionicons'

import AsyncStorage from '@react-native-community/async-storage'

import CheckBox from '@react-native-community/checkbox'
import { connect } from 'react-redux'

import { userAction } from '../../actions'
import { COLOR, FAMILY, SIZE } from '@theme/typography'
import ServicesAPi from '../../services'
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
      isStatusConnect: false,
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

    await ServicesAPi.CheckApi.checkStatus(this.props.configservice, this.handleCheckStatus)
  }

  handleCheckStatus = (result) => {
    console.log(result);
    if (result.message == 'Run Server Success') {
      this.setState({ isStatusConnect: true })
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
        <StatusBar translucent backgroundColor={'rgba(0,0,0,0.8)'} barStyle='light-content' />
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
                    returnKeyType={'done'}
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
            <View style={styles.signBg}>
              <TouchableOpacity
                style={styles.btn2} onPress={() => { navigate('Register') }}>
                <Text style={styles.loginBtnText}>{'Register'}</Text>
                <IconsMaterialCommunity active name='arrow-right' size={24} color={'#FFFFFF'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '5%' }} >
            <Icon active name='primitive-dot' type="Octicons" style={[styles.iconStatus, { color: this.state.isStatusConnect == true ? COLOR.green : COLOR.red }]} />
            <Text style={[styles.txtStatus, { color: this.state.isStatusConnect == true ? COLOR.green : COLOR.red }]}>
              {this.state.isStatusConnect == true ? 'Connect API Success' : 'Connect API Fail'}
            </Text>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  onClickSingIn = e => {
    const { user_name, user_pass, isStatusConnect } = this.state;
    if(isStatusConnect != false){
      ServicesAPi.User.getUser(this.props.configservice, user_name, user_pass, this.handleGetUser)
    }else{
      Alert.alert('Message Alert!', 'Connect API Fail');
      return;
    }
  }

  handleGetUser = (result) => {
    const { user_name, user_pass, isChecked } = this.state;
    if (result.data.length != 0) {
      if (user_name == '') {
        Alert.alert('Message Alert!', 'Input Username');
        return;
      }
      if (user_pass == '') {
        Alert.alert('Message Alert!', 'Input Password');
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

      // let objdate = {
      //   fname: 'Surasit',
      //   lname: 'Tanasatit',
      //   fullname: 'Surasit Tanasatit',
      //   username: user_name,
      //   position: 'Programmer',
      //   tel: '0822956266',
      //   email: 'S.Tanasatit@hotmail.com',
      //   lineid: 'STanasatit'
      // };

      this.props.setActionUserData(result.data[0])
      navigate('Home');
    } else {
      Alert.alert('Message Alert!',
        'Data not found.',
        [
          { text: "Close", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        ]
      )
    }
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

const mapStateToProp = state => {
  return {
    configservice: state.config.configservice,
  };
};

export default connect(mapStateToProp, mapDispatchToProp)(index);
