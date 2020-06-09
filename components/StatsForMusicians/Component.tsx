import React from 'react';
import { useSelector } from 'react-redux';
import { CombinedStateType } from '../../redux/types';
import {
  Container,
  Text,
  // IconWrapper,
} from './Styled';
// import ClefIcon from '../../public/icons/clef.svg';


const modeMapping = [
  'Minor',
  'Major',
];

// const flat = '♭';
// const sharp = '♯';

const musicalKeyLetterMapping = [
  'C',
  'C♯',
  'D',
  'D♯',
  'E',
  'F',
  'F♯',
  'G',
  'G♯',
  'A',
  'A♯',
  'B',
];

const noKeyDetectedPitchClassNotation = -1;

const getKeySignature = (key: number | undefined, mode: number | undefined): null | string => {
  if (
    typeof key === 'undefined'
    || typeof mode === 'undefined'
    || (mode !== noKeyDetectedPitchClassNotation && mode !== 0)
    || key === -1
  ) {
    return null;
  }

  return `${musicalKeyLetterMapping[key]} ${modeMapping[mode]}`;
};

const Component: React.FC<{trackId: string}> = ({ trackId }) => {
  const tempo = useSelector<CombinedStateType, number | undefined>(
    (state) => state.tracksAudioFeatures.data[trackId]?.data.tempo,
  );

  // const timeSignature = useSelector<CombinedStateType, number | undefined>(
  //   (state) => state.tracksAudioFeatures.data[trackId]?.data.time_signature,
  // );

  const mode = useSelector<CombinedStateType, number | undefined>(
    (state) => state.tracksAudioFeatures.data[trackId]?.data.mode,
  );

  const key = useSelector<CombinedStateType, number | undefined>(
    (state) => state.tracksAudioFeatures.data[trackId]?.data.key,
  );

  const keySignature = getKeySignature(key, mode);

  return (
    <Container>
      <Text>
        {keySignature ? `${keySignature} - ` : ''}
        {`${tempo && Math.floor(tempo)} bpm`}
      </Text>
    </Container>
  );
};

export default Component;
