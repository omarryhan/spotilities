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

export interface Props {
  title?: string;
  showBackButton?: boolean;
  showRightButton?: boolean;
  RightButton?: React.FC;
  onRightButtonClick?: () => ReturnType<typeof Router.push>;
  backTo?: string | string[];
}

const Component: React.FC<Props> = ({
  title = '',
  showBackButton = false,
  showRightButton = false,
  RightButton,
  onRightButtonClick,
  backTo,
}) => (
  <Header>
    <Nav>
      <NavItem left>
        {
          showBackButton
            ? (
              <BackButtonWrapper
                type="button"
                onClick={
                  (): void => {
                    if (backTo) {
                      if (Array.isArray(backTo)) {
                        Router.push(backTo[0], backTo[1]);
                      } else {
                        Router.push(backTo);
                      }
                    } else {
                      Router.back();
                    }
                  }
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
          showRightButton
            ? typeof RightButton === 'undefined'
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
              : (
                <SettingsButtonWapper
                  type="button"
                  onClick={onRightButtonClick}
                >
                  <RightButton />
                </SettingsButtonWapper>
              )
            : ''
        }
      </NavItem>
    </Nav>
  </Header>
);

export default Component;
