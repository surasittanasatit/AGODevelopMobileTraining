import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';

import styles from './styles';

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.layoutFx} >
        <SafeAreaView style={{ flex: 1 }} >

        </SafeAreaView>
      </View>
    );
  }
}

export default index;
