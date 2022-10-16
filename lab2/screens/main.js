import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

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
        <TouchableOpacity onPress={e => navigation.navigate('Settings')}>
          <Image source={require('../public/cog.png')} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Main;
