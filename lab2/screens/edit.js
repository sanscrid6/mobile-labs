import React from 'react';
import {$editingTimer, $settings, $styles, $timers} from '../state/store';
import {useStore} from 'effector-react';
import {View, StyleSheet} from 'react-native';
import {Input} from 'native-base';
import {setTimers, updateEditingTimer} from '../state/events';
import DropDown from '../components/DropDown';
import Button from '../components/Button';
import Saver from '../fs/saver';
import {localization} from '../constants/constants';

function Edit({navigation}) {
  const styles = useStore($styles);
  const editingTimer = useStore($editingTimer);
  const timers = useStore($timers);
  const settings = useStore($settings);

  const colors = [
    {label: 'white', value: 'white'},
    {label: 'red', value: 'red'},
    {label: 'yellow', value: 'yellow'},
  ];

  const save = async () => {
    setTimers([...timers, editingTimer]);
    navigation.goBack();
  };

  return (
    <View
      style={StyleSheet.compose(styles.viewBg, {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: editingTimer.color,
      })}>
      <View
        style={{
          width: '70%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}>
        <Input
          variant="outline"
          value={editingTimer.title}
          onChangeText={e => updateEditingTimer({title: e})}
          placeholder={localization.title[settings.language]}
        />
        <Input
          variant="outline"
          keyboardType="numeric"
          value={editingTimer.workDuration}
          onChangeText={e => updateEditingTimer({workDuration: e})}
          placeholder={localization.workDuration[settings.language]}
        />
        <Input
          variant="outline"
          keyboardType="numeric"
          value={editingTimer.restDuration}
          onChangeText={e => updateEditingTimer({restDuration: e})}
          placeholder={localization.restDuration[settings.language]}
        />
        <Input
          variant="outline"
          keyboardType="numeric"
          onChangeText={e => updateEditingTimer({intervals: e})}
          placeholder={localization.intervals[settings.language]}
        />
        <DropDown
          items={colors}
          placeholder="choose color"
          onValueChanged={value => updateEditingTimer({color: value})}
          selected={editingTimer.color}
        />
        <Button
          label={localization.save[settings.language]}
          onClick={async () => await save()}
        />
      </View>
    </View>
  );
}

export default Edit;
