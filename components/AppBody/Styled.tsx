import styled from 'styled-components';

export const Container = styled.div<{noTopNav?: boolean}>`
  max-width: 700px;
  margin: ${(props): string => (!props.noTopNav ? props.theme.dimensions.headerHeight.mobile : '0')} auto 0 auto;
`;
