import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {SCREENS} from '../constants/constants';
import {$styles} from '../state/store';
import {useStore} from 'effector-react';

function Main({navigation}) {
  const styles = useStore($styles);

  const createNewTimer = () => {

    navigation.navigate(SCREENS.EDIT);
  }

  return (
    <View style={styles.viewBg}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <TouchableOpacity onPress={e => navigation.navigate(SCREENS.SETTINGS)}>
          <Image source={require('../public/cog.png')} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={createNewTimer}
        style={{position: 'absolute', right: '5%', bottom: '5%'}}>
        <Text>создать</Text>
        {/*<Image source={require('../public/cog.png')} style={styles.icon}/>*/}
      </TouchableOpacity>
    </View>
  );
}

export default Main;
