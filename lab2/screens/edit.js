import React from 'react';
import {$styles} from '../state/store';
import {useStore} from 'effector-react';
import {TextInput, View} from 'react-native';

function Edit({}) {
  const styles = useStore($styles);

  return (
    <View style={styles.viewBg}>
      <TextInput keyboardType="numeric" />
      <TextInput />
      <TextInput />
    </View>
  );
}

export default Edit;
