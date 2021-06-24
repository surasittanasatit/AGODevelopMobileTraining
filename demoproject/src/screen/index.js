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
import CarDetail from '@screen/CarDetail'
import Information from '@screen/Information'
import Register from '@screen/Register'
import PTTOilPrice from '@screen/PTTOilPrice'
import UserList from '@screen/UserList'

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
                        <Stack.Screen name='CarDetail' component={CarDetail} options={options} />
                        <Stack.Screen name='Information' component={Information} options={options} />
                        <Stack.Screen name='Register' component={Register} options={options} />
                        <Stack.Screen name='PTTOilPrice' component={PTTOilPrice} options={options} />
                        <Stack.Screen name='UserList' component={UserList} option={options} />
                    </Stack.Navigator>
                </NavigationContainer>
            </StoreProvider>
        )
    }
}
