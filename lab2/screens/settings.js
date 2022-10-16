import React from 'react';
import {Button, Switch, Text, View} from 'react-native';
import {Slider} from 'native-base';
import styles from '../styles/style';
import { useStore } from "effector-react";
import { $settings } from "../state/store";

function Settings({navigation}) {
  const settings = useStore($settings);

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
          <View style={styles.flexCenter}>
            <Switch />
          </View>
        </View>
        <View>
          <Text style={styles.textCenter}>Change font size</Text>
          <View style={styles.flexCenter}>
            <Slider
              w="3/4"
              maxW="300"
              defaultValue={70}
              minValue={0}
              maxValue={100}
              accessibilityLabel="hello world"
              step={10}>
              <Slider.Track>
                <Slider.FilledTrack />
              </Slider.Track>
              <Slider.Thumb />
            </Slider>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <Text style={styles.textCenter}>En</Text>
          <Switch />
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
