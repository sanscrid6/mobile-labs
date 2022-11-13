import React, {useEffect} from 'react';
import {StyleSheet, Text, View, AppState} from 'react-native';
import {useStore} from 'effector-react';
import {$activeTimer, $playState, $settings, $styles} from '../state/store';
import Button from '../components/Button';
import {updatePlayState} from '../state/events';
import {getIntervalTime, nextInterval, tickFx} from '../state/effects';
import {INTERVAL_STATE, localization, TICK_TIME} from '../constants/constants';
import BackgroundTimer from 'react-native-background-timer';
import PushNotification, {Importance} from 'react-native-push-notification';
import {Guid} from 'js-guid';

const STATES = {
  PLAY: 'PLAY',
  PAUSED: 'PAUSED',
};
//

export const stopTimer = playState => {
  BackgroundTimer.clearInterval(playState.interval);
  // playState?.notifications?.forEach(notification =>
  //   Notifications.cancelLocalNotification(notification),
  // );

  updatePlayState({
    state: '',
    elapsed: 0,
    currentInterval: 0,
    interval: undefined,
    remaining: 0,
    intervalInfo: {},
    notifications: [],
  });
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

let channelId;

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

  useEffect(() => {
    channelId = 'my channel';
    PushNotification.createChannel(
      {
        channelId,
        channelName: 'parashaChannel',
        importance: Importance.HIGH,
      },
      err => console.log(err, 'channel'),
    );
  }, []);

  const play = () => {
    if (playState.state !== STATES.PAUSED) {
      PushNotification.cancelAllLocalNotifications();
      stopTimer(playState);

      const remaining =
        (+activeTimer.workDuration + +activeTimer.restDuration) *
        +activeTimer.intervals *
        1000;

      const intervalInfo = {
        name: INTERVAL_STATE.WORK,
        time: activeTimer.workDuration * 1000 - 1,
        signalTime: (activeTimer.workDuration - 0.7) * 1000,
      };

      updatePlayState({
        elapsed: 0,
        currentInterval: 0,
        remaining,
        intervalInfo,
        allTime: remaining,
      });

      calculateNotifications(0);
    } else {
      calculateNotifications(
        playState.currentInterval,
        playState.intervalInfo.time,
      );
    }

    const interval = BackgroundTimer.setInterval(tickFx, TICK_TIME);

    updatePlayState({
      state: STATES.PLAY,
      interval,
      lastTick: new Date().getTime(),
    });
  };

  const calculateNotifications = (interval, remainingTime = 0) => {
    console.log(Math.ceil(interval / 2));
    let prevTime = remainingTime;
    for (let i = interval; i < +activeTimer.intervals * 2; i++) {
      if (!(remainingTime !== 0 && i === interval)) {
        prevTime +=
          (i % 2 === 0
            ? +activeTimer.workDuration
            : +activeTimer.restDuration) * 1000;
      }

      PushNotification.localNotificationSchedule({
        channelId,
        message: (i % 2 === 0 ? 'work' : 'rest') + ' ended',
        date: new Date(Date.now() + prevTime),
        allowWhileIdle: false,
        priority: 'high',
        repeatTime: 1,
      });
    }
  };

  const pause = () => {
    if (!playState.state) {
      return;
    }
    PushNotification.cancelAllLocalNotifications();

    BackgroundTimer.clearInterval(playState.interval);
    updatePlayState({state: STATES.PAUSED, interval: undefined});
  };

  const stop = () => {
    PushNotification.cancelAllLocalNotifications();
    stopTimer(playState);
  };

  const nextIntervalHandler = () => {
    if (
      (playState.currentInterval + 1) / 2 === activeTimer.intervals ||
      !playState.state
    ) {
      return;
    }

    const elapsed = playState.elapsed + playState.intervalInfo.time;
    const intervalInfo = nextInterval(playState.intervalInfo.name, activeTimer);
    const remaining = playState.allTime - elapsed;
    const currentInterval = playState.currentInterval + 1;

    if(playState.state === STATES.PLAY){
      PushNotification.cancelAllLocalNotifications();
      calculateNotifications(currentInterval);
    }

    updatePlayState({elapsed, intervalInfo, currentInterval, remaining});
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
    const remaining = playState.allTime - elapsed;
    const currentInterval = playState.currentInterval - 1;

    if(playState.state === STATES.PLAY){
      PushNotification.cancelAllLocalNotifications();
      calculateNotifications(currentInterval);
    }

    updatePlayState({elapsed, intervalInfo, currentInterval, remaining});
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
        <TextField
          label={localization.title[settings.language]}
          value={activeTimer.title}
        />
        <TextField
          label={localization.elapsed[settings.language]}
          value={secondsToTime(playState.elapsed / 1000)}
        />
        <TextField
          label={localization.remaining[settings.language]}
          value={secondsToTime(playState.remaining / 1000)}
        />
        {playState.intervalInfo && playState.intervalInfo.time && (
          <TextField
            label={localization.remainIntervalTime[settings.language]}
            value={secondsToTime(playState.intervalInfo.time / 1000)}
          />
        )}
        {playState.intervalInfo && playState.intervalInfo.name && (
          <TextField
            label={localization.interval[settings.language]}
            value={playState.intervalInfo.name}
          />
        )}
        {playState.state && (
          <TextField
            label={localization.timerState[settings.language]}
            value={playState.state}
          />
        )}
        <TextField
          label={localization.progress[settings.language]}
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
              onClick={playState.state === STATES.PLAY ? pause : play}
              label={
                playState.state === STATES.PLAY
                  ? localization.pause[settings.language]
                  : localization.play[settings.language]
              }
            />
          </View>
          {/*<View style={localStyles.btnContainer}>*/}
          {/*  <Button*/}
          {/*    onClick={pause}*/}
          {/*    label={localization.pause[settings.language]}*/}
          {/*  />*/}
          {/*</View>*/}
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
