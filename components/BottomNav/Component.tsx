import React from 'react';
import Router, { useRouter } from 'next/router';
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

const Component: React.FC<{page: string}> = ({ page }) => {
  const router = useRouter();
  const path = router.pathname;

  return (
    <Nav>
      <LinksContainer>
        {
          path === '/'
            ? (
              <LinkContainer type="button">
                <LinkIcon onClick={(): void => handleLinkClick('/')} isLight>
                  <WandActive />
                </LinkIcon>
                <LinkTitle isLight>
                  Magic
                </LinkTitle>
              </LinkContainer>
            )
            : (
              <LinkContainer type="button">
                <LinkIcon onClick={(): void => handleLinkClick('/')}>
                  <WandInactive />
                </LinkIcon>
                <LinkTitle>
                  Magic
                </LinkTitle>
              </LinkContainer>
            )
        }

        {
          path === '/top'
            ? (
              <LinkContainer type="button">
                <LinkIcon onClick={(): void => handleLinkClick('/top')} isLight>
                  <FlameActive />
                </LinkIcon>
                <LinkTitle isLight>
                  Top
                </LinkTitle>
              </LinkContainer>
            )
            : (
              <LinkContainer type="button">
                <LinkIcon onClick={(): void => handleLinkClick('/top')}>
                  <FlameInactive />
                </LinkIcon>
                <LinkTitle>
                  Top
                </LinkTitle>
              </LinkContainer>
            )
        }

        {
          path === '/library'
            ? (
              <LinkContainer type="button">
                <LinkIcon onClick={(): void => handleLinkClick('/library')} isLight>
                  <LibraryActive />
                </LinkIcon>
                <LinkTitle isLight>
                  Library
                </LinkTitle>
              </LinkContainer>
            )
            : (
              <LinkContainer type="button">
                <LinkIcon onClick={(): void => handleLinkClick('/library')}>
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
