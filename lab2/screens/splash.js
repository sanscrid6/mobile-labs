import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import Saver from '../fs/saver';
import {defaultSettings, SCREENS} from '../constants/constants';
import {setSettings, setTimers} from '../state/events';
import PushNotification from 'react-native-push-notification';


function Splash({navigation}) {
  useEffect(() => {
    const init = async () => {
      await new Promise(rs => setTimeout(rs, 500));
      const hasSettings = await Saver.exists('settings.json');
      const hasTimers = await Saver.exists('timers.json');
      console.log(hasSettings, hasTimers);

      let settings = defaultSettings;
      let timers = [];

      if (!hasSettings) {
        await Saver.save('settings.json', defaultSettings);
      } else {
        const q = await Saver.read('settings.json');
        console.log(q, 'settings');
        settings = q;
      }

      if (!hasTimers) {
        await Saver.save('timers.json', []);
      } else {
        timers = await Saver.read('timers.json');
      }

      console.log(settings);
      setTimers(timers);
      setSettings(settings);
      navigation.replace(SCREENS.MAIN);

    };

    init();
  }, []);

  return (
    <>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
          height: '100%',
        }}>
        <Text style={{textAlign: 'center', fontSize: 35}}>Parasha timer</Text>
        <Text style={{textAlign: 'center'}}>loading...</Text>
      </View>
    </>
  );
}

export default Splash;
