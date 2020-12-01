import React from 'react';
import styled from 'styled-components';

interface Props {
  onUpload: (src: string) => void;
}

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  display: flex;
  height: 40px;
  align-items: center;

  & p {
    font-size: 16px;
    margin-right: 10px;
  }
`;

const UploadButton = styled.div`
  width: 130px;
  height: 40px;
  display: flex;
  padding: 0 15px;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 2px solid ${(props): string => props.theme.colors.white.primary};
  font-size: 16px;
  color: ${(props): string => props.theme.colors.white.primary};
  border-radius: 30px;
`;

const Component: React.FC<Props> = ({ onUpload }) => (
  <Label>
    <p>
      Select image:
      {' '}
    </p>
    <UploadButton>
      Select
    </UploadButton>
    <Input
      id="fileUpload"
      accept="image/*"
      type="file"
      name="fileUpload"
      onChange={(e): void => {
        const baseURL = window.webkitURL || window.URL;
        onUpload(baseURL.createObjectURL((e.target.files as FileList)[0]));
      }}
    />
  </Label>
);

export default Component;
