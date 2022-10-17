import {globalDomain} from './domain';
import {defaultSettings} from '../constants/constants';
import { createStyles } from "../styles/style";

export const $settings = globalDomain.store(defaultSettings);
export const $styles = globalDomain.store(createStyles(defaultSettings));
