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
      <Text
        style={{
          height: '100%',
          width: '100%',
          textAlign: 'center',
          textAlignVertical: 'center',
          color: '#FFFFFF',
          fontSize: 22,
        }}>
        {text}
      </Text>
    </TouchableHighlight>
  );
}

export default Key;
