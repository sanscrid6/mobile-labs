import {globalDomain} from './domain';
import {$activeTimer, $playState} from './store';
import {updatePlayState} from './events';
import {INTERVAL_STATE, TICK_TIME} from '../constants/constants';
import Sound from 'react-native-sound';
import {stopTimer} from '../screens/runTimer';

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
  const lastTick = new Date().getTime();
  const delta = lastTick - currState.lastTick;

  const elapsed = currState.elapsed + delta;
  const remaining = currState.allTime - elapsed;

  let intervalInfo = currState.intervalInfo;
  let currentInterval = currState.currentInterval;

  intervalInfo.time -= delta;
  intervalInfo.signalTime -= delta;

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
    stopTimer(currState);
    return;
  }

  updatePlayState({
    elapsed,
    currentInterval,
    remaining,
    intervalInfo,
    lastTick,
  });
});
