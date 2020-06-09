import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, ButtonContainer } from './Styled';
import { shufflePlayPlaylist } from '../../redux/playback/actions';


const Component: React.FC<{playlistId: string}> = ({ playlistId }) => {
  const dispatch = useDispatch();
  return (
    <ButtonContainer>
      <Button
        type="button"
        onClick={
          (): ReturnType<typeof dispatch> => dispatch(shufflePlayPlaylist(playlistId))
        }
      >
        Shuffle Play
      </Button>
    </ButtonContainer>
  );
};

export default Component;
