/* eslint-disable global-require */
import React from 'react';
import styled from 'styled-components';
// fails on build time :/
// import WebFont from 'webfontloader';

interface Props {
  disabled?: boolean;
  currentFontFamily: string;
  setCurrentFontFamily: (f: string) => void;
  onSelect?: () => void;
}

interface GoogleFont {
  family: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  files: { [key: string]: string };
  category: string;
  kind: string;
}

interface Response {
  kind: string;
  items: GoogleFont[];
}

const Select = styled.select`
  color: black;
  border-radius: 5px;
  height: 45px;
  flex: 1;
  max-width: 225px;
  margin-left: 30px;
`;

const Component: React.FC<Props> = ({
  disabled,
  currentFontFamily,
  setCurrentFontFamily,
  onSelect,
}) => {
  const [allGoogleFonts, setAllGoogleFonts] = React.useState<GoogleFont[]>([]);

  // load all fonts
  React.useEffect(() => {
    const effect = async (): Promise<void> => {
      if (typeof window !== 'undefined') {
        setAllGoogleFonts((await (await fetch(
          'https://www.googleapis.com/webfonts/v1/webfonts?sort=popularity&key=AIzaSyD1kuVg618miADnmNr5YKcQT5LU3As4Us0',
        )).json() as Response).items);
      }
    };

    effect();
  }, []);

  return (

    <Select
      disabled={disabled}
      name="selectFont"
      onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const WebFont = require('webfontloader');
        e.target.value !== 'Proxima Nova' && WebFont.load({
          google: {
            families: [
              e.target.value,
            ],
          },
        });

        setCurrentFontFamily(e.target.value);

        onSelect && onSelect();
      }}
    >
      <option
        value="Proxima Nova"
        selected={currentFontFamily === 'Proxima Nova'}
      >
        Proxima Nova
      </option>
      {
        allGoogleFonts.map((font) => (
          <option
            value={font.family}
            selected={font.family === currentFontFamily}
          >
            {font.family}
          </option>
        ))
      }
    </Select>
  );
};

export default Component;
