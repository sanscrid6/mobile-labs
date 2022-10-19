import {useStore} from 'effector-react';
import {$settings} from '../state/store';
import {THEME} from '../constants/constants';

function useColorTheme(light, dark) {
  const settings = useStore($settings);

  if (settings.theme === THEME.DAY) {
    return light;
  } else {
    return dark;
  }
}
