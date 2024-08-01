
import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddVehicle from '../AddVehicle';
import ViewVehicle from '../ViewVehicle';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCab, faLock, faPlus } from '@fortawesome/free-solid-svg-icons';
import { normalize } from '../../function/responsiveText';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { color } from 'native-base/lib/typescript/theme/styled-system';

// const Tab = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

export default function BottomNavigator({route}) {

    const AddVehicleWithParams = ()=><AddVehicle user={route.params}/>
    const ViewVehicleWithParams = ()=><ViewVehicle user={route.params}/>
    // console.log(route.params);
    return (
        <Tab.Navigator initialRouteName="AddVehicle"
            activeColor="#ffff"
            inactiveColor="#6f93cc"
            barStyle={{ backgroundColor: '#275db3' }}>
            <Tab.Screen options={{ tabBarLabel:"Add",headerShown: false, tabBarIcon: () => (<FontAwesomeIcon size={normalize(15)} color='#acb4c0' icon={faPlus} />), }} name="AddVehicle" component={AddVehicleWithParams} />
            <Tab.Screen options={{ headerShown: false,tabBarIcon: () => (<FontAwesomeIcon size={normalize(15)} color='#acb4c0' icon={faCab} />), }} name="View" component={ViewVehicleWithParams} />
        </Tab.Navigator>
    )
}