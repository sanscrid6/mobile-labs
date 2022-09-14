import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';

function Key({text, onPress}) {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={{
        rowGap: 30,
        columnGap: 30,
        flexBasis: 110,
        height: 110,
        backgroundColor: '#000000',
        borderRadius: 55,
      }}>
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            textAlignVertical: 'center',
            textAlign: 'center',
            color: '#FFFFFF',
          }}>
          {text}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

export default Key;
