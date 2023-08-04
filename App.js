import React, { Component } from 'react';

import Main from './components/Main'
import Gallery from './components/Gallery'
import Camera from './components/Camera'
import BigPhoto from './components/BigPhoto'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="gallery" component={Gallery} options={{ title: "Galeria", headerStyle: { backgroundColor: 'darkslateblue' }, headerTintColor: '#ffffff' }} />
          <Stack.Screen name="camera" component={Camera} options={{ title: "Kamera", headerStyle: { backgroundColor: 'darkslateblue' }, headerTintColor: '#ffffff' }} />
          <Stack.Screen name="big" component={BigPhoto} options={{ title: "Zdjęcie", headerStyle: { backgroundColor: 'darkslateblue' }, headerTintColor: '#ffffff' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
