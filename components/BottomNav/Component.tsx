import React from 'react';
import Router, { useRouter } from 'next/router';
import {
  Nav, LinksContainer, LinkButton,
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
              <LinkButton type="button" onClick={(): void => handleLinkClick('/')} isLight>
                <WandActive />
              </LinkButton>
            )
            : (
              <LinkButton type="button" onClick={(): void => handleLinkClick('/')}>
                <WandInactive />
              </LinkButton>
            )
        }

        {
          path === '/top'
            ? (
              <LinkButton type="button" onClick={(): void => handleLinkClick('/top')} isLight>
                <FlameActive />
              </LinkButton>
            )
            : (
              <LinkButton type="button" onClick={(): void => handleLinkClick('/top')}>
                <FlameInactive />
              </LinkButton>
            )
        }

        {
          path === '/library'
            ? (
              <LinkButton type="button" onClick={(): void => handleLinkClick('/library')} isLight>
                <LibraryActive />
              </LinkButton>
            )
            : (
              <LinkButton type="button" onClick={(): void => handleLinkClick('/library')}>
                <LibraryInactive />
              </LinkButton>
            )
        }
      </LinksContainer>
    </Nav>
  );
};

export default Component;
