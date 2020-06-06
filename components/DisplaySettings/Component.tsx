import React from 'react';
import { getOrSetAndGetCurrentSettings, setSettings } from '../../utils';
import {
  SettingsSection,
  SectionTitle,
  SettingSection,
  SettingLeftSection,
  SettingTitle,
  SettingDescription,
  SettingRightSection,
  StyledSwitch,
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
            Show playlists&apos; attributes in Library
          </SettingTitle>
          <SettingDescription>
            You might want to disable this if your playlists are huge
          </SettingDescription>
        </SettingLeftSection>

        <SettingRightSection>
          <StyledSwitch
            checked={settings.showAllPlaylistsMetrics}
            onChange={(props): void => setWithUpdateLocalStorage(
              props.target.checked,
              'showAllPlaylistsMetrics',
            )}
          />
        </SettingRightSection>
      </SettingSection>

      <SettingSection>
        <SettingLeftSection>
          <SettingTitle>
            Show stats for musicians
          </SettingTitle>
          <SettingDescription>
            Show tempo, key, mode and time signature
          </SettingDescription>
        </SettingLeftSection>

        <SettingRightSection>
          <StyledSwitch
            checked={settings.showMusicianStats}
            onChange={(props): void => setWithUpdateLocalStorage(
              props.target.checked,
              'showMusicianStats',
            )}
          />
        </SettingRightSection>
      </SettingSection>
    </SettingsSection>
  );
};

export default Component;
