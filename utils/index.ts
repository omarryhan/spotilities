import { defaultSettings } from '../configs/settings';

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertArrayToObject<T extends {[key: string]: any}>(
  array: T[], key: string,
): {[key: string]: T} {
  const obj: {[key: string]: T} = {};
  array.forEach((item) => {
    obj[item[key]] = item;
  });

  return obj;
}

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
