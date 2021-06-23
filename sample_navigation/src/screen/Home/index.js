import React, { Component } from 'react';
import { StatusBar, View, Text, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-community/async-storage'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'
import { modelAction } from '../../actions'

import styles from './styles';
import carList from './data/carList'
import { openDrawer, navigate, navigateReset } from '@utility/navigation'
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: carList,
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

  onClickSingOut() {
    this.removeItemValue("user_name");
    this.removeItemValue("user_pass");
    this.removeItemValue("onremember");
    navigateReset('SignIn');
  }

  render() {
    return (
      <View style={styles.layoutFx} >
        <StatusBar translucent barStyle='light-content' />
        <SafeAreaView style={{ flex: 1 }} >
          <View style={styles.headerBar} >
            <TouchableOpacity onPress={() => { openDrawer() }} >
              <IconMaterialCommunity name='menu' size={28} color={'#FFFFFF'} />
            </TouchableOpacity>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF' }} >
              {'HOME'}
            </Text>
            <TouchableOpacity onPress={() => { this.onClickSingOut() }} >
              <IconMaterialCommunity name='logout' size={28} color={'#FFFFFF'} />
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 10, paddingVertical: 10 }} >
            <FlatList
              data={this.state.data}
              extraData={this.state}
              pagingEnabled={false}
              onEndReachedThreshold={0.5}
              contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 0, paddingVertical: 5 }}
              keyExtractor={(item, index) => index}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity underlayColor='transparent' onPress={() => { this.onClickItem(item) }}>
                  <View key={index} style={{ backgroundColor: '#FFFFFF', margin: 5, borderRadius: 10 }} >
                    <View style={styles.adContainer}>
                      <View>
                        <Image source={{ uri: item.image }} style={styles.adImg} />
                        <IconFontAwesome name='bookmark' style={styles.bookmarkIcon} />
                      </View>
                      <View style={styles.adInfo}>
                        <Text style={styles.adTitle}>{item.title}</Text>
                        <Text style={styles.adLocation}>{item.location}</Text>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={styles.adPrice}>{item.price}</Text>
                        </View>
                        <View style={styles.itemPosted}>
                          <IconFontAwesome name='calendar' style={styles.calendarIcon} />
                          <Text style={styles.itemDate}>{item.date}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              onEndThreshold={50}
              removeClippedSubviews={false}
              initialNumToRender={10}
              windowSize={10}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }

  onClickItem(item) {
    this.props.setActionCarData(item);
    navigate('CarDetail');
  }
}

const mapDispatchToProp = dispath => {
  return {
    setActionCarData: cardata => {
      dispath(modelAction.getActionCarData(cardata));
    },
  };
};

export default connect(null, mapDispatchToProp)(index);
