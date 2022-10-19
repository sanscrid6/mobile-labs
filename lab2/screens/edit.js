import React from 'react';
import {$editingTimer, $styles} from '../state/store';
import {useStore} from 'effector-react';
import {View, StyleSheet} from 'react-native';
import {Input} from 'native-base';
import {updateEditingTimer} from '../state/events';

function Edit({}) {
  const styles = useStore($styles);
  const editingTimer = useStore($editingTimer);

  return (
    <View
      style={StyleSheet.compose(styles.viewBg, {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
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
        <Input variant="outline" keyboardType="numeric" />
      </View>

      {/*<Button></Button>*/}
    </View>
  );
}

export default Edit;
