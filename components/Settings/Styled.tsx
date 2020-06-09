import styled from 'styled-components';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { media, styledComponentsTheme } from '../../configs/theme';


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
  width: 100%;
  margin-bottom: 60px;
`;

export const SectionTitle = styled.h2`
  margin: 0 0;
  margin: 15px 0 20px 0;
  font-size: 1.5rem;
  color: ${(props): string => props.theme.colors.white.dark};
`;

export const SettingSection = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
`;

export const SettingLeftSection = styled.div`
  max-width: 80%;
`;

export const SettingTitle = styled.h3`
  margin: 0 0;
  font-size: 1.1rem;
  color: ${(props): string => props.theme.colors.white.dark};
`;

export const SettingDescription = styled.p`
  margin: 0 0;
  margin-top: 3px;
  color: ${(props): string => props.theme.colors.white.darkest};
  font-size: 0.75rem;
`;

export const SettingRightSection = styled.div`
  max-width: 20%;
  display: flex;
  align-items: center;
`;

// TODO: find a way to manually set the turned on state of the
// track to white
export const StyledSwitch = withStyles({
  track: {
    backgroundColor: '#eee', // track turned off
  },
  thumb: {
    backgroundColor: styledComponentsTheme.colors.white.dark, // thumb permenant
  },
  checked: {
    '& $thumb': {
      backgroundColor: styledComponentsTheme.colors.green.primary, // thumb turned on
    },
  },
})(Switch);

export const StyledLogoutButton = styled(Button)`
  background-color: ${(props): string => props.theme.colors.white.dark};
  padding-top: 0;
  padding-bottom: 0;

  &:hover {
    background-color: #fff;
  }
  
  & span {
    color: ${(props): string => props.theme.colors.gray.light};
    font-size: 0.9rem;
    font-weight: bold;
    text-transform: capitalize;
  }
`;
