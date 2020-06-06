import React from 'react';
import Switch from '@material-ui/core/Switch';
import { getOrSetAndGetCurrentSettings, setSettings } from '../../utils';
import {
  SettingsSection,
  SectionTitle,
  SettingSection,
  SettingLeftSection,
  SettingTitle,
  SettingDescription,
  SettingRightSection,
} from '../Settings/Styled';

const Component: React.FC<{}> = () => {
  const settings = getOrSetAndGetCurrentSettings();
  const [settingsState, setSettingsState] = React.useState(
    settings,
  );

  console.log(settings.showAllPlaylistsMetrics);

  const setWithUpdateLocalStorage = (val: any, property: string): void => {
    setSettings({
      ...settingsState,
      [property]: val,
    });

    setSettingsState({
      ...settingsState,
      [property]: val,
    });
  };

  return (
    <SettingsSection>
      <SectionTitle>
        Display
      </SectionTitle>

      <SettingSection>
        <SettingLeftSection>
          <SettingTitle>
            Display playlists attributes
          </SettingTitle>
          <SettingDescription>
            You might want to disable this if your playlists are huge
          </SettingDescription>
        </SettingLeftSection>

        <SettingRightSection>
          <Switch
            checked={settings.showAllPlaylistsMetrics}
            onChange={(props): void => setWithUpdateLocalStorage(
              props.target.checked,
              'showAllPlaylistsMetrics',
            )}
          />
        </SettingRightSection>
      </SettingSection>
    </SettingsSection>
  );
};

export default Component;
