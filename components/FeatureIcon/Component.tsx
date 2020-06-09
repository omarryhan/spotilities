import React from 'react';

import {
  AvailableMetrics,
} from '../PlaylistMetricBar/types';


import DanceabilityIcon from '../../public/icons/dance.svg';
import EnergyIcon from '../../public/icons/flash.svg';
import ValenceIcon from '../../public/icons/happy.svg';
import PopularityIcon from '../../public/icons/trending.svg';
import GuitarIcon from '../../public/icons/guitar.svg';
import NoiseIcon from '../../public/icons/noise.svg';
import MicrophoneIcon from '../../public/icons/microphone.svg';
import VideoCameraIcon from '../../public/icons/video-camera.svg';
import MetronomeIcon from '../../public/icons/tempo.svg';


const Component: React.FC<{name: AvailableMetrics}> = ({ name }) => {
  if (name === 'popularity') {
    return <PopularityIcon />;
  } else if (name === 'valence') {
    return <ValenceIcon />;
  } else if (name === 'energy') {
    return <EnergyIcon />;
  } else if (name === 'danceability') {
    return <DanceabilityIcon />;
  } else if (name === 'acousticness') {
    return <NoiseIcon />;
  } else if (name === 'instrumentalness') {
    return <GuitarIcon />;
  } else if (name === 'liveness') {
    return <VideoCameraIcon />;
  } else if (name === 'loudness') {
    return <GuitarIcon />;
  } else if (name === 'speechiness') {
    return <MicrophoneIcon />;
  } else if (name === 'tempo') {
    return <MetronomeIcon />;
  } else {
    return null;
  }
};

export default Component;
