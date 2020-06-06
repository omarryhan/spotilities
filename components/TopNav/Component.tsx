import React from 'react';
import Router from 'next/router';
import SettingsIcon from '../../public/icons/settings.svg';
import BackButton from '../../public/icons/back-arrow.svg';


import {
  Header,
  Nav,
  Title,
  NavItem,
  SettingsButtonWapper,
  BackButtonWrapper,
} from './Styled';


const Component: React.FC<
{title?: string; showBackButton?: boolean; showSettingsButton?: boolean}
> = (
  { title = '', showBackButton = false, showSettingsButton = false },
) => (
  <Header>
    <Nav>
      <NavItem left>
        {
          showBackButton
            ? (
              <BackButtonWrapper
                type="button"
                onClick={
                  (): void => Router.back()
                }
              >
                <BackButton />
              </BackButtonWrapper>
            )
            : (
              <Title>
                {title}
              </Title>
            )
        }
      </NavItem>
      <NavItem>
        {
          showBackButton
            ? (
              <Title>
                {title}
              </Title>
            )
            : null
        }
      </NavItem>

      <NavItem right>
        {
          showSettingsButton
            ? (
              <SettingsButtonWapper
                type="button"
                onClick={
                  (): ReturnType<typeof Router.push> => Router.push('/settings')
                }
              >
                <SettingsIcon />
              </SettingsButtonWapper>
            )
            : ''
        }
      </NavItem>
    </Nav>
  </Header>
);

export default Component;
