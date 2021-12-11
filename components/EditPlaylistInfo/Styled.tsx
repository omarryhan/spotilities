import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
`;

export const BackgroundGradient = styled.div<{ bgColor: string }>`
  width: 100%;
  background: rgba(18,18,18,1);

  /* stylelint-disable-next-line plugin/no-unsupported-browser-features */ /* vendor prefixed*/
  background: linear-gradient(0deg, ${(props): string => props.theme.colors.gray.dark} 0%, ${(props): string => props.bgColor} 100%);
`;

export const PlaylistCoverPhotoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin: 0 auto;
  height: 250px;
  width: 200px;
`;

export const EditCoverButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0 50px 0;
`;

export const EditCoverButton = styled.button`
  /* Remove all styles */
  background: none;
  border: 2px solid ${(props): string => props.theme.colors.white.primary};
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  background-color: ${(props): string => props.theme.colors.gray.dark};
  color: ${(props): string => props.theme.colors.white.light};
  font-size: 20px;
  width: 150px;
  height: 40px;
  border-radius: 25px;
  font-weight: bold;

  &:active {
    border-color: ${(props): string => props.theme.colors.green.primary};
    color: ${(props): string => props.theme.colors.white.lightest};
  }
`;

export const Form = styled.form`
  padding-left: ${(props): string => props.theme.dimensions.contentSideMargin.all};
  padding-right: ${(props): string => props.theme.dimensions.contentSideMargin.all};
`;

export const InputBox = styled.div`
  margin: 20px 0;
`;

export const Label = styled.label`
  display: block;
  font-size: 18px;
`;

export const Input = styled.input`
  color: black;
  margin-top: 10px;
  display: block;
  box-shadow: none;
  background-color: white;
  outline: none;
  height: 50px;
  width: 100%;
  border-radius: 5px;
  padding: 0 15px;
  border: ${(props): string => props.theme.colors.gray.dark} solid 2px;
  font-size: 16px;

  /* stylelint-disable-next-line */
  appearance: none;
  /* stylelint-disable-next-line */
  -webkit-appearance: none;
  /* stylelint-disable-next-line */
  -moz-appearance: none;

  &:hover {
    border: ${(props): string => props.theme.colors.green.primary} solid 2px;
  }

  &:focus {
    border: ${(props): string => props.theme.colors.green.primary} solid 2px;
  }
`;

export const TextArea = styled.textarea`
  color: black;
  margin-top: 10px;
  display: block;
  box-shadow: none;
  background-color: white;
  outline: none;
  height: 100px;
  width: 100%;
  border-radius: 5px;
  padding: 15px 15px;
  border: ${(props): string => props.theme.colors.gray.dark} solid 2px;
  font-size: 16px;

  /* stylelint-disable-next-line */
  appearance: none;
  /* stylelint-disable-next-line */
  -webkit-appearance: none;
  /* stylelint-disable-next-line */
  -moz-appearance: none;

  &:hover {
    border: ${(props): string => props.theme.colors.green.primary} solid 2px;
  }

  &:focus {
    border: ${(props): string => props.theme.colors.green.primary} solid 2px;
  }
`;

export const TwoButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  margin: 30px 0;
  padding: 10px 0 10px 0;
`;

export const SubmitButton = styled.button`
  /* Remove all styles */
  background: none;
  padding: 0;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  background-color: ${(props): string => props.theme.colors.green.primary};
  color: ${(props): string => props.theme.colors.white.light};
  font-size: 20px;
  width: 145px;
  height: 50px;
  border-radius: 25px;
  font-weight: bold;

  &:active {
    color: ${(props): string => props.theme.colors.white.lightest};
  }

  &:disabled {
    background-color: ${(props): string => props.theme.colors.gray.lightest};
    color: ${(props): string => props.theme.colors.white.dark};
  }
`;

export const CancelButton = styled.button`
  /* Remove all styles */
  background: none;
  padding: 0;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;

  background-color: ${(props): string => props.theme.colors.gray.lightest};
  color: ${(props): string => props.theme.colors.white.dark};
  font-size: 20px;
  width: 145px;
  height: 50px;
  border-radius: 25px;
  font-weight: bold;

  &:active {
    color: ${(props): string => props.theme.colors.white.lightest};
  }
`;
