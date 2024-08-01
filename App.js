import SplashScreen from 'react-native-splash-screen'
import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NativeBaseProvider, Button } from 'native-base';
import Register from './screens/Register';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons/faSquareCheck'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons/faMugSaucer'
import Login from './screens/Login';
import LoginWithGoogle from './components/LoginWithGoogle';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddVehicle from './screens/AddVehicle';
import ViewVehicle from './screens/ViewVehicle';
import BottomNavigator from './screens/navigator/BottomNavigator';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();

library.add(fab, faSquareCheck, faMugSaucer)


export default function App() {

  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <NativeBaseProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }}  title name="Login" component={Login} />
          <Stack.Screen options={{ headerShown: false }}  name="Register" component={Register} />
          <Stack.Screen options={{ headerShown: false }} name="Vehicles" component={BottomNavigator} />
        </Stack.Navigator>
          {/* <BottomNavigator /> */}
        </NavigationContainer>
      </PaperProvider>
    </NativeBaseProvider>
  )
}

// import * as React from 'react';
// import { Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import SplashScreen from 'react-native-splash-screen'
// import { Button, NativeBaseProvider } from 'native-base';
// import Login from './screens/Login';



// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//       <Button
//         title="Go to Settings"
//         onPress={() => navigation.navigate('Settings')}
//       />
//     </View>
//   );
// }

// function SettingsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//       <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
//     </View>
//   );
// }

// const Tab = createBottomTabNavigator();

// export default function App() {
//   React.useEffect(() => {
//     SplashScreen.hide();
//   });

//   return (
//     <NativeBaseProvider>
//       <NavigationContainer>
//         <Tab.Navigator>
//           <Tab.Screen name="Home" component={Login} />
//           <Tab.Screen name="Settings" component={SettingsScreen} />
//         </Tab.Navigator>
//       </NavigationContainer>
//     </NativeBaseProvider>
//   );
// }