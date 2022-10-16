import {$settings} from './store';
import {updateSettings} from './events';

function init() {
  $settings.on(updateSettings, (state, data) => {
    const newSettings = {...state, ...data};
    return newSettings;
  });
}

export default init;
