import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {useStore} from 'effector-react';
import {$styles} from '../state/store';

function Button({label, onClick}) {
  const styles = useStore($styles);

  return (
    <TouchableOpacity onPress={onClick}>
      <View
        style={{
          width: '100%',
          //minHeight: 40,
          backgroundColor: '#1A73E8',
          maxHeight: 100,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'center',
            padding: 9,
          }}>
          <Text style={styles.buttonText}>{label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Button;
