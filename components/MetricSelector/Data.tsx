import React from 'react';
import {
  AllAttributes,
} from './types';

import FeatureIcon from '../FeatureIcon';

export const allAttributes: Partial<AllAttributes> = {
  energy: {
    title: 'Energy',
    id: 'energy',
    description: `
        Energy is a measure from 0 to 100 and represents a perceptual measure of intensity and activity. Typically, energetic tracks feel fast, loud, and noisy. For example, death metal has high energy, while a Bach prelude scores low on the scale. Perceptual features contributing to this attribute include dynamic range, perceived loudness, timbre, onset rate, and general entropy.
      `,
    icon: (): ReturnType<React.FC<{}>> => (<FeatureIcon name="energy" />),
    isActivatedPayload: {
      isActivated: true,
      max: 100,
      min: 0,
    },
  },
};
