import React, { Component } from 'react';
import { StatusBar, View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Icon } from 'native-base'
import { connect } from 'react-redux'

import ServicesAPi from '../../services';
import { back } from '../../utilities/navigation';
import styles from './styles';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }

    componentDidMount() {
        const { configservice } = this.props;
        ServicesAPi.User.getUserAll(configservice, this.handleGetUserAll)
    }

    handleGetUserAll = (result) => {
        console.log(result);
    }

    render() {
        const { cardata } = this.props;
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

                    </View>
                </SafeAreaView>
            </View>
        );
    }
}

const mapStateToProp = state => {
    return {
        configservice: state.config.configservice,
    };
};

export default connect(mapStateToProp, null)(index);
