import React, { Component } from 'react'
import { Image, TouchableOpacity, Text, View, ScrollView, ImageBackground } from 'react-native'

import * as MENU from './Menu'

import styles from './styles'
import { closeDrawer, navigate } from '@utility/navigation'

class MenuLeft extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    }
    this.renderMenuList = this.renderMenuList.bind(this)
  }

  renderMenuList(menus) {
    return menus.map((menu) => {
      return <TouchableOpacity
        style={styles.item} underlayColor='transparent' onPress={() => {
          closeDrawer()
          navigate(menu.route)
        }}
      >
        <Text style={styles.itemText}>{menu.name}</Text>
      </TouchableOpacity>
    })
  }

  render() {
    return (
      <View style={styles.drawer}>
        <View style={styles.drawerProfile}>
          <ImageBackground source={require('@asset/images/bg_main.png')} style={styles.drawerImg}>
            <Image style={styles.drawerAvatar} source={require('@asset/images/avatar.png')} />
            <Text style={styles.drawerName}>{'Russel Crowe'}</Text>
          </ImageBackground>
        </View>
        <View style={styles.content}>
          <ScrollView>
            {this.renderMenuList(MENU.Data1)}
            <Text style={styles.itemLabel}>{'Member'}</Text>
            {this.renderMenuList(MENU.Data2)}
          </ScrollView>
        </View>
      </View>

    )
  }
}

export default MenuLeft
