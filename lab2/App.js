import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Main from './screens/main';
import Splash from './screens/splash';
import Settings from './screens/settings';
import {NativeBaseProvider} from 'native-base/src/core/NativeBaseProvider';
import {SCREENS} from './constants/constants';
import init from './state/init';
import Edit from './screens/edit';

const Stack = createNativeStackNavigator();

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => init(), []);

  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={SCREENS.SPLASH} component={Splash} />
          <Stack.Screen name={SCREENS.MAIN} component={Main} />
          <Stack.Screen name={SCREENS.SETTINGS} component={Settings} />
          <Stack.Screen name={SCREENS.EDIT} component={Edit} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
