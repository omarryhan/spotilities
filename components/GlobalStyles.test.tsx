import React from 'react';
import renderer from 'react-test-renderer';
import GlobalStyles from './GlobalStyles';
import 'jest-styled-components';

describe('GlobalStyles', () => {
  it('is unchanged', () => {
    const tree = renderer.create(<GlobalStyles />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
