import { defaultSettings } from '../configs/settings';

export const getOrSetAndGetCurrentSettings = (): typeof defaultSettings => {
  if (typeof window === 'undefined') {
    return defaultSettings;
  }

  const storage = window.localStorage.getItem('settings');

  const settings = storage ? JSON.parse(storage) : defaultSettings;

  if (!storage) {
    window.localStorage.setItem('settings', JSON.stringify(settings));
  }

  return settings;
};

export const setSettings = (settings: typeof defaultSettings): void => {
  window.localStorage.setItem('settings', JSON.stringify(settings));
};
