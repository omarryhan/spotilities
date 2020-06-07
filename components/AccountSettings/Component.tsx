import React from 'react';
import {
  SettingsSection,
  SectionTitle,
  SettingSection,
  SettingLeftSection,
  SettingTitle,
  SettingDescription,
  SettingRightSection,
  StyledLogoutButton,
} from '../Settings/Styled';

const Component: React.FC<{}> = () => (
  <SettingsSection>
    <SectionTitle>
      Account
    </SectionTitle>

    <SettingSection>
      <SettingLeftSection>
        <SettingTitle>
          Logout
        </SettingTitle>
        <SettingDescription>
          You&apos;ll be redirected to a list of apps
          connected to your Spotify account.
          Remove Spotilities from there if you want to log out.
        </SettingDescription>
      </SettingLeftSection>

      <SettingRightSection>
        <StyledLogoutButton
          type="button"
          onClick={
            (): void => { window.location.href = 'https://www.spotify.com/account/apps/'; }
          }
        >
          Logout
        </StyledLogoutButton>
      </SettingRightSection>
    </SettingSection>
  </SettingsSection>
);

export default Component;
