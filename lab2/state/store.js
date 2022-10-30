import {globalDomain} from './domain';
import {defaultSettings} from '../constants/constants';
import {createStyles} from '../styles/style';

export const $settings = globalDomain.store(defaultSettings);
export const $styles = globalDomain.store(createStyles(defaultSettings));
export const $timers = globalDomain.store([]);
export const $editingTimer = globalDomain.store({
  intervals: 0,
  rest: 12,
  work: 12,
  title: '',
  color: 'white',
});
