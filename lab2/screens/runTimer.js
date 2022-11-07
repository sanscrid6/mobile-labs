import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useStore} from 'effector-react';
import {$activeTimer, $playState, $settings, $styles} from '../state/store';
import Button from '../components/Button';
import {updatePlayState} from '../state/events';
import {getIntervalTime, nextInterval, tickFx} from '../state/effects';
import {INTERVAL_STATE, localization, TICK_TIME} from '../constants/constants';

const STATES = {
  PLAY: 'PLAY',
  PAUSED: 'PAUSED',
};

function TextField({label, value}) {
  const styles = useStore($styles);
  return (
    <View
      style={{
        height: 70,
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <Text
        style={StyleSheet.compose(styles.text, {minWidth: 100, maxWidth: 120})}>
        {label}:
      </Text>
      <Text
        style={StyleSheet.compose(styles.text, {
          minWidth: 100,
          maxWidth: 120,
          marginLeft: 25,
        })}>
        {value}
      </Text>
    </View>
  );
}

function RunTimer({navigation}) {
  const activeTimer = useStore($activeTimer);
  const styles = useStore($styles);
  const playState = useStore($playState);
  const settings = useStore($settings);

  const localStyles = StyleSheet.create({
    btn: {
      flexBasis: '33%',
    },
    field: {
      height: 50,
    },
    btnContainer: {
      marginHorizontal: 6,
    },
  });

  const play = () => {
    if (playState.state !== STATES.PAUSED) {
      clearInterval(playState.interval);
      updatePlayState({
        state: '',
        elapsed: 0,
        currentInterval: 0,
        interval: undefined,
        remaining: 0,
        intervalInfo: {},
      });

      const remaining =
        (+activeTimer.workDuration + +activeTimer.restDuration) *
          +activeTimer.intervals *
          1000;

      const intervalInfo = {
        name: INTERVAL_STATE.WORK,
        time: activeTimer.workDuration * 1000,
        signalTime: (activeTimer.workDuration - 1) * 1000,
      };

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
    if (!playState.state) {
      return;
    }

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

  const nextIntervalHandler = () => {
    if (
      playState.currentInterval / 2 === activeTimer.intervals ||
      !playState.state
    ) {
      return;
    }

    const elapsed = playState.elapsed + playState.intervalInfo.time;
    const intervalInfo = nextInterval(playState.intervalInfo.name, activeTimer);
    const currentInterval = playState.currentInterval + 1;

    updatePlayState({elapsed, intervalInfo, currentInterval});
  };

  const prevIntervalHandler = () => {
    if (playState.currentInterval === 0 || !playState.state) {
      return;
    }

    const intervalInfo = nextInterval(playState.intervalInfo.name, activeTimer);
    const elapsed =
      playState.elapsed -
      (getIntervalTime(playState.intervalInfo.name, activeTimer) -
        playState.intervalInfo.time) -
      getIntervalTime(intervalInfo.name, activeTimer);
    const currentInterval = playState.currentInterval - 1;

    updatePlayState({elapsed, intervalInfo, currentInterval});
  };

  const secondsToTime = s => {
    const hours = Math.trunc(s / 3600);
    s -= hours * 3600;
    const minutes = Math.trunc(s / 60);
    s -= minutes * 60;
    const seconds = Math.trunc(s);

    const toDoubleSymbols = num => (num > 9 ? num : `0${num}`);

    return `${toDoubleSymbols(hours)}:${toDoubleSymbols(
      minutes,
    )}:${toDoubleSymbols(seconds)}`;
  };

  return (
    <View style={styles.viewBg}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TextField label={'title'} value={activeTimer.title} />
        <TextField
          label={'elapsed'}
          value={secondsToTime(playState.elapsed / 1000)}
        />
        <TextField
          label={'remaining'}
          value={secondsToTime(playState.remaining / 1000)}
        />
        {playState.intervalInfo && playState.intervalInfo.time && (
          <TextField
            label={'time remains before interval end'}
            value={secondsToTime(playState.intervalInfo.time / 1000)}
          />
        )}
        {playState.intervalInfo && playState.intervalInfo.name && (
          <TextField
            label={'interval name'}
            value={playState.intervalInfo.name}
          />
        )}
        {playState.state && (
          <TextField label={'timer state'} value={playState.state} />
        )}
        <TextField
          label={'progress'}
          value={` ${
            playState.state ? Math.floor(playState.currentInterval / 2 + 1) : 0
          }/${activeTimer.intervals}`}
        />

        <View
          style={StyleSheet.compose(
            {
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'space-around',
            },
            localStyles.field,
          )}>
          <View style={localStyles.btnContainer}>
            <Button
              onClick={play}
              label={localization.play[settings.language]}
            />
          </View>
          <View style={localStyles.btnContainer}>
            <Button
              onClick={pause}
              label={localization.pause[settings.language]}
            />
          </View>
          <View style={localStyles.btnContainer}>
            <Button
              style={localStyles.btn}
              onClick={stop}
              label={localization.stop[settings.language]}
            />
          </View>
          <View style={localStyles.btnContainer}>
            <Button
              style={localStyles.btn}
              onClick={nextIntervalHandler}
              label="=>"
            />
          </View>
          <View style={localStyles.btnContainer}>
            <Button
              style={localStyles.btn}
              onClick={prevIntervalHandler}
              label="<="
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default RunTimer;
