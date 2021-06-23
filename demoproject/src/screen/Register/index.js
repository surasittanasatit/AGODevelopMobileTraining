import React, { Component } from 'react';
import { StatusBar, View, Text, SafeAreaView, TouchableOpacity, Image, ImageBackground, TextInput, ScrollView, Alert } from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import { back } from '../../utilities/navigation';

import { openDrawer, navigate, navigateReset } from '@utility/navigation'
import ServicesAPi from '../../services'
import styles from './styles';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            fname: '',
            lname: '',
            email: '',
            tel: '',
            lineid: '',
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
                            {'Register'}
                        </Text>
                        <View />
                    </View>
                    <View style={styles.profile}>
                        <ImageBackground source={require('../../../assets/images/user.png')} resizeMode={'cover'} style={styles.coverImg} />
                        <View style={styles.bgBlue} />
                        <View style={styles.owner}>
                            <View style={styles.ownerBg}>
                                <Image source={require('../../../assets/images/user.png')} style={styles.ownerAvatarImg} />
                            </View>
                        </View>
                    </View>
                    <ScrollView style={{ flex: 1, marginTop: 20, paddingHorizontal: 10 }} >
                        <View style={styles.formBg}>
                            <View style={styles.formLayout}>
                                <TextInput style={styles.textInputHalf}
                                    placeholder={'Username'}
                                    value={this.state.username}
                                    onChangeText={(text) => { this.setState({ username: text }) }}
                                />
                            </View>
                        </View>
                        <View style={styles.formBg}>
                            <View style={styles.formLayout}>
                                <TextInput style={styles.textInputHalf}
                                    placeholder={'Passwrd'}
                                    value={this.state.password}
                                    blurOnSubmit={false}
                                    keyboardType={'default'}
                                    secureTextEntry={true}
                                    onChangeText={(text) => { this.setState({ password: text }) }}
                                />
                            </View>
                        </View>
                        <View style={styles.formBg}>
                            <View style={styles.formLayout}>
                                <TextInput style={styles.textInputHalf}
                                    placeholder={'Frist Name'}
                                    value={this.state.fname}
                                    onChangeText={(text) => { this.setState({ fname: text }) }}
                                />
                            </View>
                        </View>
                        <View style={styles.formBg}>
                            <View style={styles.formLayout}>
                                <TextInput style={styles.textInputHalf}
                                    placeholder={'Last Name'}
                                    value={this.state.lname}
                                    onChangeText={(text) => { this.setState({ lname: text }) }}
                                />
                            </View>
                        </View>
                        <View style={styles.formBg}>
                            <View style={styles.formLayout}>
                                <TextInput style={styles.textInputHalf}
                                    placeholder={'E-mail'}
                                    value={this.state.email}
                                    onChangeText={(text) => { this.setState({ email: text }) }}
                                />
                            </View>
                        </View>
                        <View style={styles.formBg}>
                            <View style={styles.formLayout}>
                                <TextInput style={styles.textInputHalf}
                                    placeholder={'Telephone'}
                                    value={this.state.tel}
                                    onChangeText={(text) => { this.setState({ tel: text }) }}
                                    maxLength={10}
                                />
                            </View>
                        </View>
                        <View style={styles.formBg}>
                            <View style={styles.formLayout}>
                                <TextInput style={styles.textInputHalf}
                                    placeholder={'Line ID'}
                                    value={this.state.lineid}
                                    onChangeText={(text) => { this.setState({ lineid: text }) }}
                                    maxLength={50}
                                />
                            </View>
                        </View>
                        <View style={styles.formBg}>
                            <TouchableOpacity
                                style={styles.btn2} onPress={() => { this.onClickRegisterUser() }}>
                                <Text style={styles.loginBtnText}>{'Register'}</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }

    onClickRegisterUser() {
        const { configservice } = this.props;
        const { username, password, fname, lname, email, tel, lineid } = this.state;
        let objdata = {
            'username': username,
            'password': password,
            'fname': fname,
            'lname': lname,
            'email': email,
            'tel': tel,
            'lineid': lineid,
        }

        Alert.alert('Message Alert!',
            'Do you want save data?',
            [
                { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
                {
                    text: "Confirm", onPress: () => {
                        ServicesAPi.User.registerUser(configservice, objdata, this.handleRegisterUser)
                    }
                }
            ]
        )
    }

    handleRegisterUser = (result) => {
        if (result.message == 'Success') {
            navigateReset('SignIn');
        }
    }
}

const mapStateToProp = state => {
    return {
        configservice: state.config.configservice,
    };
};

export default connect(mapStateToProp, null)(index);
