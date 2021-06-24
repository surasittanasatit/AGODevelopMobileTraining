import React, { Component } from 'react';
import { StatusBar, View, Image, Text, SafeAreaView, ImageBackground, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import moment from 'moment';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { back } from '@utility/navigation'
import ServicesAPi from '../../services'
import styles from './styles';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get("window");
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataPTTDS: [],
      timePTTS: '',
    };

    this.handleGetSoapRequest = this.handleGetSoapRequest.bind(this)
  }

  componentDidMount() {
    ServicesAPi.Soap.GetSoapRequest(this.handleGetSoapRequest);
  }

  handleGetSoapRequest = (result) => {
    if (result != 'false') {
      let arrDataPTT = [];
      let data = result.PTTOR_DS.FUEL;
      console.log(data);
      let time = result.PTTOR_DS.FUEL[0].PRICE_DATE._text;
      for (let i = 0; i < data.length; i++) {
        let color = '';
        switch (data[i].PRODUCT._text) {
          case 'ดีเซลพรีเมียม B7':
            color = '#9c9fa1';
            break;
          case 'ดีเซล':
            color = '#1d438e';
            break;
          case 'ดีเซล B20':
            color = '#c42928';
            break;
          case 'เบนซิน':
            color = '#f6bf42';
            break;
          case 'เบนซินแก๊สโซฮอล์ 95':
            color = '#ee6f2d';
            break;
          case 'เบนซินแก๊สโซฮอล์ 91':
            color = '#4da951';
            break;
          case 'เบนซินแก๊สโซฮอล์ E20':
            color = '#96c840';
            break;
          case 'เบนซินแก๊สโซฮอล์ E85':
            color = '#a73693';
            break;
          case 'ก๊าซธรรมชาติ NGV':
            color = '#49a8e9';
            break;
          case 'ดีเซล B7':
            color = '#2d72b4';
            break;
          default:
            break;
        }
        arrDataPTT.push({
          PTT_PRODUCT: data[i].PRODUCT._text,
          PTT_PRICE: this.toFixed(data[i].PRICE._text, 2),
          PTT_COLOR: color,
        })
      }
      this.setState({ dataPTTDS: arrDataPTT, timePTTS: moment(time).add(543, 'year').format('DD MMM YYYY') })
    }
  }

  toFixed(num, pre) {
    num *= Math.pow(10, pre);
    num = (Math.round(num, pre) + (((num - Math.round(num, pre)) >= 0.5) ? 1 : 0)) / Math.pow(10, pre);
    return num.toFixed(pre);
  }

  render() {
    const { dataPTTDS, timePTTS } = this.state;
    return (
      <View style={styles.layoutFx} >
        <StatusBar translucent barStyle='dark-content' />
        <ImageBackground source={require('../../../assets/images/bg_main.png')} resizeMode='cover' style={styles.bgImg} >
          <SafeAreaView style={{ flex: 1 }} >
            <View style={styles.headerBar} >
              <TouchableOpacity onPress={() => { back() }} >
                <IconMaterialIcons name='arrow-back' size={28} color={'#222222'} />
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 20, alignItems: 'center' }} >
              <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                <Image source={require('../../../assets/images/ptt_station_logo.png')} resizeMode='contain' style={styles.imageLogoPtt} />
                <Text style={{ color: '#2a2a2a', fontSize: 17, fontWeight: 'bold', marginBottom: 10 }}>
                  {'ปรับราคาเมื่อ ' + timePTTS}
                </Text>
              </View>
              <View style={styles.boxView}>
                <View style={styles.boxViewList}>
                  <ScrollView style={{ height: 0.65 * viewportHeight }}>
                    {dataPTTDS.map((item, index) => (
                      <View style={{ paddingVertical: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} key={index}>
                        <View style={[styles.boxViewPTTName, { backgroundColor: item.PTT_COLOR }]} >
                          <Text style={{ color: '#FFFFFF', fontSize: 25, fontWeight: 'bold', textAlign: 'center' }}>{item.PTT_PRODUCT}</Text>
                        </View>
                        <View style={styles.boxViewPTTPrice} >
                          <Text style={{ color: '#ff1e16', fontSize: 55, fontWeight: 'bold', textAlign: 'center' }}>
                            {item.PTT_PRICE}
                          </Text>
                        </View>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>
            <View style={{ alignItems: 'center' }} >
              <Text style={{ color: '#2a2a2a', fontSize: 16, fontWeight: 'bold', paddingVertical: 10 }}>
                {'เป็นราคา ณ กรุงเทพมหานคร ไม่รวมภาษีบำรุงท้องที่ (ถ้ามี)'}
              </Text>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    );
  }
}

export default index;
