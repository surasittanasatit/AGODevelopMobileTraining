import React, { Component } from 'react';
import { StatusBar, View, Text, SafeAreaView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Icon } from 'native-base'
import { connect } from 'react-redux'

import ServicesAPi from '../../services';
import { back } from '../../utilities/navigation';
import styles from './styles';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUser: [],
        };
    }

    componentDidMount() {
        const { configservice } = this.props;
        ServicesAPi.User.getUserAll(configservice, this.handleGetUserAll)
    }

    handleGetUserAll = (result) => {
        this.setState({ dataUser: result.data });
    }

    render() {
        const { dataUser } = this.state;
        return (
            <View style={styles.layoutFx} >
                <StatusBar translucent barStyle='light-content' />
                <SafeAreaView style={{ flex: 1 }} >
                    <View style={styles.headerBar} >
                        <TouchableOpacity onPress={() => { back() }} >
                            <Icon name='arrow-back' type='MaterialIcons' style={{ size: 28, color: '#FFFFFF' }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', color: '#FFFFFF' }} >
                            {'User List'}
                        </Text>
                        <View />
                    </View>
                    <View style={{ flex: 1, paddingHorizontal: 10 }} >
                        <FlatList
                            data={dataUser}
                            extraData={this.state}
                            pagingEnabled={false}
                            onEndReachedThreshold={0.5}
                            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 0, paddingVertical: 5 }}
                            keyExtractor={(item, index) => index}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <View key={index} style={{ backgroundColor: '#FFFFFF', margin: 5, borderRadius: 10 }} >
                                    <View style={{ paddingHorizontal: 20, paddingVertical: 10 }} >
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 5 }}>{'UserName : ' + item.username}</Text>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{'Name : ' + item.fname + ' ' + item.lname}</Text>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{'E-mail : ' + item.email}</Text>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{'Line ID :' + item.lineid}</Text>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 5 }}>{'Telephone : ' + item.tel}</Text>
                                    </View>
                                    {item.username == 'Admin' ? null :
                                        <TouchableOpacity
                                            onPress={() => { this.onClickUpdateUser(item.username) }}
                                            style={{
                                                width: '100%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                backgroundColor: 'rgba(0,0,0,0.6)',
                                                paddingVertical: 10,
                                                borderBottomLeftRadius: 10,
                                                borderBottomRightRadius: 10
                                            }} >
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' }}>{'Update User'}</Text>
                                        </TouchableOpacity>}
                                </View>
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

    onClickUpdateUser(username) {
        const { configservice } = this.props;
        if (username == "") {
            Alert.alert('ข้อความแจ้งเตือน !', 'ไม่พบข้อมูลผู้ใช้งาน')
            return;
        }
        Alert.alert('ข้อความแจ้งเตือน !', 'ยืนยันอัพเดตข้อมูลเปิดใช้งาน',
            [
                { text: "ปิด", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
                { text: "ยืนยัน", onPress: () => { ServicesAPi.User.updateUser(configservice, username, this.handleUpdateUser) } }
            ]
        );
    }

    handleUpdateUser = (result) => {
        console.log(result);
    }
}

const mapStateToProp = state => {
    return {
        configservice: state.config.configservice,
    };
};

export default connect(mapStateToProp, null)(index);
