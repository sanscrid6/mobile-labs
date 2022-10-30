import React from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {defaultTimer, SCREENS} from '../constants/constants';
import {$styles, $timers} from '../state/store';
import {useStore} from 'effector-react';
import Timer from '../components/Timer';
import {setEditingTimer} from '../state/events';

function Main({navigation}) {
  const styles = useStore($styles);
  const timers = useStore($timers);

  const createNewTimer = () => {
    setEditingTimer({...defaultTimer, id: timers.length});
    navigation.navigate(SCREENS.EDIT);
  };

  const editTimer = id => {
    const timer = timers.find(t => t.id === id);
    setEditingTimer(timer);
    navigation.navigate(SCREENS.EDIT);
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
          .sort((a, b) => a.id - b.id)
          .map(({color, title, id}, index) => (
            <Timer
              key={index}
              color={color}
              title={title}
              id={id}
              onClick={() => editTimer(id)}
            />
          ))}
      </ScrollView>

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
