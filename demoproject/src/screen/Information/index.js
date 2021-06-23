import React, { Component } from 'react';
import { StatusBar, View, Text, SafeAreaView, TouchableOpacity, Image, ImageBackground, TextInput } from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import IconFontAwesome from 'react-native-vector-icons/FontAwesome'

import { back } from '../../utilities/navigation';

import styles from './styles';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        const { infodata, userimage } = this.props.route.params;
        return (
            <View style={styles.layoutFx} >
                <StatusBar translucent barStyle='light-content' />
                <SafeAreaView style={{ flex: 1 }} >
                    <View style={styles.headerBar} >
                        <TouchableOpacity onPress={() => { back() }} >
                            <IconMaterialIcons name='arrow-back' size={28} color={'#FFFFFF'} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF' }} >
                            {'Information'}
                        </Text>
                        <View />
                    </View>
                    <View style={{ flex: 1 }} >
                        <View style={styles.profile}>
                            <ImageBackground source={userimage} resizeMode={'cover'} style={styles.coverImg} />
                            <View style={styles.bgBlue} />
                            <View style={styles.owner}>
                                <View style={styles.ownerBg}>
                                    <Image source={userimage} style={styles.ownerAvatarImg} />
                                </View>
                                <View style={styles.ownerInfo}>
                                    <Text style={styles.ownerName}>{infodata.fname + ' ' + infodata.lname}</Text>
                                    <Text style={styles.ownerLocation}>{infodata.email}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.formBg}>
                            <View style={styles.formLayout}>
                                <TextInput
                                    style={styles.textInputHalf}
                                    placeholder={'First Name'}
                                    value={'Frist Name : ' + infodata.fname}
                                    editable={false}
                                />
                                <TextInput
                                    style={styles.textInputHalf}
                                    placeholder={'Last Name'}
                                    value={'Last Name : ' + infodata.lname}
                                    editable={false}
                                />
                                <TextInput
                                    style={styles.textInputHalf}
                                    placeholder={'Last Name'}
                                    value={'Telephone : ' + infodata.tel}
                                    editable={false}
                                />
                                <TextInput
                                    style={styles.textInputHalf}
                                    placeholder={'Last Name'}
                                    value={'E-mail : ' + infodata.email}
                                    editable={false}
                                />
                                <TextInput
                                    style={styles.textInputHalf}
                                    placeholder={'Last Name'}
                                    value={'Line ID : ' + infodata.lineid}
                                    editable={false}
                                />
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

export default index;
