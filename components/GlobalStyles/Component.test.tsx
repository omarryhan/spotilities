import React from 'react';
import renderer from 'react-test-renderer';
import Component from './Component';
import 'jest-styled-components';
import { styledComponentsTheme } from '../../configs/theme';

describe('GlobalStyles', () => {
  it('is unchanged', () => {
    const tree = renderer.create(
      <Component theme={styledComponentsTheme} />,
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
