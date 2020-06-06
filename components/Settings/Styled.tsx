import styled from 'styled-components';
import { media } from '../../configs/theme';

export const Container = styled.div`
  ${media.lessThan('tablet')`
    padding: 10px ${(props): string => props.theme.dimensions.contentSideMargin.mobile} calc(${(props): string => props.theme.dimensions.bottomAppBarHeight.mobile} + 10px) ${(props): string => props.theme.dimensions.contentSideMargin.mobile};
  `};

  ${media.greaterThan('tablet')`
    padding: 10px ${(props): string => props.theme.dimensions.contentSideMargin.desktop} calc(${(props): string => props.theme.dimensions.bottomAppBarHeight.desktop} + 10px) ${(props): string => props.theme.dimensions.contentSideMargin.desktop};
  `};

  width: 100%;
`;

export const SettingsSection = styled.div`
  
`;

export const SectionTitle = styled.p`
  margin: 0 0;
`;

export const SettingSection = styled.div`

`;

export const SettingLeftSection = styled.div`

`;

export const SettingTitle = styled.p`
  margin: 0 0;
`;

export const SettingDescription = styled.p`
  margin: 0 0;
`;

export const SettingRightSection = styled.div`

`;
