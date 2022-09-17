/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';

import ConvertScreen from './screens/convertScreen';
import {NativeBaseProvider} from 'native-base/src/core/NativeBaseProvider';

const App: () => Node = () => {
  return (
    <NativeBaseProvider>
      <ConvertScreen />
    </NativeBaseProvider>
  );
};

export default App;
