import {globalDomain} from './domain';
import { defaultSettings, defaultTimer } from "../constants/constants";
import {createStyles} from '../styles/style';

export const $settings = globalDomain.store(defaultSettings);
export const $styles = globalDomain.store(createStyles(defaultSettings));
export const $timers = globalDomain.store([]);
export const $editingTimer = globalDomain.store(defaultTimer);
export const $activeTimer = globalDomain.store(null);
