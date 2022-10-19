export const SCREENS = {
  SPLASH: 'SPLASH',
  SETTINGS: 'SETTINGS',
  MAIN: 'MAIN',
  EDIT: 'EDIT',
};

export const LANGUAGES = {
  EN: 'EN',
  RU: 'RU',
};

export const THEME = {
  DAY: 'DAY',
  NIGHT: 'NIGHT',
};

export const defaultSettings = {
  fontSize: 15,
  language: LANGUAGES.EN,
  theme: THEME.DAY,
};

export const localization = {
  changeFontSize: {
    [LANGUAGES.EN]: 'Change font size',
    [LANGUAGES.RU]: 'Изменить размер шрифта',
  },
  changeTheme: {
    [LANGUAGES.EN]: 'Switch theme',
    [LANGUAGES.RU]: 'Изменить тему',
  },
  day: {
    [LANGUAGES.EN]: 'Day',
    [LANGUAGES.RU]: 'День',
  },
  night: {
    [LANGUAGES.EN]: 'Night',
    [LANGUAGES.RU]: 'Ночь',
  },
  deleteAllData: {
    [LANGUAGES.EN]: 'Delete all data',
    [LANGUAGES.RU]: 'Удалить все данные',
  },
  saveSettings: {
    [LANGUAGES.EN]: 'Save settings',
    [LANGUAGES.RU]: 'Сохранить настрйки',
  },
};

