import React, { Component } from 'react';
import { StatusBar, View, Text, SafeAreaView, TouchableOpacity, Image, ImageBackground } from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'

import { back } from '../../utilities/navigation';

import styles from './styles';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    render() {
        const { cardata } = this.props;
        return (
            <View style={styles.layoutFx} >
                <StatusBar translucent barStyle='light-content' />
                <SafeAreaView style={{ flex: 1 }} >
                    <View style={styles.headerBar} >
                        <TouchableOpacity onPress={() => { back() }} >
                            <IconMaterialIcons name='arrow-back' size={28} color={'#FFFFFF'} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF' }} >
                            {'Car Detail'}
                        </Text>
                        <View />
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: 10 }} >
                        <View style={{ paddingVertical: 10 }} >
                            <ImageBackground source={{ uri: cardata.image }} imageStyle='cover' style={styles.adImg} />
                        </View>
                        <View style={styles.adContainer}>
                            <Text style={styles.title}>{cardata.title}</Text>
                            <View style={styles.adLocation}>
                                <IconMaterialCommunity active name='map-marker-radius' style={styles.locationIcon} />
                                <Text style={styles.locationInfo}>{cardata.location}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.adPrice}>{cardata.price}</Text>
                            </View>
                        </View>
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

const mapStateToProp = state => {
    return {
        cardata: state.model.cardata,
    };
};

export default connect(mapStateToProp, null)(index);
