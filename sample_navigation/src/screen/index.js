import React from 'react'
import { Dimensions } from 'react-native'
import { createStore, combineReducers } from "redux";
import { Provider as StoreProvider } from "react-redux";

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import MyCombineReducers from '../reducers'

/* Drawer Menu */
import DrawerContent from '@component/Menu/Left'

/* Screens */
import Home from '@screen/Home'
import SignIn from '@screen/SignIn'

/* Navigation */
import { navigationRef } from '@utility/navigation'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const { width } = Dimensions.get('window')

const forFade = ({ current, closing }) => ({
    cardStyle: {
        opacity: current.progress
    }
})

const options = {
    cardStyleInterpolator: forFade
}

function DrawerRoot() {
    return (
        <Drawer.Navigator
            initialRouteName='Drawer'
            drawerContent={(props) => <DrawerContent {...props} />}
            drawerStyle={{ width: width - 50 }}
        >
            <Drawer.Screen name='Home' component={Home} />
        </Drawer.Navigator>
    )
}

export default class App extends React.Component {
    render() {
        let reducers = combineReducers(MyCombineReducers);
        let store = createStore(reducers);

        return (
            <StoreProvider store={store}>
                <NavigationContainer ref={navigationRef}>
                    <Stack.Navigator initialRouteName='SignIn' headerMode='none'>
                        <Stack.Screen name='Drawer' component={DrawerRoot} />
                        <Stack.Screen name='SignIn' component={SignIn} options={options} />
                    </Stack.Navigator>
                </NavigationContainer>
            </StoreProvider>
        )
    }
}
