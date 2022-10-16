import {globalDomain} from './domain';
import {defaultSettings} from '../constants/constants';

export const $settings = globalDomain.store(defaultSettings);
