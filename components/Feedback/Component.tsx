import React from 'react';
import {
  SettingsSection,
  SectionTitle,
  SettingSection,
  SettingLeftSection,
  SettingTitle,
  SettingDescription,
  SettingRightSection,
  StyledLogoutLink,
} from '../Settings/Styled';

const Component: React.FC = () => (
  <SettingsSection>
    <SectionTitle>
      Feedback
    </SectionTitle>

    <SettingSection>
      <SettingLeftSection>
        <SettingTitle>
          Issues and feature requests
        </SettingTitle>
        <SettingDescription>
          Please report any issues or feature request to either
          this project&apos;s
          {' '}
          <a
            href="https://github.com/omarryhan/spotilities/issues/new"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
          {' '}
          repository or by sending me an
          {' '}
          <a
            href="mailto:omarryhan@gmail.com"
            target="_blank"
            rel="noreferrer"
          >
            email
          </a>
          .
        </SettingDescription>
      </SettingLeftSection>

      <SettingRightSection>
        <StyledLogoutLink
          href="https://github.com/omarryhan/spotilities/issues/new"
          target="_blank"
        >
          Github
          <svg xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '5px' }} width="25" height="25" viewBox="0 0 24 24" strokeWidth="1.5" stroke="rgb(225, 225, 225, 1)" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M11 7h-5a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-5" />
            <line x1="10" y1="14" x2="20" y2="4" />
            <polyline points="15 4 20 4 20 9" />
          </svg>
        </StyledLogoutLink>
      </SettingRightSection>
    </SettingSection>
  </SettingsSection>
);

export default Component;
