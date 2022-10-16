import React from 'react';
import {Button, Text, View} from 'react-native';
import {Slider, Switch} from 'native-base';
import styles from '../styles/style';
import {useStore} from 'effector-react';
import {$settings} from '../state/store';
import {updateSettings} from '../state/events';
import {LANGUAGES, THEME} from '../constants/constants';

function Settings({navigation}) {
  const settings = useStore($settings);

  //const languageProps=

  return (
    <>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          height: '60%',
        }}>
        <View>
          <Text style={styles.textCenter}>Switch theme</Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={styles.textCenter}>Day</Text>
            <Switch
              onToggle={state =>
                updateSettings({theme: state ? THEME.NIGHT : THEME.DAY})
              }
              value={settings.theme === THEME.NIGHT}
            />
            <Text style={styles.textCenter}>Night</Text>
          </View>
        </View>
        <View>
          <Text style={styles.textCenter}>Change font size</Text>
          <View style={styles.flexCenter}>
            <Slider
              w="3/4"
              maxW="300"
              defaultValue={settings.fontSize}
              value={settings.fontSize}
              minValue={10}
              maxValue={30}
              accessibilityLabel="hello world"
              step={1}
              onChange={v => updateSettings({fontSize: v})}>
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
            <Text>{settings.fontSize}</Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={styles.textCenter}>En</Text>
          <Switch
            value={settings.language === LANGUAGES.RU}
            onToggle={v => {
              updateSettings({language: v ? LANGUAGES.RU : LANGUAGES.EN});
            }}
          />
          <Text style={styles.textCenter}>Ru</Text>
        </View>

        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Button title="delete all" />
        </View>
      </View>
    </>
  );
}

export default Settings;
