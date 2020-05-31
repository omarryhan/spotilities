import styled from 'styled-components';

export const Button = styled.button`
    background-color: ${(props): string => props.theme.colors.gray.primary};
`;
