import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {useStore} from 'effector-react';
import {$styles} from '../state/store';

function Timer({title, color, onClick}) {
  const styles = useStore($styles);

  return (
    <TouchableOpacity onPress={onClick}>
      <View
        style={{
          backgroundColor: color,
          height: 100,
          marginBottom: 20,
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: '#B7BAA3',
        }}>
        <Text style={StyleSheet.compose(styles.text, {marginTop: 10, marginLeft: 10})}>{title}</Text>
      </View>
    </TouchableOpacity>

  );
}

export default Timer;
