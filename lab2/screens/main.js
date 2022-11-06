import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {defaultTimer, localization, SCREENS} from '../constants/constants';
import {$settings, $styles, $timers} from '../state/store';
import {useStore} from 'effector-react';
import Timer from '../components/Timer';
import {setActiveTimer, setEditingTimer} from '../state/events';
import {Guid} from 'js-guid';

function Main({navigation}) {
  const styles = useStore($styles);
  const timers = useStore($timers);
  const settings = useStore($settings);

  const createNewTimer = () => {
    setEditingTimer({
      ...defaultTimer,
      id: Guid.newGuid().toString(),
      timestamp: Date.now(),
    });
    navigation.navigate(SCREENS.EDIT);
  };

  const playTimer = id => {
    setActiveTimer({...timers.find(t => t.id === id)});
    navigation.navigate(SCREENS.PLAY);
  };

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
      <ScrollView
        style={{
          paddingHorizontal: 40,
        }}>
        {timers
          .sort((a, b) => a.timestamp - b.timestamp)
          .map(({color, title, id}) => (
            <Timer
              key={id}
              color={color}
              title={title}
              id={id}
              onClick={() => playTimer(id)}
              navigation={navigation}
            />
          ))}
      </ScrollView>

      <TouchableOpacity
        onPress={createNewTimer}
        style={{position: 'absolute', right: '5%', bottom: '5%'}}>
        <Text style={styles.text}>
          {localization.create[settings.language]}
        </Text>
        {/*<Image source={require('../public/cog.png')} style={styles.icon}/>*/}
      </TouchableOpacity>
    </View>
  );
}

export default Main;
