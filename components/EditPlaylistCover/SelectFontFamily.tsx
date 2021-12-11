/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable global-require */
import React from 'react';
import styled from 'styled-components';
import uniq from 'lodash.uniq';
import { useLocalStorage } from '../../utils/useLocalStorage';
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
  width: 100%;
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
        const FONTS_API_KEY = 'AIzaSyD1kuVg618miADnmNr5YKcQT5LU3As4Us0';
        const fonts = (await (await fetch(
          // sort either by: alpha, date, popularity, style, trending
          `https://www.googleapis.com/webfonts/v1/webfonts?sort=alpha&key=${FONTS_API_KEY}`,
        )).json() as Response).items;
        fonts.push({
          family: 'Proxima Nova',
          category: 'sans-serif',
          variants: [],
          subsets: [],
          version: '',
          lastModified: '',
          files: {},
          kind: '',
        });
        setAllGoogleFonts(fonts);
      }
    };

    effect();
  }, []);

  const allFontCategories = uniq(allGoogleFonts.map(
    (font): string => font.category,
  ));

  const [selectedCategories, setSelectedCategories] = useLocalStorage<string[]>('selectedCategories', [
    'sans-serif',
    'monospace',
    'serif',
    'display',
    'handwriting',
  ]);

  const addCategoryToSelectedCategories = (category: string): void => {
    setSelectedCategories([
      ...selectedCategories,
      category,
    ]);
  };
  const removeCategoryFromSelectedCategories = (category: string): void => {
    setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
  };

  return (
    <div
      style={{
        flex: 1,
        marginRight: '30px',
      }}
    >
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
        {
          allGoogleFonts.filter((f) => selectedCategories.includes(f.category)).map((font) => (
            <option
              key={font.family}
              value={font.family}
              selected={font.family === currentFontFamily}
            >
              {font.family}
            </option>
          ))
        }
      </Select>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {allFontCategories.map((category) => (
          <div key={category}>
            <label
              htmlFor={category}
              style={{
                display: 'block',
                paddingTop: '10px',
                paddingRight: '15px',
                fontSize: '14px',
                textTransform: 'capitalize',
              }}
            >
              <input
                style={{
                  margin: '0 5px 0 0',
                }}
                id={category}
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                  const { checked } = e.target;
                  checked
                    ? addCategoryToSelectedCategories(category)
                    : removeCategoryFromSelectedCategories(category);
                }}
              />
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Component;

/*

      <Autocomplete
        disabled={disabled}
        id="select-font"
        size="small"
        style={{
          fontSize: '14px',
        }}
        options={allGoogleFonts.filter(
          (font) => selectedCategories.includes(font.category),
        ).sort(
          (a, b) => a.category.localeCompare(b.category),
        ).map((font) => ({ title: font.family, category: font.category }))}
        groupBy={(font): string => font.category}
        getOptionLabel={(option): string => option.title}
        value={
          currentFontFamily && allGoogleFonts.length
            ? { title: currentFontFamily, category: allGoogleFonts.filter(
              (f) => f.family === currentFontFamily
            )[0].category
          } : undefined
        }
        renderInput={(params): React.ReactNode => <TextField
            style={{ fontSize: '8px' }}
            {...params}
            label="Combo box"
            variant="outlined"
          />}
        onChange={(_, value): void => {
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          const WebFont = require('webfontloader');
          value?.title && value.title !== 'Proxima Nova' && WebFont.load({
            google: {
              families: [
                value.title || '',
              ],
            },
          });
          setCurrentFontFamily(value?.title || '' as string);
          onSelect && onSelect();
          // selected={font.family === currentFontFamily}
        }}
      />
*/
