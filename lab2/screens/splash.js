import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import Saver from '../fs/saver';
import {defaultSettings, SCREENS} from '../constants/constants';
import { setSettings } from "../state/events";

function Splash({navigation}) {
  useEffect(() => {
    const init = async () => {
      // const isInited = await Saver.exists('settings.json');
      // if (!isInited) {
      //   const data = await Saver.read('settings.json');
      //   await Saver.save('settings.json', defaultSettings);
      // }
      await new Promise(rs => setTimeout(rs, 500));
      const savedSettings = await Saver.read('settings.json');
      console.log(savedSettings);
      setSettings(savedSettings);
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
