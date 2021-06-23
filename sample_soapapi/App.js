import React, { Component } from 'react';
import Moment from 'moment';
import 'moment/locale/th'

import MainScreen from '@src/app'

Moment.locale('th');
Moment.suppressDeprecationWarnings = true;

class App extends Component {
  render() {
    return (<MainScreen />);
  }
}

export default App;
