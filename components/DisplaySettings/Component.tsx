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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            Show stats for musicians
          </SettingTitle>
          <SettingDescription>
            Show tempo, key and mode
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

      <SettingSection>
        <SettingLeftSection>
          <SettingTitle>
            Show tracks&apos; metrics
          </SettingTitle>
          <SettingDescription>
            Show energy, danceability, valence and popularity respectively
          </SettingDescription>
        </SettingLeftSection>

        <SettingRightSection>
          <StyledSwitch
            checked={settings.showTrackMetrics}
            onChange={(props): void => setWithUpdateLocalStorage(
              props.target.checked,
              'showTrackMetrics',
            )}
          />
        </SettingRightSection>
      </SettingSection>

      <SettingSection>
        <SettingLeftSection>
          <SettingTitle>
            Show playlists&apos; metrics
          </SettingTitle>
          <SettingDescription>
            Show energy, danceability, valence and popularity respectively.
            <br />
            Disable it for optimal performance.
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
    </SettingsSection>
  );
};

export default Component;
