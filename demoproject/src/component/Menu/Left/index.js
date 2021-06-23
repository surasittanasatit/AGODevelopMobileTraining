import React, { Component } from 'react'
import { Image, TouchableOpacity, Text, View, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import IconMaterial from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage'

import * as MENU from './Menu'

import styles from './styles'
import { closeDrawer, navigate, navigateReset } from '@utility/navigation'

class MenuLeft extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    }
    this.renderMenuList = this.renderMenuList.bind(this)
  }

  onClickGotoPage(route) {
    closeDrawer()
    if (route == "SignIn") {
      this.removeItemValue("user_name");
      this.removeItemValue("user_pass");
      this.removeItemValue("onremember");
      navigateReset('SignIn');
    } else {
      navigate(route)
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

  renderMenuList(menus) {
    return menus.map((menu, index) => {
      return <TouchableOpacity
        key={index}
        style={styles.item} underlayColor='transparent' onPress={() => { this.onClickGotoPage(menu.route) }}
      >
        <View style={styles.col}>
          <IconMaterial name={'navigate-next'} size={30} color="#000000" />
        </View>
        <Text style={styles.itemText}>{menu.name}</Text>
      </TouchableOpacity>
    })
  }

  onClickInfomation() {
    const { userdata } = this.props;
    closeDrawer();
    navigate('Information', {
      infodata: userdata,
      userimage: require('../../../../assets/images/user.png'),
    });
  }

  render() {
    const { userdata } = this.props;
    return (
      <View style={styles.drawer}>
        <View style={styles.drawerProfile}>
          <View style={styles.drawerImg}>
            <Image style={styles.drawerAvatar} source={require('@asset/images/user.png')} />
            <Text style={styles.drawerName}>{userdata.fullname}</Text>
            <Text style={styles.drawerName}>{userdata.email}</Text>
            <TouchableOpacity style={styles.btnInfo} onPress={() => { this.onClickInfomation() }} >
              <Text style={styles.btnText}>{'Infomation'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.content}>
          <ScrollView>
            {this.renderMenuList(MENU.Data1)}
          </ScrollView>
        </View>
      </View>

    )
  }
}

const mapStateToProp = state => {
  return {
    userdata: state.user.userdata,
  };
};

export default connect(mapStateToProp, null)(MenuLeft)
