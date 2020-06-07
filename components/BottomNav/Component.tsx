import React from 'react';
import Router from 'next/router';
import {
  Nav, LinksContainer, LinkContainer, LinkIcon, LinkTitle,
} from './Styled';
import WandInactive from '../../public/icons/wand-inactive.svg';
import WandActive from '../../public/icons/wand-active.svg';
import FlameInactive from '../../public/icons/flame-inactive.svg';
import FlameActive from '../../public/icons/flame-active.svg';
import LibraryInactive from '../../public/icons/library-inactive.svg';
import LibraryActive from '../../public/icons/library-active.svg';


const handleLinkClick = (route: string): void => {
  Router.push(route);
};

const Component: React.FC<{}> = () => {
  let path = '/';

  if (typeof window !== 'undefined') {
    const splitPath = window.location.href.split('/');
    // eslint-disable-next-line prefer-destructuring
    path = splitPath[3] ? `/${splitPath[3]}` : '/';
  }

  return (
    <Nav>
      <LinksContainer>
        {
          path === '/'
            ? (
              <LinkContainer type="button" onClick={(): void => handleLinkClick('/')}>
                <LinkIcon isLight>
                  <WandActive />
                </LinkIcon>
                <LinkTitle isLight>
                  Magic
                </LinkTitle>
              </LinkContainer>
            )
            : (
              <LinkContainer type="button" onClick={(): void => handleLinkClick('/')}>
                <LinkIcon>
                  <WandInactive />
                </LinkIcon>
                <LinkTitle>
                  Magic
                </LinkTitle>
              </LinkContainer>
            )
        }

        {
          path.startsWith('/top')
            ? (
              <LinkContainer type="button" onClick={(): void => handleLinkClick('/top')}>
                <LinkIcon isLight>
                  <FlameActive />
                </LinkIcon>
                <LinkTitle isLight>
                  Top
                </LinkTitle>
              </LinkContainer>
            )
            : (
              <LinkContainer type="button" onClick={(): void => handleLinkClick('/top')}>
                <LinkIcon>
                  <FlameInactive />
                </LinkIcon>
                <LinkTitle>
                  Top
                </LinkTitle>
              </LinkContainer>
            )
        }

        {
          path.startsWith('/library') || path.startsWith('/playlists')
            ? (
              <LinkContainer type="button" onClick={(): void => handleLinkClick('/library')}>
                <LinkIcon isLight>
                  <LibraryActive />
                </LinkIcon>
                <LinkTitle isLight>
                  Library
                </LinkTitle>
              </LinkContainer>
            )
            : (
              <LinkContainer type="button" onClick={(): void => handleLinkClick('/library')}>
                <LinkIcon>
                  <LibraryInactive />
                </LinkIcon>
                <LinkTitle>
                  Library
                </LinkTitle>
              </LinkContainer>
            )
        }
      </LinksContainer>
    </Nav>
  );
};

export default Component;
