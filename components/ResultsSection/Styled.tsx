import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const Container = styled.div`
  width: 100%;
  padding: 0 ${(props): string => props.theme.dimensions.contentSideMargin.all};
  margin-bottom: calc(${(props): string => props.theme.dimensions.bottomAppBarHeight.all} + 10px);
`;

export const TracksContainer = styled.div`
  width: 100%;
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
`;

export const Title = styled.h2`
  padding-right: 10px;
  font-size: 22px;
  margin: 0 0;
`;

export const AddToPlaylistButton = styled(Button)`
  width: 22px;
  min-width: 0px;
  border-radius: 0;
  font-weight: normal;
  display: flex;
  margin-top: 6px;
  padding: 0 0;

  & > span {
    display: flex;
    align-items: center;
  }
  
  & > span > svg {
    width: 100%;
    fill: rgb(235,235,235,1);
  }
`;
