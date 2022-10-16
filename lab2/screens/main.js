import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SCREENS} from '../constants/constants';

function Main({navigation}) {
  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text>main screen</Text>
        <TouchableOpacity onPress={e => navigation.navigate(SCREENS.SETTINGS)}>
          <Image source={require('../public/cog.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Main;
