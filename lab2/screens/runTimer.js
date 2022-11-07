import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useStore} from 'effector-react';
import {$activeTimer, $playState, $settings, $styles} from '../state/store';
import Button from '../components/Button';
import {updatePlayState} from '../state/events';
import {tickFx} from '../state/effects';
import {INTERVAL_STATE, localization, TICK_TIME} from '../constants/constants';

const STATES = {
  PLAY: 'PLAY',
  PAUSED: 'PAUSED',
};

function RunTimer({navigation}) {
  const activeTimer = useStore($activeTimer);
  const styles = useStore($styles);
  const playState = useStore($playState);
  const settings = useStore($settings);

  const localStyles = StyleSheet.create({
    btn: {
      // flexBasis: '33%',
    },
    field: {
      height: 50,
    },
  });

  const play = () => {
    if (playState.state !== STATES.PAUSED) {
      const remaining =
        (+activeTimer.workDuration + +activeTimer.restDuration) *
          +activeTimer.intervals *
          1000 -
        TICK_TIME;
      const intervalInfo = {
        name: INTERVAL_STATE.WORK,
        time: activeTimer.workDuration * 1000,
      };
      console.log(
        remaining,
        'remaining',
        activeTimer,
        activeTimer.workDuration + activeTimer.restDuration,
      );

      updatePlayState({
        elapsed: 0,
        currentInterval: 0,
        remaining,
        intervalInfo,
        allTime: remaining,
      });
    }
    const interval = setInterval(tickFx, TICK_TIME);
    updatePlayState({state: STATES.PLAY, interval});
  };

  const pause = () => {
    clearInterval(playState.interval);
    updatePlayState({state: STATES.PAUSED, interval: undefined});
  };

  const stop = () => {
    clearInterval(playState.interval);
    updatePlayState({
      state: '',
      elapsed: 0,
      currentInterval: 0,
      interval: undefined,
      remaining: 0,
      intervalInfo: {},
    });
  };

  const secondsToTime = s => {
    const hours = Math.trunc(s / 3600);
    s -= hours * 3600;
    const minutes = Math.trunc(s / 60);
    s -= minutes * 60;
    const seconds = Math.trunc(s);
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <View style={styles.viewBg}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={StyleSheet.compose(styles.text, localStyles.field)}>
          {activeTimer.title}
        </Text>
        <Text style={StyleSheet.compose(styles.text, localStyles.field)}>
          {secondsToTime(playState.elapsed / 1000)}
        </Text>
        <Text style={StyleSheet.compose(styles.text, localStyles.field)}>
          {secondsToTime(playState.remaining / 1000)}
        </Text>
        <Text style={StyleSheet.compose(styles.text, localStyles.field)}>
          {playState.state}
        </Text>
        <Text style={StyleSheet.compose(styles.text, localStyles.field)}>
          {playState.currentInterval / 2 + 1}
        </Text>
        <Text style={StyleSheet.compose(styles.text, localStyles.field)}>
          {playState.intervalInfo.name}
        </Text>
        <Text style={StyleSheet.compose(styles.text, localStyles.field)}>
          {secondsToTime(playState.intervalInfo.time / 1000)}
        </Text>
        <View
          style={StyleSheet.compose(
            {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
            localStyles.field,
          )}>
          <Button
            style={localStyles.btn}
            onClick={play}
            label={localization.play[settings.language]}
          />
          <Button
            style={localStyles.btn}
            onClick={pause}
            label={localization.pause[settings.language]}
          />
          <Button
            style={localStyles.btn}
            onClick={stop}
            label={localization.stop[settings.language]}
          />
        </View>
      </View>
    </View>
  );
}

export default RunTimer;
