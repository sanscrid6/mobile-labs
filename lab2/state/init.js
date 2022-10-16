import {$settings} from './store';
import {updateSettings} from './events';

$settings.on(updateSettings, (state, data) => {
  const newSettings = {...state, ...data};
  return newSettings;
});
