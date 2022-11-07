import {globalDomain} from './domain';
import {$activeTimer, $playState} from './store';
import {updatePlayState} from './events';
import {INTERVAL_STATE, TICK_TIME} from '../constants/constants';
import Sound from 'react-native-sound';
import BackgroundTimer from 'react-native-background-timer';

export const nextInterval = (interval, activeTimer) => {
  switch (interval) {
    case INTERVAL_STATE.WORK:
      return {
        name: INTERVAL_STATE.REST,
        time: activeTimer.restDuration * 1000 - 1,
        signalTime: (activeTimer.restDuration - 1) * 1000,
      };
    case INTERVAL_STATE.REST:
      return {
        name: INTERVAL_STATE.WORK,
        time: activeTimer.workDuration * 1000 - 1,
        signalTime: (activeTimer.workDuration - 1) * 1000,
      };
  }
};

export const getIntervalTime = (interval, activeTimer) => {
  switch (interval) {
    case INTERVAL_STATE.WORK:
      return activeTimer.restDuration * 1000 - 1;
    case INTERVAL_STATE.REST:
      return activeTimer.workDuration * 1000 - 1;
  }
};

Sound.setCategory('Playback');
const intervalEnds = new Sound('may.wav', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
  }
});

export const tickFx = globalDomain.effect(() => {
  const currState = $playState.getState();
  const activeTimer = $activeTimer.getState();

  const elapsed = currState.elapsed + TICK_TIME;
  const remaining = currState.allTime - elapsed;

  let intervalInfo = currState.intervalInfo;
  let currentInterval = currState.currentInterval;

  intervalInfo.time -= TICK_TIME;
  intervalInfo.signalTime -= TICK_TIME;

  if (intervalInfo.signalTime <= 0) {
    intervalEnds.setVolume(1);
    intervalEnds.play();
    intervalInfo.signalTime = 100000000000;
  }

  if (intervalInfo.time <= 0) {
    intervalInfo = nextInterval(intervalInfo.name, activeTimer);
    currentInterval++;
  }

  if (currentInterval / 2 === activeTimer.intervals) {
    BackgroundTimer.clearInterval(currState.interval);
    updatePlayState({
      state: '',
      elapsed: 0,
      currentInterval: 0,
      interval: undefined,
      remaining: 0,
      intervalInfo: {},
    });
    return;
  }

  updatePlayState({elapsed, currentInterval, remaining, intervalInfo});
});
