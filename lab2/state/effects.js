import {globalDomain} from './domain';
import {$playState} from './store';
import {updatePlayState} from './events';
import {TICK_TIME} from '../constants/constants';

export const tickFx = globalDomain.effect(() => {
  const currState = $playState.getState();
  updatePlayState({elapsed: currState.elapsed + TICK_TIME});
});
