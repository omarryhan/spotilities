import React from 'react';
import AddIcon from '../../public/icons/add.svg';

import {
  SelectTrackStripeContainer,
  SelectTrackStripeContents,
  SelectTrackStripeIconContainer,
  SelectTrackStripeText,
} from './Styled';

interface Props {
  onClickHandler: () => any;
  text: string;
}

export const Component: React.FC<Props> = ({ onClickHandler, text }) => (
  <SelectTrackStripeContainer
    onClick={onClickHandler}
  >
    <SelectTrackStripeContents>
      <SelectTrackStripeIconContainer>
        <AddIcon />
      </SelectTrackStripeIconContainer>

      <SelectTrackStripeText>
        {text}
      </SelectTrackStripeText>
    </SelectTrackStripeContents>
  </SelectTrackStripeContainer>
);

export default Component;
