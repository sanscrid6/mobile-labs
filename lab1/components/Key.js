import React from 'react';
import {Text, TouchableHighlight, View} from 'react-native';
import {useOrientation} from '../hooks/useOrientation';

function Key({text, onPress}) {
  const orientation = useOrientation();

  return (
    <TouchableHighlight
      onPress={onPress}
      style={{
        rowGap: 30,
        columnGap: 30,
        flexBasis: 80,
        height: 80,
        backgroundColor: '#000000',
        borderRadius: 55,
        margin: orientation === 'PORTRAIT' ? 5 : 8,
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
