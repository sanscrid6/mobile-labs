import React from 'react';
import {Text, View} from 'react-native';
import {useStore} from 'effector-react';
import {$activeTimer, $styles} from '../state/store';

function RunTimer({navigation}) {
  const activeTimer = useStore($activeTimer);
  const styles = useStore($styles);

  return (
    <View>
      <Text style={styles.text}>{activeTimer.title}</Text>
    </View>
  );
}

export default RunTimer;
