import React from 'react';
import {$editingTimer, $styles} from '../state/store';
import {useStore} from 'effector-react';
import {View, StyleSheet} from 'react-native';
import {Input} from 'native-base';
import {updateEditingTimer} from '../state/events';
import DropDown from '../components/DropDown';
import Button from "../components/Button";

function Edit({}) {
  const styles = useStore($styles);
  const editingTimer = useStore($editingTimer);

  const colors = [
    {label: 'white', value: 'white'},
    {label: 'red', value: 'red'},
    {label: 'yellow', value: 'yellow'},
  ];

  const save = () => {}

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
          keyboardType="numeric"
          value={editingTimer.title}
          onChange={e => updateEditingTimer({title: e.target.value})}
          placeholder="title"
        />
        <Input
          variant="outline"
          keyboardType="numeric"
          placeholder="rest duration sec"
        />
        <Input
          variant="outline"
          keyboardType="numeric"
          placeholder="work duration sec"
        />
        <Input
          variant="outline"
          keyboardType="numeric"
          placeholder="intervals"
        />
        <DropDown
          items={colors}
          placeholder="choose color"
          onValueChanged={value => updateEditingTimer({color: value})}
          selected={editingTimer.color}
        />
        <Button label={'save'} onClick={save}/>
      </View>


    </View>
  );
}

export default Edit;
