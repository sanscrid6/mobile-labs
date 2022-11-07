import React from 'react';
import {Text, View} from 'react-native';
import {Slider, Switch} from 'native-base';
import {useStore} from 'effector-react';
import {$settings, $styles} from '../state/store';
import { setTimers, updateSettings } from "../state/events";
import {LANGUAGES, localization, THEME} from '../constants/constants';
import {StyleSheet} from 'react-native';
import Saver from '../fs/saver';
import Button from '../components/Button';

function Settings({navigation}) {
  const settings = useStore($settings);
  const styles = useStore($styles);

  return (
    <>
      <View
        style={StyleSheet.compose(
          {
            display: 'flex',
            justifyContent: 'flex-start',
            height: '100%',
          },
          styles.viewBg,
        )}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            height: '60%',
          }}>
          <View>
            <Text style={styles.textCenter}>
              {localization.changeTheme[settings.language]}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text style={styles.textCenter}>
                {localization.day[settings.language]}
              </Text>
              <Switch
                onToggle={state =>
                  updateSettings({theme: state ? THEME.NIGHT : THEME.DAY})
                }
                value={settings.theme === THEME.NIGHT}
              />
              <Text style={styles.textCenter}>
                {localization.night[settings.language]}
              </Text>
            </View>
          </View>
          <View>
            <Text style={styles.textCenter}>
              {localization.changeFontSize[settings.language]}
            </Text>
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
              <Text style={styles.text}>{settings.fontSize}</Text>
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
            <Button
              label={localization.deleteAllData[settings.language]}
              onClick={async () => {
                await Saver.save('timers.json', []);
                setTimers([]);
              }}
            />
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Button
              label={localization.saveSettings[settings.language]}
              onClick={async () => await Saver.save('settings.json', settings)}
            />
          </View>
        </View>
      </View>
    </>
  );
}

export default Settings;
