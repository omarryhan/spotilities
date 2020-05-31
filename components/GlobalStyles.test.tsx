import React from 'react';
import renderer from 'react-test-renderer';
import GlobalStyles from './GlobalStyles';
import 'jest-styled-components';
import { styledComponentsTheme } from '../configs/theme';

describe('GlobalStyles', () => {
  it('is unchanged', () => {
    const tree = renderer.create(
      <GlobalStyles theme={styledComponentsTheme} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
