import React from 'react';
import Router from 'next/router';
import {
  Nav, LinksContainer, LinkButton, Img,
} from './Styled';
import WandOutlined from '../../public/icons/color-wand-outline-ai.svg';


const handleLinkClick = (route: string): void => {
  Router.push(route);
};

const Component: React.FC<{page: string}> = ({ page }) => (
  <Nav>
    <LinksContainer>
      <LinkButton type="button" onClick={(): void => handleLinkClick('/')}>
        <WandOutlined />
      </LinkButton>
      <LinkButton type="button" onClick={(): void => handleLinkClick('/top')}>
        Top
      </LinkButton>
      <LinkButton type="button" onClick={(): void => handleLinkClick('/library')}>
        Library
      </LinkButton>
    </LinksContainer>
  </Nav>
);

export default Component;
