import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useStore} from 'effector-react';
import {$settings, $styles, $timers} from '../state/store';
import {setEditingTimer, setTimers} from '../state/events';
import {localization, SCREENS, THEME} from '../constants/constants';

function Timer({title, color, onClick, id, navigation}) {
  const styles = useStore($styles);
  const timers = useStore($timers);
  const settings = useStore($settings);

  const deleteTimer = () => {
    setTimers(timers.filter(t => t.id !== id));
  };

  const editTimer = () => {
    const timer = timers.find(t => t.id === id);
    setEditingTimer(timer);
    navigation.navigate(SCREENS.EDIT);
  };

  return (
    <TouchableOpacity onPress={onClick}>
      <View
        style={{
          backgroundColor: settings.theme === THEME.DAY ? color : 'black',
          height: 100,
          marginBottom: 20,
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: '#B7BAA3',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <Text
          style={StyleSheet.compose(styles.text, {
            marginTop: 10,
            marginLeft: 10,
          })}>
          {title}
        </Text>
        <View>
          <TouchableOpacity style={{margin: 5}} onPress={deleteTimer}>
            <Text style={styles.text}>
              {localization.delete[settings.language]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{margin: 5}} onPress={editTimer}>
            <Text style={styles.text}>
              {localization.edit[settings.language]}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Timer;
