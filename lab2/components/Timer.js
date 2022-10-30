import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useStore} from 'effector-react';
import {$styles, $timers} from '../state/store';
import {setTimers} from '../state/events';

function Timer({title, color, onClick, id}) {
  const styles = useStore($styles);
  const timers = useStore($timers);

  const deleteTimer = () => {
    setTimers(timers.filter(t => t.id !== id));
  };

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
        <TouchableOpacity onPress={deleteTimer}>
          <Text>delete</Text>
        </TouchableOpacity>
        <Text
          style={StyleSheet.compose(styles.text, {
            marginTop: 10,
            marginLeft: 10,
          })}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default Timer;
